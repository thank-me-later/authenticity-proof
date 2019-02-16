import { TestBed } from '@angular/core/testing';
import { LocalizationService } from './localization.service';


describe('LocalizationService', () => {
  let service: LocalizationService;

  beforeEach(() => {
    service = TestBed.get(LocalizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get locale', () => {
    expect(service.getLocale()).toEqual('en');
  });

  it('should set locale', () => {
    service.setLocale('de');
    expect(service.getLocale()).toEqual('de');
  });

  it('should throw an error for invalid locale', () => {
    expect(() => {
      service.setLocale('zh')
    })
      .toThrow();
  });

  it('should get a translated string', () => {
    expect(service.getLocalizedString('collection.new')).toEqual('New Collection');
  })
});
