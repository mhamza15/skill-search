import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SkillSearchApiService } from '../skill-search-api.service';

@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.css']
})
export class SkillsFormComponent implements OnInit {
  skillForm: FormGroup;
  name: FormGroup;
  skills: FormControl;
  experience: FormControl;
  address: FormGroup;
  firstName: FormControl;
  submissionIsInvalid: boolean;
  submissionSuccess: boolean;

  constructor(private skillSearchAPI: SkillSearchApiService) { }

  ngOnInit() {
    this.name = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required)
    });
    this.skills = new FormControl('', Validators.required);
    this.experience = new FormControl('', Validators.required);
    this.address = new FormGroup({
      line1: new FormControl('', Validators.required),
      line2: new FormControl(),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
        )
      ]),
      zip: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)
      ])
    });

    this.skillForm = new FormGroup({
      name: this.name,
      skills: this.skills,
      experience: this.experience,
      address: this.address
    });

    this.submissionIsInvalid = false;
    this.submissionSuccess = false;
  }

  onSubmit() {
    if (this.skillForm.valid) {
      this.skillSearchAPI.addPerson({
        firstName: this.name.controls.firstName.value,
        lastName: this.name.controls.lastName.value,
        skills: this.skills.value.split(',').map(e => e.trim()).filter(e => e),
        experience: this.experience.value,
        addressLine1: this.address.controls.line1.value,
        addressLine2: this.address.controls.line2.value,
        city: this.address.controls.city.value,
        state: this.address.controls.state.value,
        zip: this.address.controls.zip.value
      });
      this.submissionIsInvalid = false;
      this.submissionSuccess = true;
      setTimeout(() => this.submissionSuccess = false, 2000);
      this.skillForm.reset();
    } else {
      this.submissionIsInvalid = true;
    }
  }
}
