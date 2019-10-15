import { Helper } from '../utils';
import { IExam, IExamQuestion } from '../interfaces';
import { environment } from '@env/environment';


export class Exam implements IExam {
  public startAt: number;
  public endAt?: number;
  public questions: { [key: string]: IExamQuestion } = {};
  public questionsArray: Array<number> = [];
  public score: number = 0;
  public finished: boolean = false;

  constructor(values?: Exam) {
    if (values) {
      Object.assign(this, values);
    }
    this.startAt = new Date().getTime();
    this.questions = {};
    this.score = 0;
    this.finished = false;
    this.questionsArray = Helper.generateArrayWithRandomUniqueElement(70, environment.configPHP.max);
  }

  public finish() {
    this.endAt = new Date().getTime();
    this.finished = true;

    // update score
    for (const key in this.questions) {
      if (this.questions.hasOwnProperty(key)) {
        if (this.questions[key].correct === true) {
          this.score++;
        }
      }
    }
  }

  public setQuestion(key: number, question: IExamQuestion): void {
    this.questions[key] = question;
  }
}
