import {IQuestion} from './i-question.interface';

export interface IExamQuestion {
  id: number;
  question?: IQuestion;
  markForReview: boolean;
  correct: boolean;
}
