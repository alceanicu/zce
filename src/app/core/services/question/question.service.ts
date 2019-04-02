import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Helper} from '../../utils';
import {IConfig, IQuestion} from '../../models';
import {PhpQuestionService} from '../firestore/php-question.service';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {IndexedDbQuizService} from '../indexeddb/indexed-db-quiz.service';
import {SessionStorageService} from '../session-storage/session-storage.service';

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
    private sessionStorageService: SessionStorageService,
  ) {
  }

  public getQuestion(questionNumber: number = 1): Observable<any> {
    const $this = this;
    this.internalCounter = 0;
    this.questionNumber = questionNumber;

    return Observable.create((observer) => {
      for (let i = 0; i < questionNumber; i++) {
        $this.getAnRandomQuestion(observer);
      }
    });
  }

  private getAnRandomQuestion(observer) {
    const $this = this;
    this.localStorageService.getAppConfig().subscribe((config) => {
      const randomId = this.generateRandomIdWithoutRepeatInLastN(config);
      console.log(`Generate an random id for question ... [randomId =${randomId}]`);

      this.indexedDbQuizService
        .getQuestionById(randomId)
        .then(async (question) => {
          if (!question) {
            console.log(`Question with id=${randomId} does not EXIST in IndexedDB`);
            $this.getQuestionFromFirebase(randomId, observer);
          } else {
            console.log(`Question with id=${randomId} EXIST in IndexedDB - WE GET IT FROM IndexedDB`);
            $this.setQuestion(question, observer);
          }
        })
        .catch(e => {
          console.log((e.stack || e));
          $this.getQuestionFromFirebase(randomId, observer);
        });
    });
  }

  private generateRandomIdWithoutRepeatInLastN(config: IConfig, internalCounter: number = 0): number {
    const randomId = Helper.randomNumberFromInterval(Number(config.counter));
    let phpLastNIds = this.sessionStorageService.getItem('phpLastNIds') || [];
    if (internalCounter === 100) {
      console.log('STOP AFTER 100 TRY ...');
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

  private getQuestionFromFirebase(randomId, observer) {
    console.log('We try to get question from FIREBASE');
    const $this = this;
    this.firestorePhpQuestionService.getQuestion(String(randomId)).subscribe(
      DocumentSnapshot => {
        const question = DocumentSnapshot.data() as IQuestion;
        if (question) {
          $this.saveToIndexedDb(question);
          $this.setQuestion(question, observer);
        } else {
          throw new Error('Something bad happened');
        }
      },
      (error) => {
        console.log('Can not get question from FIREBASE');
        console.error(error);
      },
      () => {
        console.log('Random Question complete');
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
        console.log((e.stack || e));
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

