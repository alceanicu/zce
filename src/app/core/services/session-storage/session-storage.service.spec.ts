import {TestBed} from '@angular/core/testing';
import {SessionStorageService} from './session-storage.service';

describe('SessionStorageService', () => {
  const key: string = 'config';
  const obj: object = {counter: 806, timestamp: 1567246306157};

  let service: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [SessionStorageService]});
    service = TestBed.get(SessionStorageService);
    service.setItem(key, obj);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be undefined after cleared', () => {
    expect(service.clear()).toBeUndefined();
  });

  it('should equal', () => {
    expect(service.getItem(key)).toEqual(obj);
  });

  it('should be null if key does not exist', () => {
    expect(service.getItem('some_config')).toBeNull();
  });

  it('should be null after remove key', () => {
    service.removeItem(key);
    expect(service.getItem(key)).toBeNull();
  });
});
