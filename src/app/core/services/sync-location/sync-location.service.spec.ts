import { TestBed } from '@angular/core/testing';
import { SyncLocationService } from '@app/core';

describe('SyncLocationService', () => {
  let service: SyncLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new SyncLocationService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return same value after set', (done: DoneFn) => {
    service.setValue('100');
    service.getValue().subscribe(q => {
      expect(q).toEqual('100');
      done();
    });
  });
});
