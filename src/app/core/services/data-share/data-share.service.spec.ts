import { TestBed } from '@angular/core/testing';

import { DataShareService } from './data-share.service';

describe('DataShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataShareService = TestBed.get(DataShareService);
    expect(service).toBeTruthy();
  });
});
