import {IExam} from './i-exam.interface';
import {Helper} from '../utils';

export class Exam implements IExam {
  public startAt: number;
  public endAt?: number;
  public questions?: any;
  public questionsArray?: Array<number> = [];
  public score?: number;
  public finished?: boolean;

  private examQuestionNumber = 70;

  constructor(values?: Exam) {
    if (values) {
      Object.assign(this, values);
    }
    this.startAt = new Date().getTime();
    this.questions = {};
    this.questionsArray = this.initQuestionsArray();
    this.score = 0;
    this.finished = false;
  }

  public finishExam() {
    this.endAt = new Date().getTime(); // FIXME
    this.finished = true;
  }

  private initQuestionsArray() {
    if (this.questionsArray.length === this.examQuestionNumber) {
      return this.questionsArray;
    } else {
      const randomId = Helper.randomNumberFromInterval(806); // FIXME
      if (this.questionsArray.indexOf(randomId) === -1) {
        this.questionsArray.push(randomId);
        if (this.questionsArray.length === this.examQuestionNumber) {
          return this.questionsArray;
        } else {
          return this.initQuestionsArray();
        }
      } else {
        return this.initQuestionsArray();
      }
    }
  }
}
