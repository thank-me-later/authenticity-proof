import { TestBed } from '@angular/core/testing';

import { CollectionDomainRegistryService } from './collection-domain-registry.service';

describe('CollectionDomainRegistryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollectionDomainRegistryService = TestBed.get(CollectionDomainRegistryService);
    expect(service).toBeTruthy();
  });
});
