const express = require('express');
const morgan = require('morgan');
const appEnv = require('cfenv').getAppEnv();
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/dist')));

if (!appEnv.isLocal) {
  var services = appEnv.services;
  var mongodb_services = services["compose-for-mongodb"];
  var credentials = mongodb_services[0].credentials;
  var ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];
}

app.put('/addPerson', (req, res) => {
  mongoClient.connect(
    !appEnv.isLocal ? credentials.uri : 'mongodb://localhost:27017',
    !appEnv.isLocal ? {
      mongos: {
        ssl: true,
        sslValidate: true,
        sslCA: ca,
        poolSize: 1,
        reconnectTries: 1
      }
    } : null,
    (err, client) => {
      if (err) console.log("Error connecting to MongoDB server");
      const db = client.db('skill-search');

      const skills = Object.assign(req.body, { skills: req.body.skills.map(e => e.toLowerCase()) });
      db.collection('users')
      .insertOne(skills, (err) => {
        if (!err) console.log("MongoDB: User added");
        res.sendStatus(200);
    });
  });
});

app.get('/searchSkills/:skills', (req, res) => {
  mongoClient.connect(
    !appEnv.isLocal ? credentials.uri : 'mongodb://localhost:27017',
    !appEnv.isLocal ? {
      mongos: {
        ssl: true,
        sslValidate: true,
        sslCA: ca,
        poolSize: 1,
        reconnectTries: 1
      }
    } : null,
    (err, client) => {
      if (err) console.log("Error connecting to MongoDB server");
      const db = client.db('skill-search');

      db.collection('users')
      .find({ skills: { $in: JSON.parse(req.params.skills).map(e => e.toLowerCase()) } })
      .project({
        _id: 0,
        firstName: 1,
        lastName: 1,
        skills: 1
      })
      .toArray((err, results) => {
        res.json(results);
      });
    }
  );
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = !appEnv.isLocal ? appEnv.port : 3000
const url = !appEnv.isLocal ? appEnv.url : 'http://localhost'
app.listen(port, () => {
  console.log(`🚀  Server is running: ${url}:${port}`);
});
