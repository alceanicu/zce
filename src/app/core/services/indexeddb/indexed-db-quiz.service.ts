import { Injectable } from '@angular/core';
import { IQuestion } from '@app/core/interfaces';
import Dexie from 'dexie';
import { environment } from '@env/environment';

class ZCEDatabase extends Dexie {
  public questionTable!: Dexie.Table<IQuestion, number>; // id is number in this case

  constructor() {
    super(`${environment.appVersion}_ZCE_DB`);
    this.version(1)
      .stores({questionTable: '++id,*category,difficulty,type,finalAnswer,value,*questionRows,*answerRows'});
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

  get dbName(): string {
    return this.db.name;
  }

  addQuestion(question: IQuestion): Promise<any> {
    return this.db.questionTable.add(question);
  }

  getQuestionById(id: number): Promise<IQuestion> {
    return this.db.questionTable.get(id);
  }

  clearQuestionTable(): Promise<void> {
    return this.db.questionTable.clear();
  }

  updateQuestion(question: IQuestion): Promise<any> {
    return this.db.questionTable.put(question);
  }

  deleteQuestion(id: number): Promise<any> {
    return this.db.questionTable.delete(id);
  }

  getAllQuestions(): Promise<IQuestion[]> {
    return this.db.questionTable.toArray();
  }
}
