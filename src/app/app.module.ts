import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { SkillsFormComponent } from './skills-form/skills-form.component';
import { SkillSearchApiService } from './skill-search-api.service';
import { SkillsSearchComponent } from './skills-search/skills-search.component';


@NgModule({
  declarations: [
    AppComponent,
    SkillsFormComponent,
    SkillsSearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    SkillSearchApiService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
