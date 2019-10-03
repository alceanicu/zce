import { Injectable } from '@angular/core';

import { IDataService } from '@app/core/interfaces/i-data-service.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncLocationService implements IDataService {
  public currentValue: Observable<string>;
  private messageSource: BehaviorSubject<string>;

  constructor() {
    this.messageSource = new BehaviorSubject('/home');
    this.currentValue = this.messageSource.asObservable();
  }

  public getValue(): Observable<string> {
    return this.currentValue;
  }

  public setValue(value: string): void {
    this.messageSource.next(value);
  }
}
