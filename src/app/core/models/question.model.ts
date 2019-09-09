import { IAnswerRow, IQuestion, IQuestionRow } from '../interfaces';


export class Question implements IQuestion {
  id?: number;
  category: number;
  difficulty: number;
  type: number;
  finalAnswer: boolean = false;
  questionRows: Array<IQuestionRow> = [<IQuestionRow> {}];
  answerRows: Array<IAnswerRow> = [<IAnswerRow> {}, <IAnswerRow> {}, <IAnswerRow> {}, <IAnswerRow> {}];

  constructor(values?: IQuestion) {
    if (values) {
      Object.assign(this, values);
    }

    this.answerRows.forEach((answerRow, key) => {
      answerRow.userAnswer = false;
    });
  }
}
