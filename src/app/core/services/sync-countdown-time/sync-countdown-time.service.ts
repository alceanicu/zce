import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { SessionStorageService } from '@app/core/services/session-storage/session-storage.service';
import { ICountdownTime } from '@app/core/interfaces';
import { CountdownTime } from '@app/core/models';
import { SyncAbstract } from '@app/core/utils/abstract/sync-abstract';

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

  public setValue(value: ICountdownTime): void {
    this.updateCurrentValue(value);
  }

  public clear(): void {
    this.destroy('countdown-time');
  }
}
