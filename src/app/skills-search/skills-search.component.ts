import { Component, OnInit } from '@angular/core';
import { SkillSearchApiService } from '../skill-search-api.service';

@Component({
  selector: 'app-skills-search',
  templateUrl: './skills-search.component.html',
  styleUrls: ['./skills-search.component.css']
})
export class SkillsSearchComponent implements OnInit {
  searchText: string;
  skills: string[];
  results: string[];

  constructor(private skillSearchAPI: SkillSearchApiService) { }

  ngOnInit() {
    this.skills = [];
    this.results = [];
  }

  searchFieldChange() {
    this.skills = this.searchText.split(',').map(e => e.trim()).filter(e => e);
  }

  submit() {
    const currentSkills = this.skills;
    this.skillSearchAPI.search(this.skills)
    .then((res) => {
      this.results = res.json().map((person) => {
        return {
          ...person,
          skills: person.skills.filter(skill => currentSkills.includes(skill)).sort()
        };
      }).sort((a, b) => (b.skills.length - a.skills.length));
    });
  }

}
