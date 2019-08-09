import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SessionStorageService} from '../session-storage/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private messageSource: BehaviorSubject<any>;
  public currentScore: Observable<any>;

  constructor(
    private sessionStorageService: SessionStorageService,
  ) {
    this.messageSource = new BehaviorSubject(this.getPercentage());
    this.currentScore = this.messageSource.asObservable();
  }

  getPercentage() {
    return this.sessionStorageService.getItem('percentage') || {total: 0, correct: 0, percentage: 0};
  }

  updatePercentage(correct: boolean) {
    const percentage = this.getPercentage();
    percentage.total = percentage.total + 1;
    percentage.correct = correct ? (percentage.correct + 1) : percentage.correct;
    percentage.percentage = Math.floor((percentage.correct * 100) / percentage.total);
    this.sessionStorageService.setItem('percentage', percentage);
    this.messageSource.next(percentage);
  }
}
