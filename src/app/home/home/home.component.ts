import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PdfService } from '@app/core/services/pdf/pdf.service';
import { Logger, Question, QuestionService } from '@app/core';

const log = new Logger('HomeComponent');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private pdfService: PdfService,
    private questionService: QuestionService
  ) {
  }

  ngOnDestroy(): void {
    log.info('ngOnDestroy');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public generatePDF(questionNumber: number): void {
    const questionArray: Question[] = [];
    this.questionService
      .getQuestion(questionNumber)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        question => questionArray.push(question),
        error => log.error(error),
        () => {
          log.info('PDF test Done!');
          if (questionArray.length === questionNumber) {
            this.pdfService.generatePDF(questionArray);
          }
        }
      );
  }
}
