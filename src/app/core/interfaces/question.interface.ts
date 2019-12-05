import { IAnswerRow, IQuestionRow } from '.';

export interface IQuestion {
  id?: number;
  category: Array<number>;
  difficulty: number;
  type: number;
  finalAnswer: boolean; // fixme - deprecated @ 3.0.0
  questionRows: Array<IQuestionRow>;
  answerRows: Array<IAnswerRow>;
  value?: number;

  validate(finalAnswer: boolean): boolean;
}
