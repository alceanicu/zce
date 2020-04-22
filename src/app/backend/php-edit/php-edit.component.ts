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
import { MatSelectChange } from '@angular/material/select';

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

            // fixme
            // delete(question.correctValue);
            // delete(question.answerRows[0].correctValue);
            // delete(question.answerRows[0].correct);
            // delete(question.answerRows[1].correctValue);
            // delete(question.answerRows[1].correct);
            // delete(question.answerRows[2].correctValue);
            // delete(question.answerRows[2].correct);
            // delete(question.answerRows[3].correctValue);
            // delete(question.answerRows[3].correct);

            if (!question.correctAnswerSum) {
              question.correctAnswerSum = 1;
            }
            question.answerRows[0].value = 1;
            question.answerRows[1].value = 2;
            question.answerRows[2].value = 4;
            question.answerRows[3].value = 8;
            question.answerRows[0].isCorrect = true;
            question.answerRows[1].isCorrect = false;
            question.answerRows[2].isCorrect = false;
            question.answerRows[3].isCorrect = false;

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
   * init Answer formGroup - FIXMe
   */
  private initAnswerRow(i: number, isCorrect: boolean = false): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required],
      language: [PhpHighlightingLanguage.NONE, Validators.required],
      value: [Math.pow(2, i), Validators.required],
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
      answerRows: this.formBuilder.array(rows),
      correctAnswerSum: [1, Validators.required],
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
            this.openSnackBar(`Update question with ID=${id}`, 'success-snackbar');
          },
          error => {
            log.error(error);
            this.openSnackBar(`Update question with error: ` + error, 'error-snackbar');
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
            this.openSnackBar(`Insert question with ID=${id}`, 'success-snackbar');
          },
          error => {
            log.error(error);
            this.openSnackBar(`Created question with error: ` + error, 'error-snackbar');
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

  // /**
  //  * @deprecated
  //  */
  // public pow(i: number) {
  //   return Math.pow(2, i);
  // }
  //
  // /**
  //  * @deprecated
  //  */
  // public valueOptions(i: number): IOption[] {
  //   return [
  //     {value: 0, text: 'NO'},
  //     {value: Math.pow(2, i), text: 'YES'}
  //   ];
  // }

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

  // /**
  //  * @deprecated - version 3.0.0
  //  */
  // public onChangeVal(): void {
  //   const v = this.form.value.answerRows[0].value +
  //     this.form.value.answerRows[1].value +
  //     this.form.value.answerRows[2].value +
  //     this.form.value.answerRows[3].value;
  //
  //   this.form.controls.value.setValue(v);
  // }

  public isCorrectSelect($event: MatSelectChange, i: number): void {
    console.log($event, i);
    let correctAnswerSum = this.form.controls.correctAnswerSum.value;
    if ($event.value) {
      correctAnswerSum += Math.pow(2, i);
    } else {
      correctAnswerSum -= Math.pow(2, i);
    }

    if ([1, 2, 4, 8].includes(correctAnswerSum)) {
      this.form.controls.type.setValue(PhpQuestionType.RADIO);
    } else {
      this.form.controls.type.setValue(PhpQuestionType.CHECKBOX);
    }

    this.form.controls.correctAnswerSum.setValue(correctAnswerSum);
  }
}
