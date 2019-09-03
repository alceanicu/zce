import {TestBed} from '@angular/core/testing';
import {CountdownService} from './countdown.service';
import {Observable} from 'rxjs';

describe('CountdownService', () => {
  let service: CountdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [CountdownService]});
    service = TestBed.get(CountdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
