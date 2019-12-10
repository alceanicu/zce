import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorageService } from '@app/core/services/session-storage/session-storage.service';
import { IDataService } from '@app/core/interfaces';

export abstract class SyncAbstract implements IDataService {
  public currentValue: Observable<any>;
  private messageSource: BehaviorSubject<any>;

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

  public abstract getValue(): any;

  public abstract setValue(value: any): void;

  protected getCurrentValue() {
    return this.sessionStorageService.getItem(this.key) || this.defaultValue;
  }

  protected updateCurrentValue(value: any): void {
    this.sessionStorageService.setItem(this.key, value);
    this.messageSource.next(value);
  }

  protected destroy(key: string): void {
    this.sessionStorageService.removeItem(key);
  }
}
