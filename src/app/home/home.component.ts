import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { environment } from '@env/environment';
import { PdfService } from '@app/core/services/pdf/pdf.service';
import { Logger, Question, QuestionService } from '@app/core';
import { Router } from '@angular/router';

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
    log.info('on constructor');
    this.state = this.router.getCurrentNavigation().extras.state;

    // t.deleteTodo({id: 1, todo: 'todo', category: 'category'}).then(data => console.log(data)).catch(error => console.log(error));
    // t.addTodo({todo: 'todo', category: 'category'}).then(data => console.log(data));

    // t.getById(9)
    //   // .pipe(take(1))
    //   .subscribe(
    //     // tslint:disable-next-line:variable-name
    //     DocumentSnapshot => {
    //       const question = DocumentSnapshot.data();
    //       console.log('xx', question);
    //     });
  }

  ngOnInit(): void {
    log.info('on ngOnInit');
    if (this.state !== undefined) { // if we received exam score
      this.openSnackBar(`You answered correctly to ${this.state.score} questions from ${environment.configPHP.examSize}`, 'blue-snackbar');
    }
  }

  ngOnDestroy(): void {
    log.info('on ngOnDestroy');
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
    //   console.log('The snack-bar was dismissed');
    //   this.getRandomQuestion();
    // });
  }
}
