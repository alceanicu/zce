import { Question } from '@app/core';

export interface IExamQuestion {
  id: number;
  question?: Question;
  markForReview: boolean;
  correct: boolean;
}
