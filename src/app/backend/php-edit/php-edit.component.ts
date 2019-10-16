import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PhpQuestionService } from '@app/core/services/firestore/php-question.service';
import { IAnswerRow, IOption, IQuestion } from '@app/core/interfaces';
import { environment } from '@env/environment';
import { Helper } from '@app/core/utils';
import { Logger } from '@app/core';
import { ToastrService } from 'ngx-toastr';

const log = new Logger('PhpEditComponent');

@Component({
  selector: 'app-php-edit',
  templateUrl: './php-edit.component.html'
})
export class PhpEditComponent implements OnInit {
  // public idDb: number;
  public form: FormGroup;
  public questionRowsArray: FormArray;
  public type: string;

  // public value: number;

  constructor(
    public firestorePhpQuestionService: PhpQuestionService,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
    // private apiService: ApiService,
  ) {
  }

  ngOnInit() {
    this.buildForm();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.type = 'EDIT';
      this.firestorePhpQuestionService
        .getQuestion(Number(id))
        .subscribe(
          DocumentSnapshot => {
            const question = DocumentSnapshot.data() as IQuestion;
            const qLength = (question.questionRows.length || 0);
            for (let i = 0; i < qLength; i++) {
              this.addQuestionRow();
            }

            // fixme
            if (!question.hasOwnProperty('value')) {
              question.value = 0;
            }

            question.answerRows.forEach((row: IAnswerRow, k) => {
              if (!row.hasOwnProperty('value')) {
                question.answerRows[k].value = 0;
              }

              // fixme
              if (question.answerRows[k].correct) {
                question.answerRows[k].value = Math.pow(2, k);
                question.value += question.answerRows[k].value;
              }
            });
            //
            // question.id_db = '';
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
      // id_db: [null],
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
        .subscribe(
          id => this.toastrService.success(`Update question with ID=${id}`, 'Edit question'),
          error => this.toastrService.error('Update question with error: ' + error)
        );
    } else {
      this.firestorePhpQuestionService
        .addQuestion(question)
        .subscribe(
          id => this.toastrService.success(`Insert question with ID=${id}`, 'Insert question'),
          error => this.toastrService.error('Created question with error: ' + error)
        );
    }
  }

  get categoryOptions(): IOption[] {
    return Helper.arrayConfigToIOptionArray(environment.configPHP.categoryOptions);
  }

  get difficultyOptions(): IOption[] {
    return Helper.arrayConfigToIOptionArray(environment.configPHP.difficultyOptions);
  }

  get typeOptions(): IOption[] {
    return Helper.arrayConfigToIOptionArray(environment.configPHP.typeOptions);
  }

  get languageOptions(): IOption[] {
    return Helper.arrayConfigToIOptionArray(environment.configPHP.extensionsAllowed);
  }

  get correctOptions(): Array<any> { // fixme
    return environment.configPHP.correctOptions;
  }

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

  // getQuizFromDB() {
  //   const n = this.form.value.id_db;
  //   if (!isNaN(parseFloat(n)) && isFinite(n)) {
  //     log.info(`${n} ok`);
  //   } else {
  //     log.info(`${n} nu e numar`);
  //   }
  // }

  // getQuizFromDB() {
  //   const $this = this;
  //   const id = this.idDb;
  //   if (isFinite(id)) { // && !isNaN(parseFloat(id))
  //     log.info(`${id} ok`);
  //     $this.removeAllQuestionRow();
  //
  //     this.apiService.getQuestionById(id).subscribe((question: any) => {
  //         const qLength = (question.questionRows.length || 0);
  //         for (let i = 0; i < qLength; i++) {
  //           $this.addQuestionRow();
  //         }
  //         log.info(question);
  //         $this.form.setValue(question);
  //       },
  //       error => log.error(error),
  //       () => log.info('ok')
  //     );
  //   } else {
  //     log.info(`${id} nu e numar`);
  //   }
  // }
}

