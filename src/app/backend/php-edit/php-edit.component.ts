import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PhpQuestionService } from '@app/core/services/firestore/php-question.service';
import { IOption, IQuestion } from '@app/core/interfaces';
import { environment } from '@env/environment';
import { Helper } from '@app/core/utils';


@Component({
  selector: 'app-php-edit',
  templateUrl: './php-edit.component.html',
  styleUrls: ['./php-edit.component.scss']
})
export class PhpEditComponent implements OnInit {
  // public idDb: number;
  public form: FormGroup;
  public questionRowsArray: FormArray;
  public type: string;
  public value: number;

  constructor(
    public firestorePhpQuestionService: PhpQuestionService,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private apiService: ApiService,
  ) {
  }

  ngOnInit() {
    this.buildForm();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.type = 'EDIT';
      this.firestorePhpQuestionService.getQuestion(id).subscribe(
        DocumentSnapshot => {
          const question = DocumentSnapshot.data() as IQuestion;
          const qLength = (question.questionRows.length || 0);
          for (let i = 0; i < qLength; i++) {
            this.addQuestionRow();
          }
          // question.id_db = '';
          this.form.setValue(question);
        },
        (err) => console.error(`Update on question with ID=${id} ${err}`),
        () => console.log('Update complete')
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
    this.form = this.formBuilder.group({
      id: [null],
      // id_db: [null],
      category: [1, Validators.required],
      difficulty: [2, Validators.required],
      type: [1, Validators.required],
      questionRows: this.formBuilder.array([]),
      answerRows: this.formBuilder.array([this.initAnswerRow(true), this.initAnswerRow(), this.initAnswerRow(), this.initAnswerRow()])
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
      value: [0, Validators.required]
    });
  }

  /**
   * init Answer formGroup
   */
  initAnswerRow(correct: boolean = false): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required],
      language: ['none', Validators.required],
      correct: [correct, Validators.required],
      value: [0, Validators.required]
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
    console.log('submit ' + this.type);
    const question = this.form.value as IQuestion;
    if (this.type === 'EDIT') {
      this.firestorePhpQuestionService.updateQuestion(question).subscribe(
        id => {
          this.router.navigate(['php-list']);
        },
        (err) => console.error('Update question with error: ' + err)
      );
    } else {
      this.firestorePhpQuestionService.addQuestion(question).subscribe((id) => {
        this.router.navigate(['php-list']);
      }, (err) => console.error('Created question with error: ' + err));
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

  get correctOptions(): Array<any> {
    return environment.configPHP.correctOptions;
  }

  // getQuizFromDB() {
  //   const n = this.form.value.id_db;
  //   if (!isNaN(parseFloat(n)) && isFinite(n)) {
  //     console.log(`${n} ok`);
  //   } else {
  //     console.log(`${n} nu e numar`);
  //   }
  // }

  // getQuizFromDB() {
  //   const $this = this;
  //   const id = this.idDb;
  //   if (isFinite(id)) { // && !isNaN(parseFloat(id))
  //     console.log(`${id} ok`);
  //     $this.removeAllQuestionRow();
  //
  //     this.apiService.getQuestionById(id).subscribe(question => {
  //       const qLength = (question.questionRows.length || 0);
  //       for (let i = 0; i < qLength; i++) {
  //         $this.addQuestionRow();
  //       }
  //       console.log(question);
  //       $this.form.setValue(question);
  //     }, error => {
  //       console.log(error);
  //     }, () => {
  //       console.log('ok');
  //     });
  //   } else {
  //     console.log(`${id} nu e numar`);
  //   }
  // }
}

