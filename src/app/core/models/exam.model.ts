import { Helper } from '../utils';
import { IExam, IExamQuestion } from '../interfaces';
import { environment } from '@env/environment';

export class Exam implements IExam {
  public startAt: number;
  public endAt?: number;
  public questionsArray: Array<number> = [];
  public questions: { [key: string]: IExamQuestion } = {};
  public score: number = 0;
  public isFinished: boolean = false;

  public index: number = 0;
  public markForReviewArray: Array<number> = [];
  public isCurrentQuestionLoaded: boolean = false;

  constructor(values?: Exam) {
    if (values) {
      Object.assign(this, values);
    }
    this.startAt = new Date().getTime();
    this.questions = {};
    this.score = 0;
    this.isFinished = false;
    this.questionsArray = Helper.generateArrayWithRandomUniqueElement(environment.configPHP.examSize, environment.configPHP.max);
  }

  get currentQuestion(): IExamQuestion | undefined {
    return this.questions[this.index];
  }

  public finish(): void {
    // update score
    for (const key in this.questions) {
      if (this.questions.hasOwnProperty(key)) {
        if (this.questions[key].question.validate(false)) {
          this.score++;
        }
      }
    }

    this.endAt = new Date().getTime();
    this.isFinished = true;
  }

  public setQuestion(index: number, question: IExamQuestion): void {
    this.index = index;
    this.questions[index] = question;
  }

  public markForReview(): void {
    const idx = this.markForReviewArray.indexOf(this.index);
    if (idx === -1) {
      this.markForReviewArray.push(this.index);
    } else {
      this.markForReviewArray.splice(idx, 1);
    }
  }
}
