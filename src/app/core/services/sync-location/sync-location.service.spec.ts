import { TestBed } from '@angular/core/testing';

import { SyncLocationService } from './sync-location.service';

describe('SyncLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SyncLocationService = TestBed.get(SyncLocationService);
    expect(service).toBeTruthy();
  });
});
