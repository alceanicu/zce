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

  _isValidated?: boolean = false;
  _version?: string;

  constructor(values?: IQuestion) {
    if (values) {
      Object.assign(this, values);
    }
    this.init();
  }

  public onChange(event: MatRadioChange | MatCheckboxChange, i: number): void {
    if (event instanceof MatRadioChange) {
      [0, 1, 2, 3].forEach((value, index, array) => {
        this.answerRows[index]._isCheckedByUser = false;
      });
      this.answerRows[i]._isCheckedByUser = event.source.checked;
    }

    if (event instanceof MatCheckboxChange) {
      //
    }
  }

  public validate(isValidated: boolean = false): boolean {
    this._isValidated = isValidated;
    let isCorrect = true;
    [0, 1, 2, 3].forEach((value, index, array) => {
      isCorrect = isCorrect && this.isValidRowAnswer(index);
    });
    return isCorrect;
  }

  public isValidRowAnswer(i: number): boolean {
    return this.answerRows[i]._isCheckedByUser === this.answerRows[i].isCorrect;
  }

  public randomizeAnswers(): void {
    this.answerRows.sort(() => Math.random() - 0.5);
  }

  /**
   * initialize - FIXME
   */
  private init(): void {
    this.answerRows.forEach((answerRow: IAnswerRow) => {
      answerRow._isCheckedByUser = false;
    });
  }
}
