import { Question } from '@app/core';

export interface IExam {
  startAt: number;
  endAt?: number;
  questionsArray?: Array<number>;
  questions?: {
    [key: number]: Question | null
  };
  score?: number;
  isFinished?: boolean;
}
