import { IAnswerRow, IQuestion, IQuestionRow } from '../interfaces';
import { environment } from '@env/environment';

export class Question implements IQuestion {
  id?: number;
  category: Array<number>;
  difficulty: number;
  type: number;
  finalAnswer: boolean = false;
  questionRows: Array<IQuestionRow> = [<IQuestionRow> {}];
  answerRows: Array<IAnswerRow> = [<IAnswerRow> {}, <IAnswerRow> {}, <IAnswerRow> {}, <IAnswerRow> {}];
  value: number;

  constructor(values?: IQuestion) {
    if (values) {
      Object.assign(this, values);
    }

    this.answerRows.forEach((answerRow: IAnswerRow) => {
      answerRow.userAnswer = false;
    });
  }

  answerChange(event: any, i: number) {
    console.log('answerChange');
    this.answerRows[i].userAnswer = event.currentTarget.checked;
  }

  isValidRowAnswer(i: number): boolean { // fixme
    if (this.answerRows[i].userAnswer) {
      // tslint:disable-next-line:no-bitwise
      return Boolean(this.value & this.answerRows[i].value);
    } else {
      return this.answerRows[i].value === 0;
    }
  }

  public validate(finalAnswer: boolean = false): boolean { // fixme
    this.finalAnswer = finalAnswer;
    // let calcValue = 0;
    // this.answerRows.forEach((answerRow: IAnswerRow) => {
    //   if (answerRow.userAnswer) {
    //     calcValue += answerRow.value;
    //   }
    // });
    //
    // return this.value === calcValue;
    let isCorrect = true;
    this.answerRows.forEach((obj: IAnswerRow) => {
      isCorrect = isCorrect && (obj.correct === obj.userAnswer);
    });

    return isCorrect;
  }

  public randomizeAnswers() {
    this.answerRows.sort(() => Math.random() - 0.5);
  }
}
