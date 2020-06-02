import { Injectable } from '@angular/core';

import { Observable, Subscriber } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Helper } from '@app/core/utils';
import { PhpQuestionService } from '@app/core/services/firestore/php-question.service';
import { LocalStorageService } from '@app/core/services/local-storage/local-storage.service';
import { IndexedDbQuizService } from '@app/core/services/indexeddb/indexed-db-quiz.service';
import { SessionStorageService } from '@app/core/services/session-storage/session-storage.service';
import { Logger } from '@app/core/services/logger/logger.service';
import { IQuestion } from '@app/core/interfaces';
import { Question } from '@app/core/models';

const log = new Logger('QuestionService');

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private internalCounter: number = 0;
  private questionNumber: number = 1;

  constructor(
    private firestorePhpQuestionService: PhpQuestionService,
    private indexedDbQuizService: IndexedDbQuizService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) {
  }

  public getQuestion(questionNumber: number = 1): Observable<Question> {
    this.setInternalParams(questionNumber);

    return new Observable((subscriber: Subscriber<Question>) => {
      for (let i = 0; i < questionNumber; i++) {
        this.getQuestionById(this.generateRandomIdWithoutRepeatInLastN(), subscriber);
      }
    });
  }

  public getOneQuestionById(id: number): Observable<Question> {
    this.setInternalParams(1);

    return new Observable((subscriber: Subscriber<Question>) => {
      this.getQuestionById(id, subscriber);
    });
  }

  private setInternalParams(questionNumber: number = 1, internalCounter: number = 0): void {
    this.questionNumber = questionNumber;
    this.internalCounter = internalCounter;
  }

  private getQuestionById(id: number, subscriber: Subscriber<Question>) {
    this.indexedDbQuizService
      .getQuestionById(id)
      .then(async (question) => {
        if (question) {
          log.info(`get question with [ID=${question.id}] from indexedDb 👌`);
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

  private generateRandomIdWithoutRepeatInLastN(internalCounter: number = 0, key: string = 'phpLastNIds'): number {
    const randomId = Helper.randomNumberFromInterval(environment.configPHP.max);
    let phpLastNIds = this.sessionStorageService.getItem(key) || [];
    if (internalCounter === 100) {
      return randomId;
    }
    const randomIdStr = String(randomId);
    if (phpLastNIds.indexOf(randomIdStr) === -1) {
      phpLastNIds.unshift(randomIdStr);
      phpLastNIds = phpLastNIds.filter((value: any, index: number) => index < environment.configPHP.doNotRepeatInlasts);
      this.sessionStorageService.setItem(key, phpLastNIds);
      return randomId;
    } else {
      internalCounter++;
      return this.generateRandomIdWithoutRepeatInLastN(internalCounter);
    }
  }

  private getQuestionFromFirebase(id: number, subscriber: Subscriber<IQuestion>): void {
    this.firestorePhpQuestionService
      .getQuestion(id)
      .pipe(take(1))
      .subscribe(
        (documentSnapshot ) => {
          const question = new Question(documentSnapshot.data() as IQuestion);
          if (question) {
            this.saveToIndexedDb(question);
            question.answerRows.forEach((value, i) => {
              question.answerRows[i]._isCheckedByUser = false;
            });
            this.setQuestion(question, subscriber);
          } else {
            log.error('Bad robot!');
            throw new Error('Bad robot!');
          }
        },
        error => log.error(error),
        () => log.info(`get question with [ID=${id}] from FIREBASE 👌`)
      );
  }

  private saveToIndexedDb(question: IQuestion): void {
    this.indexedDbQuizService
      .addQuestion(question)
      .then(key => log.info(`save question to IndexedDB [ID=${key}] 👍`))
      .catch(error => {
        log.error(`Question can not be saved in IndexedDB`);
        log.error(error);
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
