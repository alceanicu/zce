import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PhpQuestionService } from '@app/core/services/firestore/php-question.service';
import { IAnswerRow, IOption, IQuestion } from '@app/core/interfaces';
import { Logger } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Extension, PhpAnswerType, PhpCategory, PhpQuestionDifficulty } from '@app/core/enum/config';

const log = new Logger('PhpEditComponent');

@Component({
  selector: 'app-php-edit',
  templateUrl: './php-edit.component.html'
})
export class PhpEditComponent implements OnInit {
  public keys = Object.keys;
  public Extension = Extension;
  public PhpAnswerType = PhpAnswerType;
  public PhpCategory = PhpCategory;
  public PhpQuestionDifficulty = PhpQuestionDifficulty;
  public form: FormGroup;
  public questionRowsArray: FormArray;
  public type: string;

  constructor(
    public firestorePhpQuestionService: PhpQuestionService,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    this.buildForm();

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id > 0) {
      this.type = 'EDIT';
      this.firestorePhpQuestionService
        .getQuestion(id)
        .pipe(take(1))
        .subscribe(
          DocumentSnapshot => {
            const question = DocumentSnapshot.data() as IQuestion;
            const qLength = (question.questionRows.length || 0);
            for (let i = 0; i < qLength; i++) {
              this.addQuestionRow();
            }

            // fixme
            let v = 0;
            question.answerRows.forEach((row: IAnswerRow, k) => {
              if (!row.hasOwnProperty('value')) {
                question.answerRows[k].value = 0;
              }

              // fixme
              if (question.answerRows[k].correct) {
                question.answerRows[k].value = Math.pow(2, k);
                v += question.answerRows[k].value;
              }
            });
            question.value = v;

            this.form.setValue(question);
          },
          (error: any) => log.error(`Error on update question with ID=${id} ${error}`),
          () => log.info('Update complete')
        );
    } else {
      this.type = 'CREATE';
      this.addQuestionRow();
    }
  }

  /**
   * Contains Reactive Form logic
   */
  buildForm() {
    const rows = [this.initAnswerRow(0, true), this.initAnswerRow(1), this.initAnswerRow(2), this.initAnswerRow(3)];
    this.form = this.formBuilder.group({
      id: [null],
      category: [1, Validators.required],
      difficulty: [2, Validators.required],
      type: [1, Validators.required],
      value: [0, Validators.required],
      questionRows: this.formBuilder.array([]),
      answerRows: this.formBuilder.array(rows)
    });

    // set questionRowsArray to this field
    this.questionRowsArray = this.form.get('questionRows') as FormArray;
  }

  /**
   * returns all form groups under questionRows
   */
  get questionRowsFormGroup() {
    return this.form.get('questionRows') as FormArray;
  }

  get answerRowsFormGroup() {
    return this.form.get('answerRows') as FormArray;
  }

  /**
   * get the formGroup under questionRowsArray form array
   */
  getQuestionRowFormGroup(index: number): FormGroup {
    return this.questionRowsArray.controls[index] as FormGroup;
  }

  /**
   * init Quiz formGroup
   */
  initQuestionRow(): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required],
      language: ['none', Validators.required],
    });
  }

  /**
   * init Answer formGroup - FIXME correct
   */
  initAnswerRow(i: number, correct: boolean = false): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required],
      language: ['none', Validators.required],
      value: [Math.pow(2, i), Validators.required],
      correct: [correct],
    });
  }

  /**
   * Add a Quiz form group
   */
  addQuestionRow() {
    this.questionRowsArray.push(this.initQuestionRow());
  }

  /**
   * remove a Quiz form group
   */
  removeQuizRow(index: number) {
    if (this.questionRowsArray.length > 1) {
      this.questionRowsArray.removeAt(index);
    }
  }

  /**
   * method triggered when form is submitted
   */
  onSubmit() {
    const question = this.form.value as IQuestion;

    question.answerRows.forEach((o, k) => { // fixme correct
      question.answerRows[k].correct = (o.value > 0);
    });

    if (this.type === 'EDIT') {
      this.firestorePhpQuestionService
        .updateQuestion(question)
        .pipe(take(1))
        .subscribe(
          id => this.toastrService.success(`Update question with ID=${id}`, 'Edit question', {timeOut: 1000}),
          error => this.toastrService.error('Update question with error: ' + error),
          () => this.router.navigate([`/backend/php-edit/${question.id + 1}`]).then(() => 'next')
        );
    } else {
      this.firestorePhpQuestionService
        .addQuestion(question)
        .pipe(take(1))
        .subscribe(
          id => this.toastrService.success(`Insert question with ID=${id}`, 'Insert question'),
          error => this.toastrService.error('Created question with error: ' + error)
        );
    }
  }

  // get difficultyOptions(): IOption[] { // fixme
  //   return Helper.arrayConfigToIOptionArray(environment.configPHP.difficultyOptions);
  // }

  // get typeOptions(): IOption[] { // fixme
  //   return Helper.arrayConfigToIOptionArray(environment.configPHP.typeOptions);
  // }

  // get categoryOptions(): IOption[] { // fixme
  //   return Helper.arrayConfigToIOptionArray(environment.configPHP.categoryOptions);
  // }

  // get languageOptions(): IOption[] {
  //   return Helper.arrayConfigToIOptionArray(environment.configPHP.extensionsAllowed);
  // }

  // get correctOptions(): Array<any> { // fixme
  //   return environment.configPHP.correctOptions;
  // }

  valueOptions(i: number): Array<any> {
    return [
      {value: 0, text: 'NO'},
      {value: Math.pow(2, i), text: 'YES'}
    ];
  }

  onChangeVal() {
    const v = this.form.value.answerRows[0].value +
      this.form.value.answerRows[1].value +
      this.form.value.answerRows[2].value +
      this.form.value.answerRows[3].value;

    this.form.controls.value.setValue(v);
  }
}

