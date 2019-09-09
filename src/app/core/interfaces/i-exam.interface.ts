import { IExamQuestion } from '.';


export interface IExam {
  startAt: number;
  endAt?: number;
  questionsArray?: Array<number>;
  questions?: {
    [key: number]: IExamQuestion
  };
  score?: number;
  finished?: boolean;
}
