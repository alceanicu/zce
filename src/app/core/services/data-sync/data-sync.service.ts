import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SessionStorageService} from '../session-storage/session-storage.service';
import {CountdownTime, ICountdownTime, IScore, Score} from '../../models';

abstract class BaseDataSyncService {
  private messageSource: BehaviorSubject<any>;
  public currentValue: Observable<any>;

  protected constructor(
    private readonly key: string,
    private readonly defaultValue: any,
    private readonly sessionStorageService: SessionStorageService
  ) {
    this.key = key;
    this.defaultValue = defaultValue;
    this.sessionStorageService = new SessionStorageService();
    this.messageSource = new BehaviorSubject(this.getCurrentValue());
    this.currentValue = this.messageSource.asObservable();
  }

  protected getCurrentValue() {
    return this.sessionStorageService.getItem(this.key) || this.defaultValue;
  }

  protected updateCurrentValue(value) {
    this.sessionStorageService.setItem(this.key, value);
    this.messageSource.next(value);
  }

  public abstract getValue();
  public abstract setValue(value);
}

@Injectable({
  providedIn: 'root'
})
export class CountdownTimeSyncService extends BaseDataSyncService {
  public currentValue: Observable<ICountdownTime>;

  constructor() {
    super('countdown-time', new CountdownTime(), new SessionStorageService());
  }

  public getValue(): ICountdownTime {
    return this.getCurrentValue();
  }

  public setValue(value: ICountdownTime) {
    this.updateCurrentValue(value);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ScoreSyncService extends BaseDataSyncService {
  public currentValue: Observable<IScore>;

  constructor() {
    super('score', new Score(), new SessionStorageService());
  }

  public getValue(): IScore {
    return this.getCurrentValue();
  }

  public setValue(value: IScore) {
    this.updateCurrentValue(value);
  }
}
