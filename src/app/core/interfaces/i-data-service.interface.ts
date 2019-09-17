import { BehaviorSubject, Observable } from 'rxjs';

export interface IDataService {
  currentValue: Observable<any>;

  getValue();

  setValue(value: any): void;
}
