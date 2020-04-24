import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { environment } from '@env/environment';
import { PdfService } from '@app/core/services/pdf/pdf.service';
import { Logger, Question, QuestionService } from '@app/core';

const log = new Logger('HomeComponent');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  private readonly state?: { [k: string]: any; };
  public btnPdf5: boolean = false;
  public btnPdf10: boolean = false;

  public constructor(
    private questionService: QuestionService,
    private pdfService: PdfService,
    private snackBar: MatSnackBar,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.state = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    if (this.state !== undefined) { // if we received exam score
      this.openSnackBar(`You answered correctly to ${this.state.score} questions from ${environment.configPHP.examSize}`, 'blue-snackbar');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public generatePDF(questionNumber: number): void {
    if (questionNumber === 5) {
      this.btnPdf5 = true;
    }
    if (questionNumber === 10) {
      this.btnPdf10 = true;
    }
    this.cdr.detectChanges();
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
          this.btnPdf5 = this.btnPdf10 = false;
          this.cdr.markForCheck();
        }
      );
  }

  private openSnackBar(data: any, className: string, action: string = 'close'): void {
    const snack = this.snackBar.open(data, action, {
      duration: 5 * 1000,
      panelClass: [className]
    });

    // snack.afterDismissed().subscribe(() => {
    //   this.getRandomQuestion();
    // });
  }
}
