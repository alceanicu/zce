import {IAnswerRow, IQuestion, IQuestionRow} from '.';

export class Question implements IQuestion {
  id?: number;
  category: number;
  difficulty: number;
  type: number;
  finalAnswer: boolean;
  questionRows: Array<IQuestionRow>;
  answerRows: Array<IAnswerRow>;

  constructor(values?: Question) {
    if (values) {
      Object.assign(this, values);
    }
  }
}
