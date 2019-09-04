import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SessionStorageService} from '../session-storage/session-storage.service';
import {ICountdownTime} from '../../interfaces';
import {CountdownTime} from '../../models';
import {SyncAbstract} from '../../utils/abstract/sync-abstract';

@Injectable({
  providedIn: 'root'
})
export class SyncCountdownTimeService extends SyncAbstract {
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

