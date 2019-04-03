import {IExamQuestion} from './i-exam-question.interface';

export interface IExam {
  startAt: number;
  endAt?: number;
  questionsArray?: Array<number>;
  tempQuestionsArray?: Array<IExamQuestion>;
  score?: number;
  finished?: boolean;
}
