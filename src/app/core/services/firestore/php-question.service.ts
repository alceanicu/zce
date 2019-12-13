import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { environment } from '@env/environment';
import { IConfig, IQuestion } from '@app/core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PhpQuestionService {
  public quizCollection: AngularFirestoreCollection<IQuestion>;
  public configCollection: AngularFirestoreCollection<IConfig>;
  private quizDoc: AngularFirestoreDocument<IQuestion>;
  private phpConfigDoc: AngularFirestoreDocument<IConfig>;

  constructor(
    private db: AngularFirestore
  ) {
    this.quizCollection = this.db.collection<IQuestion>(environment.configPHP.phpPath);
    this.configCollection = this.db.collection<IConfig>(environment.configPHP.configPath);
  }

  getQuestion(id: number): Observable<firestore.DocumentSnapshot> {
    this.quizDoc = this.db.doc<IQuestion>(`${environment.configPHP.phpPath}/${id}`);
    return this.quizDoc.get();
  }

  /**
   * Used by backend
   */
  getPhpConfig(): Observable<firestore.DocumentSnapshot> {
    this.phpConfigDoc = this.db.doc<IConfig>(`${environment.configPHP.configPath}/php`);
    return this.phpConfigDoc.get();
  }

  /**
   * Used by backend
   */
  addQuestion(question: IQuestion): Observable<number | any> {
    return new Observable((observer) => {
      const configDocRef = this.db.firestore.collection(environment.configPHP.configPath).doc('php');
      this.db.firestore
        .runTransaction(
          transaction => transaction.get(configDocRef)
            .then(
              configDoc => {
                const counter = (configDoc.data().counter || 0) + 1;
                transaction.update(configDocRef, {counter});
                return counter;
              }
            )
        )
        .then((counter: number) => {
          question.id = counter;
          this.quizCollection
            .doc(String(question.id))
            .set(question)
            .then(() => observer.next(question.id))
            .catch(error => observer.error(error));
        })
        .catch(error => observer.error(error));
    });
  }

  /**
   * Used by backend
   */
  updateQuestion(question: IQuestion): Observable<number | any> {
    return new Observable((observer) => {
      this.quizDoc = this.db.doc<IQuestion>(`${environment.configPHP.phpPath}/${question.id}`);
      this.quizDoc
        .update(question)
        .then(() => observer.next(question.id))
        .catch(error => observer.error(error));
    });
  }

  /**
   * Used by backend
   */
  deleteQuestion(id: number): Observable<number | any> {
    return new Observable((observer) => {
      this.quizDoc = this.db.doc<IQuestion>(`${environment.configPHP.phpPath}/${id}`);
      this.quizDoc
        .delete()
        .then(() => observer.next(id))
        .catch(error => observer.error(error));
    });
  }
}
