import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { take } from 'rxjs/operators';

import { IQuestion, Logger } from '@app/core';
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
  private type: string;

  constructor(
    private firestorePhpQuestionService: PhpQuestionService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.buildForm();

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id > 0) {
      this.type = Type.EDIT;
      this.firestorePhpQuestionService
        .getQuestion(id)
        .pipe(take(1))
        .subscribe(
          // tslint:disable-next-line:variable-name
          DocumentSnapshot => {
            const question = DocumentSnapshot.data() as IQuestion;

            // // fixme
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

            const qLength = (question.questionRows.length || 0);
            for (let i = 0; i < qLength; i++) {
              this.addQuestionRow();
            }

            this.form.setValue(question);
          },
          (error) => log.error(`Error on update question with ID=${id} ${error}`),
          () => log.info('Update complete')
        );
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
            log.info(`Update question with ID=${id}`);
            this.openSnackBar(`Update question with ID=${id}`, 'blue-snackbar');
          },
          error => {
            log.error(error);
            this.openSnackBar(`Update question with error: ` + error, 'red-snackbar');
          },
          () => {
            this.router.navigate([`/backend/php-edit/${question.id + 1}`]).then(() => 'next');
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
}
