import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SessionStorageService} from '../session-storage/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataShareCountdownService {
  private messageSource: BehaviorSubject<any>;
  public currentCountdownTime: Observable<any>;

  constructor(
    private sessionStorageService: SessionStorageService,
  ) {
    this.messageSource = new BehaviorSubject(this.getCurrentCountdownTime());
    this.currentCountdownTime = this.messageSource.asObservable();
  }

  getCurrentCountdownTime() {
    return this.sessionStorageService.getItem('countdown-time') || {time: ''};
  }

  updateCurrentCountdownTime(time: string) {
    const obj = this.getCurrentCountdownTime();
    obj.time = time;
    this.sessionStorageService.setItem('countdown-time', obj);
    this.messageSource.next(obj);
  }
}
