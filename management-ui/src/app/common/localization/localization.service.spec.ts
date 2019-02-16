import { TestBed } from '@angular/core/testing';

import { LocalizationService } from './localization.service';

describe('LocalizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalizationService = TestBed.get(LocalizationService);
    expect(service).toBeTruthy();
  });
});
