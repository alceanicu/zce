import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Helper } from '../../utils';
import { PhpQuestionService } from '../firestore/php-question.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { IndexedDbQuizService } from '../indexeddb/indexed-db-quiz.service';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { IConfig, IQuestion } from '../../interfaces';
import { Question } from '../../models';


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

  public getQuestion(questionNumber: number = 1): Observable<any> {
    const $this = this;
    this.internalCounter = 0;
    this.questionNumber = questionNumber;

    return new Observable((observer) => {
      for (let i = 0; i < questionNumber; i++) {
        $this.getAnRandomQuestion(observer);
      }
    });
  }

  private getAnRandomQuestion(observer) {
    this.localStorageService.getAppConfig().subscribe((config) => {
      const randomId = this.generateRandomIdWithoutRepeatInLastN(config);
      this.getQuestionById(randomId, observer);
    });
  }

  public getOneQuestionById(id: number): Observable<any> {
    const $this = this;
    return new Observable((observer) => {
      $this.getQuestionById(id, observer);
    });
  }

  private getQuestionById(id, observer) {
    const $this = this;
    this.indexedDbQuizService
      .getQuestionById(id)
      .then(async (question) => {
        if (question) {
          $this.setQuestion(new Question(question), observer);
        } else {
          $this.getQuestionFromFirebase(id, observer);
        }
      })
      .catch(e => {
        console.error(e.stack || e);
        $this.getQuestionFromFirebase(id, observer);
      });
  }

  private generateRandomIdWithoutRepeatInLastN(config: IConfig, internalCounter: number = 0): number {
    const randomId = Helper.randomNumberFromInterval(config.counter);
    let phpLastNIds = this.sessionStorageService.getItem('phpLastNIds') || [];
    if (internalCounter === 100) {
      return randomId;
    }
    if (phpLastNIds.indexOf(String(randomId)) === -1) {
      phpLastNIds.unshift(String(randomId));
      phpLastNIds = phpLastNIds.filter((value, key) => key < 10);
      this.sessionStorageService.setItem('phpLastNIds', phpLastNIds);
      return randomId;
    } else {
      internalCounter++;
      return this.generateRandomIdWithoutRepeatInLastN(config, internalCounter);
    }
  }

  private getQuestionFromFirebase(id, observer) {
    const $this = this;
    this.firestorePhpQuestionService.getQuestion(String(id)).subscribe(
      DocumentSnapshot => {
        const question = new Question(DocumentSnapshot.data() as IQuestion);

        if (question) {
          $this.saveToIndexedDb(question);
          $this.setQuestion(question, observer);
        } else {
          throw new Error('bad robot');
        }
      },
      (error) => {
        console.error(error);
      },
      () => {
        console.log('Question from FIREBASE complete');
      }
    );
  }

  private saveToIndexedDb(question: IQuestion) {
    this.indexedDbQuizService
      .addQuestion(question)
      .then(async (key) => {
        console.log(`Question is now saved in IndexedDB [id=${key}]`);
      })
      .catch(e => {
        console.log(`Question can not be saved in IndexedDB`);
        console.error(e.stack || e);
      });
  }

  private setQuestion(question: IQuestion, observer) {
    this.internalCounter++;
    question.answerRows.sort(() => Math.random() - 0.5);
    observer.next(question);
    if (this.internalCounter === this.questionNumber) {
      observer.complete();
    }
  }
}
