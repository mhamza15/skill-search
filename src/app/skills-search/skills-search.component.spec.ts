import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsSearchComponent } from './skills-search.component';

describe('SkillsSearchComponent', () => {
  let component: SkillsSearchComponent;
  let fixture: ComponentFixture<SkillsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
