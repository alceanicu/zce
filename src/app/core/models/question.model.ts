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

    this.answerRows.forEach((answerRow: IAnswerRow) => {
      answerRow.userAnswer = false;
    });
  }

  public validate(finalAnswer: boolean = false): boolean {
    this.finalAnswer = finalAnswer;
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
