import { IQuestion } from '.';


export interface IExamQuestion {
  id: number;
  question?: IQuestion;
  markForReview: boolean;
  correct: boolean;
}
