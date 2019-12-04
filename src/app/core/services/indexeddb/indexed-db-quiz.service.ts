import { Injectable } from '@angular/core';
import { IQuestion } from '@app/core/interfaces';
import Dexie from 'dexie';

class ZCEDatabase extends Dexie {
  public questionTable!: Dexie.Table<IQuestion, number>; // id is number in this case

  constructor() {
    super('ZCE_DB');
    const schema = {questionTable: '++id,*category,difficulty,type,finalAnswer,value,*questionRows,*answerRows'};
    this.version(1).stores(schema);
    this.version(2).stores({questionTable: null}); // >= v 2.1.0
    this.version(3).stores(schema);
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
