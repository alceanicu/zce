import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService, Logger } from '@app/core/services';
import { IConfig, IQuestion } from '@app/core/interfaces';
import { environment } from '@env/environment';
import { PhpQuestionService } from '@app/core/services/firestore/php-question.service';

const log = new Logger('PhpListComponent');

@Component({
  selector: 'app-php-list',
  templateUrl: './php-list.component.html',
  styleUrls: ['./php-list.component.scss']
})

export class PhpListComponent implements OnInit {
  public questionList: Observable<IQuestion[] | {}[]>;
  public page$: BehaviorSubject<string | null>;
  public page: number;
  public perPage = 5;
  public totalItemsNumber: number;

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
    this.localStorageService.getAppConfig().subscribe(
      c => {
        if (config !== null) {
          $this.totalItemsNumber = Number(c.counter);
          log.info(`totalPageNumber=${$this.totalItemsNumber}`);
        }
      },
      error => log.error(error));

    this.questionList = combineLatest([this.page$]).pipe(
      switchMap(([page]) => this.db.collection(environment.configPHP.phpPath, ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (page) {
            $this.page = Number(page);
            const startAt = +(1 + (this.perPage * (Number(page) - 1)));
            log.info(`startAt=${startAt}`);
            query = query.where('id', '>=', startAt).orderBy('id').limit(this.perPage);
          }
          return query;
        }).valueChanges()
      )
    );

    this.questionList.subscribe(
      data => {
        if (data.length <= 0) {
          this.goToPage(1);
        }
      },
      error => log.error(`something wrong occurred: ${error}`)
    );
  }

  goToPage(page: number | null) {
    this.page$.next(String(page));
  }

  deleteQuestion(id: number) {
    if (window.confirm(`Are sure you want to delete question with ID=${id}?`)) {
      this.firestorePhpQuestionService.deleteQuestion(id).subscribe(
        i => {
          this.toastrService.success(`Successfully deleted question with id=${id}`);
        },
        error => log.error(error));
    }
  }
}
