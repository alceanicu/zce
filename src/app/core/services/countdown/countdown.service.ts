import { Injectable } from '@angular/core';

import { Observable, Subject, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Logger } from '@app/core/services/logger/logger.service';
import { environment } from '@env/environment';

const log = new Logger('CountdownService');

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private countdownSubject = new Subject<number>();
  private isCounting = false;

  public countdown(): Observable<number> {
    return this.countdownSubject.asObservable();
  }

  public start(count: number): void {
    // Ensure that only one timer is in progress at any given time.
    if (!this.isCounting) {
      this.isCounting = true;
      timer(0, 1000)
        .pipe(
          take(environment.configPHP.examTime),
          map(t => count - t)
        )
        .subscribe(
          (seconds: number) => this.countdownSubject.next(seconds),
          error => log.error(error),
          () => {
            this.countdownSubject.complete();
            this.isCounting = false;
            // Reset the countdown Subject so that a countdown can be performed more than once.
            this.countdownSubject = new Subject<number>();
          }
        );
    }
  }
}
