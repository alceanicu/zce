import { TestBed } from '@angular/core/testing';

import { SyncScoreService } from './sync-score.service';

describe('SyncScoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SyncScoreService = TestBed.get(SyncScoreService);
    expect(service).toBeTruthy();
  });
});
