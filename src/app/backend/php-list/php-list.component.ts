import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import * as firebase from 'firebase';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';

import { environment } from '@env/environment';
import { IAnswerRow, IQuestion, IQuestionRow } from '@app/core';
import { PhpHighlightingLanguage, PhpQuestionCategory, PhpQuestionDifficulty, PhpQuestionType } from '@app/core/enum/config';

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
  fileUrl: any;

  public questionList$: Observable<IQuestion[]>;
  public page$: BehaviorSubject<number>;
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly db: AngularFirestore,
    private router: Router,
    private sanitizer: DomSanitizer
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

  public onPageClick($event: PageEvent): void {
    this.pageSize = $event.pageSize;
    this.page$.next($event.pageIndex + 1);
  }

  public editQuiz(id: number): void {
    this.router
      .navigate(['/backend/php-edit/' + id])
      .then(() => console.log(id));
  }

  public getFileName(id: number): string {
    return `${id}`.padStart(4, '0') + '.md';
  }

  public generateMdFile(question: IQuestion): void {
    const blobParts = [];

    blobParts.push(`[<<< Previous question <<<](${this.getFileName(question.id - 1)})`);
    blobParts.push(`   Question ID#${this.getFileName(question.id)}   `);
    blobParts.push(`[>>> Next question >>>](${question.id + 1}.md)\r\n\r\n`);

    question.questionRows.forEach((value: IQuestionRow, index, array) => {
      if (value.language !== PhpHighlightingLanguage.NONE) {
        blobParts.push('```' + value.language + '\r\n');
      }
      blobParts.push(`${value.text}\r\n`);
      if (value.language !== PhpHighlightingLanguage.NONE) {
        blobParts.push('```' + '\r\n');
      }
    });

    blobParts.push('\r\n');

    const abcd = ['A', 'B', 'C', 'D'];
    let correct = '';

    question.answerRows.forEach((value: IAnswerRow, index) => {
      if (value.language === PhpHighlightingLanguage.NONE) {
        blobParts.push(`- [ ] ${abcd[index]}) ${question.answerRows[index].text}`);
      } else {
        blobParts.push(`- [ ] ${abcd[index]})`);
        blobParts.push(`${question.answerRows[index].text}`);
      }
      blobParts.push(`\r\n`);
      if (value.isCorrect) {
        correct += `${abcd[index]}, `;
      }
    });
    correct = correct.slice(0, -2);

    blobParts.push(`\r\n<details><summary><b>Answer</b></summary>\r\n`);
    blobParts.push(`<p>\r\n`);
    blobParts.push(`  Answer: <strong>${correct}</strong>\r\n`);
    blobParts.push(`</p>\r\n`);
    blobParts.push(`</details>\r\n`);

    const blob = new Blob(blobParts, { type: 'text/markdown' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
}
