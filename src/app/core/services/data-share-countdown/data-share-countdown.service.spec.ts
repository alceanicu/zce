import {TestBed} from '@angular/core/testing';
import {DataShareCountdownService} from './data-share-countdown.service';

describe('DataShareCountdownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataShareCountdownService = TestBed.get(DataShareCountdownService);
    expect(service).toBeTruthy();
  });
});
