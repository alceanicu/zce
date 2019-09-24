import { Injectable } from '@angular/core';

import { Observable, Subscriber } from 'rxjs';
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

  public getQuestion(questionNumber: number = 1): Observable<Question> {
    this.internalCounter = 0;
    this.questionNumber = questionNumber;

    return new Observable((subscriber: Subscriber<Question>) => {
      for (let i = 0; i < questionNumber; i++) {
        this.getAnRandomQuestion(subscriber);
      }
    });
  }

  private getAnRandomQuestion(subscriber: Subscriber<Question>) {
    const $this = this;
    this.localStorageService.getAppConfig().subscribe(
      config => $this.getQuestionById($this.generateRandomIdWithoutRepeatInLastN(config), subscriber),
      error => console.error(error)
    );
  }

  public getOneQuestionById(id: number): Observable<Question> {
    this.internalCounter = 0;
    this.questionNumber = 1;
    return new Observable((subscriber: Subscriber<Question>) => {
      this.getQuestionById(id, subscriber);
    });
  }

  private getQuestionById(id: number, subscriber: Subscriber<Question>) {
    this.indexedDbQuizService
      .getQuestionById(id)
      .then(async (question) => {
        if (question) {
          this.setQuestion(new Question(question), subscriber);
        } else {
          this.getQuestionFromFirebase(id, subscriber);
        }
      })
      .catch(e => {
        console.error(e.stack || e);
        this.getQuestionFromFirebase(id, subscriber);
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

  private getQuestionFromFirebase(id: number, subscriber: Subscriber<IQuestion>) {
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
      error => console.error(error),
      () => console.log('Question from FIREBASE complete')
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

  private setQuestion(question: Question, subscriber: Subscriber<IQuestion>) {
    this.internalCounter++;
    question.randomizeAnswers();
    subscriber.next(question);
    if (this.internalCounter === this.questionNumber) {
      subscriber.complete();
    }
  }
}
