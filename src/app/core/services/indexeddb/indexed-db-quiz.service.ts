import { Injectable } from '@angular/core';

import Dexie from 'dexie';

import { environment } from '@env/environment';
import { IQuestion } from '@app/core/interfaces';

class ZCEDatabase extends Dexie {
  public questionTable!: Dexie.Table<IQuestion, number>; // id is number in this case

  constructor() {
    super('PHP_ZCE_DB');
    const questionTable = '++id,type,*category,difficulty,*questionRows,*answerRows,_version';
    this.version(1).stores({ questionTable });
  }
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDbQuizService {
  private db: ZCEDatabase;

  constructor() {
    this.db = new ZCEDatabase();
  }

  addQuestion(question: IQuestion): Promise<number> {
    question._version = environment.appVersion;
    delete question._isValidated;
    [0, 1, 2, 3].forEach((value, index, array) => {
      delete question.answerRows[index]._isCheckedByUser;
    });

    return this.db.questionTable.add(question);
  }

  getQuestionById(id: number): Promise<IQuestion> {
    return this.db.questionTable.get(id);
  }

  async clearQuestionTableByVersion(): Promise<number> {
    const promise = this.db.questionTable
      .where('_version')
      .notEqual(environment.appVersion)
      .delete();

    return await promise;
  }

  clearQuestionTable(): Promise<void> {
    return this.db.questionTable.clear();
  }

  updateQuestion(question: IQuestion): Promise<number> {
    return this.db.questionTable.put(question);
  }

  deleteQuestion(id: number): Promise<void> {
    return this.db.questionTable.delete(id);
  }

  getAllQuestions(): Promise<IQuestion[]> {
    return this.db.questionTable.toArray();
  }
}
