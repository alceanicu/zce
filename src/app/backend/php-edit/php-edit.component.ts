import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { take } from 'rxjs/operators';

import { IAnswerRow, IQuestion, IQuestionRow, Logger } from '@app/core';
import {
  PhpAnswerLabel,
  PhpHighlightingLanguage,
  PhpQuestionCategory,
  PhpQuestionDifficulty,
  PhpQuestionType
} from '@app/core/enum/config';
import { PhpQuestionService } from '@app/core/services/firestore/php-question.service';

const log = new Logger('PhpEditComponent');

export enum Type {
  CREATE = 'CREATE',
  EDIT = 'EDIT'
}

@Component({
  selector: 'app-php-edit',
  templateUrl: './php-edit.component.html',
  styleUrls: ['./php-edit.component.scss']
})
export class PhpEditComponent implements OnInit {
  public PhpQuestionType = PhpQuestionType;
  public PhpQuestionDifficulty = PhpQuestionDifficulty;
  public PhpQuestionCategory = PhpQuestionCategory;
  public PhpHighlightingLanguage = PhpHighlightingLanguage;
  public form: FormGroup;
  public questionRowsArray: FormArray;
  public fileUrl: any;
  private type: string;

  constructor(
    private firestorePhpQuestionService: PhpQuestionService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {
    this.buildForm();

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id > 0) {
      this.type = Type.EDIT;
      this.load(id);
    } else {
      this.type = Type.CREATE;
      this.addQuestionRow();
    }
  }

  get typeOptions(): Array<string> {
    return Object.keys(PhpQuestionType);
  }

  get difficultyOptions(): Array<string> {
    return Object.keys(PhpQuestionDifficulty);
  }

  get categoryOptions(): Array<string> {
    let options: string[] = Object.keys(PhpQuestionCategory);
    // The options list has the numeric keys, followed by the string keys
    // So, the first half is numeric, the 2nd half is strings
    options = options.slice(options.length / 2);
    return options;
  }

  get languageOptions(): Array<string> {
    return Object.keys(PhpHighlightingLanguage);
  }

  /**
   * returns all form groups under questionRows
   */
  get questionRowsFormGroup(): FormArray {
    return this.form.get('questionRows') as FormArray;
  }

  get answerRowsFormGroup(): FormArray {
    return this.form.get('answerRows') as FormArray;
  }

  get options(): Array<string> {
    let options: string[] = Object.keys(PhpAnswerLabel);
    // The options list has the numeric keys, followed by the string keys
    // So, the first half is numeric, the 2nd half is strings
    options = options.slice(options.length / 2);
    return options;
  }

