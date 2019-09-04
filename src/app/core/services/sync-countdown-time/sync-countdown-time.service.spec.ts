import { TestBed } from '@angular/core/testing';

import { SyncCountdownTimeService } from './sync-countdown-time.service';

describe('SyncCountdownTimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SyncCountdownTimeService = TestBed.get(SyncCountdownTimeService);
    expect(service).toBeTruthy();
  });
});
