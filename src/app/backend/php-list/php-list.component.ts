import { Component, OnDestroy, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService, Logger } from '@app/core/services';
import { IAnswerRow, IConfig, IQuestion, IQuestionRow } from '@app/core/interfaces';
import { environment } from '@env/environment';
import { PhpQuestionService } from '@app/core/services/firestore/php-question.service';
import * as firebase from 'firebase';
import { Question } from '@app/core';

const log = new Logger('PhpListComponent');

@Component({
  selector: 'app-php-list',
  templateUrl: './php-list.component.html',
  styleUrls: ['./php-list.component.scss']
})

export class PhpListComponent implements OnInit, OnDestroy {
  public questionList: Observable<IQuestion[] | {}[]>;
  public page$: BehaviorSubject<string | null>;
  public page: number;
  public perPage = 5;
  public totalItemsNumber: number;
  private localStorageSubscription: Subscription;
  private listQuizSubscription: Subscription;
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  };

  constructor(
    private readonly db: AngularFirestore,
    private firestorePhpQuestionService: PhpQuestionService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.page$ = new BehaviorSubject('1');
    const $this = this;
    const config = JSON.parse(localStorage.getItem('config')) as IConfig;
    this.localStorageSubscription = this.localStorageService.getAppConfig().subscribe(
      c => {
        if (config !== null) {
          $this.totalItemsNumber = Number(c.counter);
          log.info(`totalPageNumber=${$this.totalItemsNumber}`);
        }
      },
      (error: any) => log.error(error)
    );

    this.questionList = combineLatest([this.page$]).pipe(
      switchMap(([page]) => this.db.collection(environment.configPHP.phpPath, queryFn => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = queryFn;
          if (page) {
            $this.page = Number(page);
            const startAt = +(1 + (this.perPage * (Number(page) - 1)));
            log.info(`startAt=${startAt}`);
            query = query
              .where('id', '>=', startAt)
              .orderBy('id')
              .limit(this.perPage);
          }
          return query;
        }).valueChanges()
      )
    );

    this.listQuizSubscription = this.questionList.subscribe(
      data => {
        if (data.length <= 0) {
          this.goToPage(1);
        }
      },
      error => log.error(`something wrong occurred: ${error}`)
    );
  }

  ngOnDestroy(): void {
    this.localStorageSubscription.unsubscribe();
    this.listQuizSubscription.unsubscribe();
  }

  goToPage(page: number = 1) {
    this.page$.next(String(page));
  }

  deleteQuestion(id: number) {
    if (window.confirm(`Are sure you want to delete question with ID=${id}?`)) {
      this.firestorePhpQuestionService.deleteQuestion(id).subscribe(
        i => {
          this.toastrService.success(`Successfully deleted question with id=${i}`);
        },
        error => log.error(error));
    }
  }

  generateMarkdownFile(q: IQuestion) {
    const question = new Question(q);
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const arr = this.generateMdArray(question);

    const file = new Blob(arr, {type: 'text/markdowntext/markdown; charset=UTF-8'});

    element.setAttribute('href', URL.createObjectURL(file));
    element.setAttribute('download', String(question.id).padStart(4, '0') + '.md');

    const event = new MouseEvent('click');
    element.dispatchEvent(event);
    // log.info(`Generate Markdown File ${question.id}`);
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

  // private dyanmicDownloadByHtmlTag(arg: {
  //                                    fileName: string,
  //                                    text: string
  //                                  }
  // ) {
  //   if (!this.setting.element.dynamicDownload) {
  //     this.setting.element.dynamicDownload = document.createElement('a');
  //   }
  //   const element = this.setting.element.dynamicDownload;
  //   const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
  //   element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
  //   element.setAttribute('download', arg.fileName);
  //
  //   const event = new MouseEvent('click');
  //   element.dispatchEvent(event);
  // }

  /*
 setTimeout("create('Hello world!', 'myfile.md', 'text/markdowntext/markdown; charset=UTF-8')");

 function create(text, name, type) {
      const dlBtn = document.getElementById("dlBtn");
      let file = new Blob([text, '\n', 'dddd'], {type: type});
      dlBtn.href = URL.createObjectURL(file);
      dlBtn.download = name;
  }
   */
}
