import { Injectable } from '@angular/core';

import { IDataService } from '../../interfaces/i-data-service.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncLocationService implements IDataService {
  private messageSource: BehaviorSubject<string>;
  public currentValue: Observable<string>;

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
