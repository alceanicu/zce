import { Component, OnDestroy, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService, Logger } from '@app/core/services';
import { IAnswerRow, IQuestion, IQuestionRow } from '@app/core/interfaces';
import { environment } from '@env/environment';
import { PhpQuestionService } from '@app/core/services/firestore/php-question.service';
import { Question } from '@app/core';

const log = new Logger('PhpListComponent');

@Component({
  selector: 'app-php-list',
  templateUrl: './php-list.component.html',
  styleUrls: ['./php-list.component.scss']
})

export class PhpListComponent implements OnInit, OnDestroy {
  public questionList: Observable<IQuestion[] | {}[]>;
  public page$: BehaviorSubject<number>;
  public page: number;
  public perPage = 5;
  public totalItemsNumber: number = environment.configPHP.max;
  private setting = {element: {dynamicDownload: null as HTMLElement}};
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly db: AngularFirestore,
    private firestorePhpQuestionService: PhpQuestionService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.page$ = new BehaviorSubject(1);

    this.questionList = combineLatest([this.page$])
      .pipe(
        switchMap(([page]) => this.db.collection(environment.configPHP.phpPath, queryFn => {
            let query: firebase.firestore.Query = queryFn;
            if (page) {
              this.page = page;
              const startAt = 1 + (this.perPage * (this.page - 1));
              log.info(`load page=${page} startAt=${startAt} perPage=${this.perPage}`);
              query = query
                .where('id', '>=', startAt)
                .orderBy('id')
                .limit(this.perPage);
            }
            return query;
          })
            .valueChanges()
        ),
        takeUntil(this.unsubscribe$)
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goToPage(page: number = 1) {
    this.page$.next(page);
  }

  deleteQuestion(id: number) {
    if (window.confirm(`Are sure you want to delete question with ID=${id}?`)) {
      this.firestorePhpQuestionService
        .deleteQuestion(id)
        .subscribe(
          delId => this.toastrService.success(`Successfully deleted question with id=${delId}`),
          error => log.error(error));
    }
  }

  generateMarkdownFile(q: IQuestion) {
    const question = new Question(q);
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;

    const file = new Blob(this.generateMdArray(question), {type: 'text/markdowntext/markdown; charset=UTF-8'});

    element.setAttribute('href', URL.createObjectURL(file));
    element.setAttribute('download', String(question.id).padStart(4, '0') + '.md');

    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

  private generateMdArray(question: Question): Array<any> {
    const mdArray: Array<any> = [];
    const id = 'Question ID#' + String(question.id).padStart(4, '0') + '.md ';
    let prev = '';
    let next = '';

    if (question.id > 1) {
      prev = '[<<< Previous question <<<](' + String(question.id - 1).padStart(4, '0') + '.md) ';
    }
    if (question.id < environment.configPHP.max) {
      next = '[>>> Next question >>>](' + String(question.id + 1).padStart(4, '0') + '.md)';
    }

    mdArray.push(`${prev} ${id} ${next} \n`);
    mdArray.push('\n');

    question.questionRows.forEach((questionRow: IQuestionRow) => {
      if (questionRow.language !== 2) {
        mdArray.push('```' + questionRow);
        mdArray.push('\n');
      }
      mdArray.push(questionRow.text);
      if (questionRow.language === 1) {
        mdArray.push('\n');
        mdArray.push('```');
      }
      mdArray.push('\n');
    });

    mdArray.push('\n');

    question.answerRows.forEach((answerRow: IAnswerRow) => {
      if (answerRow.correct) {
        mdArray.push('- [x] ');
      } else {
        mdArray.push('- [ ] ');
      }
      if (answerRow.language !== 2) {
        mdArray.push('\n');
        mdArray.push('```');
        mdArray.push('\n');
      }
      mdArray.push(answerRow.text);
      if (answerRow.language === 1) {
        mdArray.push('\n');
        mdArray.push('```');
      }
      mdArray.push('\n');
    });

    return mdArray;
  }
}
