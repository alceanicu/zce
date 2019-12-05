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

  /**
   * returns all form groups under questionRows
   */
  get questionRowsFormGroup(): FormArray {
    return this.form.get('questionRows') as FormArray;
  }

  get answerRowsFormGroup(): FormArray {
    return this.form.get('answerRows') as FormArray;
  }

  get difficultyOptions(): Array<string> {
    return Object.keys(PhpQuestionDifficulty);
  }

  get typeOptions(): Array<string> {
    return Object.keys(PhpAnswerType);
  }

  get categoryOptions(): Array<string> {
    return Object.keys(PhpCategory);
  }

  get languageOptions(): Array<string> {
    return Object.keys(Extension);
  }

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

  public ngOnInit(): void {
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
   * get the formGroup under questionRowsArray form array
   */
  public getQuestionRowFormGroup(index: number): FormGroup {
    return this.questionRowsArray.controls[index] as FormGroup;
  }

  /**
   * init Quiz formGroup
   */
  public initQuestionRow(): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required],
      language: [+Extension.NONE, Validators.required],
    });
  }

  /**
   * Add a Quiz form group
   */
  public addQuestionRow(): void {
    this.questionRowsArray.push(this.initQuestionRow());
  }

  /**
   * remove a Quiz form group
   */
  public removeQuizRow(index: number): void {
    if (this.questionRowsArray.length > 1) {
      this.questionRowsArray.removeAt(index);
    }
  }

  /**
   * method triggered when form is submitted
   */
  public onSubmit(): void {
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

  public valueOptions(i: number): IOption[] {
    return [
      {value: 0, text: 'NO'},
      {value: Math.pow(2, i), text: 'YES'}
    ];
  }

  public onChangeVal(): void {
    const v = this.form.value.answerRows[0].value +
      this.form.value.answerRows[1].value +
      this.form.value.answerRows[2].value +
      this.form.value.answerRows[3].value;

    this.form.controls.value.setValue(v);
  }

  /**
   * init Answer formGroup - FIXME correct
   */
  private initAnswerRow(i: number, correct: boolean = false): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required],
      language: [+Extension.NONE, Validators.required],
      value: [(i === 0) ? Math.pow(2, i) : 0, Validators.required],
      correct: [correct],
    });
  }

  /**
   * Contains Reactive Form logic
   */
  private buildForm(): void {
    const rows = [
      this.initAnswerRow(0, true),
      this.initAnswerRow(1),
      this.initAnswerRow(2),
      this.initAnswerRow(3)
    ];
    this.form = this.formBuilder.group({
      id: [null],
      category: [[+PhpCategory.PHP_BASICS], Validators.required],
      difficulty: [+PhpQuestionDifficulty.EASY, Validators.required],
      type: [+PhpAnswerType.RADIO, Validators.required],
      value: [1, Validators.required],
      questionRows: this.formBuilder.array([]),
      answerRows: this.formBuilder.array(rows)
    });

    // set questionRowsArray to this field
    this.questionRowsArray = this.form.get('questionRows') as FormArray;
  }
}

