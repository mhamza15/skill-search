import { TestBed, inject } from '@angular/core/testing';

import { SkillSearchApiService } from './skill-search-api.service';

describe('SkillSearchApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkillSearchApiService]
    });
  });

  it('should be created', inject([SkillSearchApiService], (service: SkillSearchApiService) => {
    expect(service).toBeTruthy();
  }));
});
