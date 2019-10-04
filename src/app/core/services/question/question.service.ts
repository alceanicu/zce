import { Injectable } from '@angular/core';

import { Observable, Subscriber } from 'rxjs';
import { Helper } from '@app/core/utils';
import { PhpQuestionService } from '@app/core/services/firestore/php-question.service';
import { LocalStorageService } from '@app/core/services/local-storage/local-storage.service';
import { IndexedDbQuizService } from '@app/core/services/indexeddb/indexed-db-quiz.service';
import { SessionStorageService } from '@app/core/services/session-storage/session-storage.service';
import { Logger } from '@app/core/services/logger/logger.service';
import { IConfig, IQuestion } from '@app/core/interfaces';
import { Question } from '@app/core/models';

const log = new Logger('QuestionService');

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private internalCounter: number;
  private questionNumber: number;

  constructor(
    private firestorePhpQuestionService: PhpQuestionService,
    private indexedDbQuizService: IndexedDbQuizService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) {
  }

  public getQuestion(questionNumber: number = 1): Observable<Question> {
    this.internalCounter = 0;
    this.questionNumber = questionNumber;

    return new Observable((subscriber: Subscriber<Question>) => {
      for (let i = 0; i < questionNumber; i++) {
        this.getAnRandomQuestion(subscriber);
      }
    });
  }

  public getOneQuestionById(id: number): Observable<Question> {
    this.internalCounter = 0;
    this.questionNumber = 1;
    return new Observable((subscriber: Subscriber<Question>) => {
      this.getQuestionById(id, subscriber);
    });
  }

  private getAnRandomQuestion(subscriber: Subscriber<Question>) {
    this.localStorageService.getAppConfig().subscribe(
      config => this.getQuestionById(this.generateRandomIdWithoutRepeatInLastN(config), subscriber),
      error => log.error(error)
    );
  }

  private getQuestionById(id: number, subscriber: Subscriber<Question>) {
    this.indexedDbQuizService
      .getQuestionById(id)
      .then(async (question) => {
        if (question) {
          await this.setQuestion(new Question(question), subscriber);
        } else {
          this.getQuestionFromFirebase(id, subscriber);
        }
      })
      .catch(e => {
        log.error(e);
        this.getQuestionFromFirebase(id, subscriber);
      });
  }

  private generateRandomIdWithoutRepeatInLastN(config: IConfig, internalCounter: number = 0): number {
    const randomId = Helper.randomNumberFromInterval(config.counter);
    let phpLastNIds = this.sessionStorageService.getItem('phpLastNIds') || [];
    if (internalCounter === 100) {
      return randomId;
    }
    const randomIdStr = String(randomId);
    if (phpLastNIds.indexOf(randomIdStr) === -1) {
      phpLastNIds.unshift(randomIdStr);
      phpLastNIds = phpLastNIds.filter((value: any, key: number) => key < 10);
      this.sessionStorageService.setItem('phpLastNIds', phpLastNIds);
      return randomId;
    } else {
      internalCounter++;
      return this.generateRandomIdWithoutRepeatInLastN(config, internalCounter);
    }
  }

  private getQuestionFromFirebase(id: number, subscriber: Subscriber<IQuestion>): void {
    this.firestorePhpQuestionService.getQuestion(id).subscribe(
      (DocumentSnapshot) => {
        const question = new Question(DocumentSnapshot.data() as IQuestion);
        if (question) {
          this.saveToIndexedDb(question);
          this.setQuestion(question, subscriber);
        } else {
          throw new Error('bad robot');
        }
      },
      error => log.error(error),
      () => log.info('Question from FIREBASE complete')
    );
  }

  private saveToIndexedDb(question: IQuestion): void {
    this.indexedDbQuizService
      .addQuestion(question)
      .then(key => {
        log.info(`Question is now saved in IndexedDB [id=${key}]`);
      })
      .catch(e => {
        log.error(`Question can not be saved in IndexedDB`);
        log.error(e);
      });
  }

  private setQuestion(question: Question, subscriber: Subscriber<IQuestion>): void {
    this.internalCounter++;
    question.randomizeAnswers();
    subscriber.next(question);
    if (this.internalCounter === this.questionNumber) {
      subscriber.complete();
    }
  }
}
