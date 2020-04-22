import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import * as firebase from 'firebase';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';

import { environment } from '@env/environment';
import { IQuestion } from '@app/core';
import { PhpQuestionDifficulty, PhpQuestionCategory, PhpQuestionType } from '@app/core/enum/config';

@Component({
  selector: 'app-php-list',
  templateUrl: './php-list.component.html',
  styleUrls: ['./php-list.component.scss']
})
export class PhpListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource = new MatTableDataSource<IQuestion>();
  public PhpQuestionCategory = PhpQuestionCategory;
  public PhpQuestionType = PhpQuestionType;
  public PhpQuestionDifficulty = PhpQuestionDifficulty;
  displayedColumns = [
    'id',
    'type',
    'category',
    'difficulty',
    'questionRows',
    'actions'
  ];
  length: number;
  pageSize: number;
  pageSizeOptions: number[];

  public questionList$: Observable<IQuestion[]>;
  public page$: BehaviorSubject<number>;
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly db: AngularFirestore,
    private router: Router,
  ) {
    this.length = environment.configPHP.max;
    this.pageSize = 5;
    this.pageSizeOptions = [5, 10, 25];

    this.page$ = new BehaviorSubject(1);

    this.questionList$ = combineLatest([this.page$])
      .pipe(
        switchMap(([page]) => this.db.collection(environment.configPHP.phpPath, queryFn => {
            let query: firebase.firestore.Query = queryFn;
            if (page) {
              const startAt = 1 + (this.pageSize * (page - 1));
              console.log(`load page=${page} startAt=${startAt} perPage=${this.pageSize}`);
              query = query
                .where('id', '>=', startAt)
                .orderBy('id')
                .limit(this.pageSize);
            }
            return query;
          })
            .valueChanges() as Observable<IQuestion[]>
        ),
        takeUntil(this.unsubscribe$)
      );
  }

  ngOnInit(): void {
    this.questionList$.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onPageClick($event: PageEvent) {
    console.log($event);
    this.pageSize = $event.pageSize;
    this.page$.next($event.pageIndex + 1);
  }

  public editQuiz(id: number) {
    this.router
      .navigate(['/backend/php-edit/' + id])
      .then(() => console.log(id));
  }
}
