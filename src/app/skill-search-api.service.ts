import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SkillSearchApiService {

  constructor(private http: Http) { }

  addPerson(person: Object) {
    return this.http.put('/addPerson', person).toPromise();
  }

  search(skills: string[]) {
    return this.http.get('/searchSkills/' + JSON.stringify(skills)).toPromise();
  }

}
