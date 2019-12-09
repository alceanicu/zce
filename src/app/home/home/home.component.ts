import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PdfService } from '@app/core/services/pdf/pdf.service';
import { Logger, Question, QuestionService } from '@app/core';
import { ToastrService } from 'ngx-toastr';

const log = new Logger('HomeComponent');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  private readonly state: any;

  constructor(
    private pdfService: PdfService,
    private questionService: QuestionService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.state = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    if (this.state !== undefined) { // if we received exam score
      const $this = this;
      const subscriber = {
        next() {
        },
        error(error: any) {
          log.error(error);
        },
        complete() {
          log.info(`You answered correctly to ${$this.state.score} questions from 70`);
        }
      };

      if (this.state.score >= 50) {
        const message = 'Congratulations you passed the exam!';
        this.toastrService
          .success(message, 'Exam result!', {closeButton: true})
          .onHidden
          .subscribe(subscriber);
      } else {
        const message = 'You did not passed the exam!';
        this.toastrService
          .warning(message, 'Exam result!', {closeButton: true})
          .onHidden
          .subscribe(subscriber);
      }
    }
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
