import { Observable } from 'rxjs';

export interface IDataService {
  currentValue: Observable<any>;

  getValue(): any;

  setValue(value: any): void;
}
