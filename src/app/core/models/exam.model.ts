import {IExam} from './i-exam.interface';
import {IExamQuestion} from './i-exam-question.interface';
import {Helper} from '../utils';

export class Exam implements IExam {
  public startAt: number;
  public endAt?: number;
  public questionsArray?: Array<number>;
  public tempQuestionsArray?: Array<IExamQuestion>;
  public score?: number;
  public finished?: boolean;

  private examQuestionNumber = 70;

  constructor(values?: Exam) {
    if (values) {
      Object.assign(this, values);
    }
    this.questionsArray = [];
    this.startAt = new Date().getTime();
    this.finished = false;
    this.questionsArray = this._initQuestionsArray();
  }

  public finishExam() {
    this.endAt = new Date().getTime(); // FIXME
    this._setScore();
    this.finished = true;
  }

  private _setScore() {
    // TODO
    this.tempQuestionsArray = [];
  }

  private _initQuestionsArray() {
    if (this.questionsArray.length === this.examQuestionNumber) {
      return this.questionsArray;
    } else {
      const randomId = Helper.randomNumberFromInterval(806); // FIXME
      if (this.questionsArray.indexOf(randomId) === -1) {
        this.questionsArray.push(randomId);
        if (this.questionsArray.length === this.examQuestionNumber) {
          return this.questionsArray;
        } else {
          return this._initQuestionsArray();
        }
      } else {
        return this._initQuestionsArray();
      }
    }
  }
}
