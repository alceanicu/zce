import { MatRadioChange } from '@angular/material/radio';

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
  _userAnswer?: number;

  constructor(values?: IQuestion) {
    if (values) {
      Object.assign(this, values);
    }
    this.init();
  }

  public onChange(event: MatRadioChange, i: number): void {
    [0, 1, 2, 3].forEach((value, index, array) => {
      this.answerRows[index]._isCheckedByUser = false;
    });
    this.answerRows[i]._isCheckedByUser = event.source.checked;
    this._userAnswer = i;
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
   * initialize
   */
  private init(): void {
    this.answerRows.forEach((answerRow: IAnswerRow) => {
      answerRow._isCheckedByUser = false;
    });
  }
}
