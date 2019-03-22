import { TestBed } from '@angular/core/testing';

import { PrismService } from './prism.service';

describe('PrismService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrismService = TestBed.get(PrismService);
    expect(service).toBeTruthy();
  });
});
