import {TestBed} from '@angular/core/testing';
import {CountdownService} from './countdown.service';

describe('CountdownService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [CountdownService]});
  });

  it('should be created', () => {
    const service = TestBed.get(CountdownService);
    expect(service).toBeTruthy();
  });

  // it('should return number value from observable',
  //   (done: DoneFn) => {
  //     const service = TestBed.get(CountdownService);
  //     service.start(5400);
  //     service.countdown().subscribe((value: any) => {
  //       expect(value).toEqual(5400);
  //       done();
  //     });
  //   });
});
