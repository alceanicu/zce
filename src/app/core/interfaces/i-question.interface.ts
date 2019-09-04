import {IAnswerRow, IQuestionRow} from '.';

export interface IQuestion {
  id?: number;
  category: number;
  difficulty: number;
  type: number;
  finalAnswer: boolean;
  questionRows: Array<IQuestionRow>;
  answerRows: Array<IAnswerRow>;
}
