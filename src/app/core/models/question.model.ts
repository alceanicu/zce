import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { IAnswerRow, IQuestion, IQuestionRow } from '../interfaces';

export class Question implements IQuestion {
  id?: number;
  type: string;
  category: Array<number>;
  difficulty: string;
  questionRows: Array<IQuestionRow> = [{} as IQuestionRow];
  answerRows: Array<IAnswerRow> = [{} as IAnswerRow, {} as IAnswerRow, {} as IAnswerRow, {} as IAnswerRow];
  correctAnswerSum: 0;

  _userAnswer?: number = 0;
  _isValidated?: boolean = false;
  _version?: string;

  constructor(values?: IQuestion) {
    if (values) {
      Object.assign(this, values);
    }

    // initialize - FIXME
    this.answerRows.forEach((answerRow: IAnswerRow) => {
      answerRow._isCheckedByUser = false;
    });

    this._userAnswer = 0;
  }

  public onChange(event: MatRadioChange | MatCheckboxChange, i: number, elValue: number): void {
    console.log(i, event);
    if (event instanceof MatRadioChange) {
      [0, 1, 2, 3].forEach((value, index, array) => {
        this.answerRows[index]._isCheckedByUser = false;
      });
      this.answerRows[i]._isCheckedByUser = event.source.checked;
    }

    if (event instanceof MatCheckboxChange) {
      if (event.checked) {
        this._userAnswer += elValue;
      } else {
        this._userAnswer -= elValue;
      }
    }
  }

  public validate(isValidated: boolean = false): boolean {
    this._isValidated = isValidated;
    return this.correctAnswerSum === this._userAnswer;
  }

  public isValidRowAnswer(i: number): boolean {
    console.log('isValidRowAnswer');
    // tslint:disable-next-line:no-bitwise
    // const isCorrect = Boolean(this.correctAnswerSum & this.answerRows[i].value);
    // return this.answerRows[i]._isCheckedByUser ? isCorrect : !isCorrect;
    return this.answerRows[i]._isCheckedByUser === this.answerRows[i].isCorrect;
  }

  public randomizeAnswers(): void {
    this.answerRows.sort(() => Math.random() - 0.5);
  }
}
