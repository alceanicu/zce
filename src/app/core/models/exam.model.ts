import { Helper } from '../utils';
import { IExam } from '../interfaces';
import { environment } from '../../../environments/environment';


export class Exam implements IExam {
  public startAt: number;
  public endAt?: number;
  public questions?: any;
  public questionsArray?: Array<number> = [];
  public score?: number;
  public finished?: boolean;

  private examQuestionNumber = 70;
  private max: number;

  constructor(values?: Exam) {
    if (values) {
      Object.assign(this, values);
    }
    this.startAt = new Date().getTime();
    this.questions = {};
    this.score = 0;
    this.finished = false;
    this.max = environment.configPHP.max;
    this.questionsArray = this.initQuestionsArray();
  }

  public setMax(max: number) {
    this.max = max;
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

  /**
   * Set an array with 70 unique random numbers
   */
  private initQuestionsArray() {
    if (this.questionsArray.length === this.examQuestionNumber) {
      return this.questionsArray;
    } else {
      const randomId = Helper.randomNumberFromInterval(this.max);
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
