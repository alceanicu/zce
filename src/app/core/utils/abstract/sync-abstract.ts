import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';
import { IDataService } from '../../interfaces/i-data-service.interface';

export abstract class SyncAbstract implements IDataService {
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

  public abstract setValue(value): void;
}

