import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IScore} from '../../interfaces';
import {Score} from '../../models';
import {SessionStorageService} from '../session-storage/session-storage.service';
import {SyncAbstract} from '../../utils/abstract/sync-abstract';

@Injectable({
  providedIn: 'root'
})
export class SyncScoreService extends SyncAbstract {
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