  /**
   * init Answer formGroup
   */
  private initAnswerRow(i: number, isCorrect: boolean = false): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required],
      language: [PhpHighlightingLanguage.NONE, Validators.required],
      isCorrect: [isCorrect, Validators.required]
    });
  }

  /**
   * remove a Quiz form group
   */
  public removeQuizRow(index: number): void {
    if (this.questionRowsArray.length > 1) {
      this.questionRowsArray.removeAt(index);
    }
  }

  private buildForm() {
    const rows = [
      this.initAnswerRow(0, true),
      this.initAnswerRow(1),
      this.initAnswerRow(2),
      this.initAnswerRow(3)
    ];

    this.form = this.formBuilder.group({
      id: [null],
      type: [PhpQuestionType.RADIO, Validators.required],
      category: [[PhpQuestionCategory.PHP_BASICS], Validators.required],
      difficulty: [PhpQuestionDifficulty.EASY, Validators.required],
      questionRows: this.formBuilder.array([]),
      answerRows: this.formBuilder.array(rows)
    });

    // set questionRowsArray to this field
    this.questionRowsArray = this.form.get('questionRows') as FormArray;
  }

  public onSubmit(): void {
    const question = this.form.value as IQuestion;

    if (this.type === Type.EDIT) {
      this.firestorePhpQuestionService
        .updateQuestion(question)
        .pipe(take(1))
        .subscribe(
          id => {
            const nextId = id + 1;
            this.openSnackBar(`Update question with ID=${id}`, 'blue-snackbar');
            this.router
              .navigate([`/php-edit/${nextId}`])
              .then((e) => {
                if (e) {
                  this.generateMdFile(question)
                    .then(ok => log.info('')).finally(() => {
                    this.load(nextId);
                  });
                }
              });
          },
          error => {
            log.error(error);
            this.openSnackBar(`Update question with error: ` + error, 'red-snackbar');
          }
        );
    } else {
      this.firestorePhpQuestionService
        .addQuestion(question)
        .pipe(take(1))
        .subscribe(
          id => {
            log.info(`Insert question with ID=${id}`);
            this.openSnackBar(`Insert question with ID=${id}`, 'blue-snackbar');
          },
          error => {
            log.error(error);
            this.openSnackBar(`Created question with error: ` + error, 'red-snackbar');
          }
        );
    }
  }

  /**
   * init Quiz formGroup
   */
  public initQuestionRow(): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required],
      language: [PhpHighlightingLanguage.NONE, Validators.required],
    });
  }

  /**
   * Add a Quiz form group
   */
  public addQuestionRow(): void {
    this.questionRowsArray.push(this.initQuestionRow());
  }

  /**
   * get the formGroup under questionRowsArray form array
   */
  public getQuestionRowFormGroup(index: number): FormGroup {
    return this.questionRowsArray.controls[index] as FormGroup;
  }

  private openSnackBar(data: any, className: string, action: string = 'close') {
    this.snackBar.open(data, action, {
      duration: 3 * 2000,
      panelClass: [className]
    });
  }

  public getFileName(id: number): string {
    return `${id}`.padStart(4, '0') + '.md';
  }

  public generateMdFile(question: IQuestion): Promise<any> {
    return new Promise((resolve, reject) => {
      const blobParts = [];
      const prevFileName = this.getFileName(question.id - 1);
      const nextFileName = this.getFileName(question.id + 1);
      const fileName = this.getFileName(question.id);

      blobParts.push(`[<<< Previous question <<<](${prevFileName})`);
      blobParts.push(`   Question ID#${fileName}   `);
      blobParts.push(`[>>> Next question >>>](${nextFileName})\r\n`);
      blobParts.push('---');
      blobParts.push('\r\n\r\n');

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

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        resolve(window.navigator.msSaveOrOpenBlob(blob, fileName));
      } else {
        const a = this.document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        this.document.body.appendChild(a);
        a.click();
        this.document.body.removeChild(a);
        resolve(true);
      }
    });
  }

  private load(id: number): void {
    this.firestorePhpQuestionService
      .getQuestion(id)
      .pipe(take(1))
      .subscribe(
        // tslint:disable-next-line:variable-name
        DocumentSnapshot => {
          const question = DocumentSnapshot.data() as IQuestion;

          // FIXME
          if (question.hasOwnProperty('correctAnswerSum')) {
            // tslint:disable-next-line:no-string-literal
            delete question['correctAnswerSum'];
          }
          if (question.hasOwnProperty('correctValue')) {
            // tslint:disable-next-line:no-string-literal
            delete question['correctValue'];
          }
          [0, 1, 2, 3].forEach((v, i) => {
            if (question.answerRows[i].hasOwnProperty('correctValue')) {
              // tslint:disable-next-line:no-string-literal
              delete question.answerRows[i]['correctValue'];
            }
            if (question.answerRows[i].hasOwnProperty('correct')) {
              // tslint:disable-next-line:no-string-literal
              delete question.answerRows[i]['correct'];
            }
            if (question.answerRows[i].hasOwnProperty('value')) {
              // tslint:disable-next-line:no-string-literal
              delete question.answerRows[i]['value'];
            }
          });
          this.questionRowsArray.clear();

          const qLength = (question.questionRows.length || 0);
          for (let i = 0; i < qLength; i++) {
            this.addQuestionRow();
          }
          console.log('question', question);
          this.form.setValue(question);
        },
        (error) => log.error(`Error on update question with ID=${id} ${error}`),
        () => log.info('Update complete')
      );
  }
}
