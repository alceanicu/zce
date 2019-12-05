import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IScore } from '@app/core/interfaces';
import { Score } from '@app/core/models';
import { SessionStorageService } from '@app/core/services/session-storage/session-storage.service';
import { SyncAbstract } from '@app/core/utils/abstract/sync-abstract';

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

  public setValue(value: IScore): void {
    this.updateCurrentValue(value);
  }
}
