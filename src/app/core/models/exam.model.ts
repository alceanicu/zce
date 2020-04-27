import { environment } from '@env/environment';
import { Helper } from '@app/core/utils';
import { IExam } from '@app/core/interfaces';
import { Question } from '@app/core';

export class Exam implements IExam {
  public startAt: number;
  public endAt?: number;
  public questionsArray: Array<number> = [];
  public questions: { [key: string]: Question | null } = {};
  public score: number = 0;
  public isFinished: boolean = false;

  public index: number = 0;
  public markForReviewArray: Array<number> = [];

  constructor(values?: IExam) {
    this.startAt = new Date().getTime();
    this.questionsArray = Helper.generateArrayWithRandomUniqueElement(environment.configPHP.examSize, environment.configPHP.max);
    this.questionsArray.forEach((value, key) => {
      this.questions[key] = null;
    });

    if (values) {
      Object.assign(this, values);
    }
  }

  public finish(): void {
    // update score
    for (const key in this.questions) {
      if (this.questions.hasOwnProperty(key) && (this.questions[key] !== null)) {
        if (this.questions[key].validate(false)) {
          this.score++;
        }
      }
    }

    this.endAt = new Date().getTime();
    this.isFinished = true;
  }

  public setQuestion(index: number, question: Question | null): void {
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
