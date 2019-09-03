import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import {IQuestion} from '../../models';

class QuestionDatabase extends Dexie {
  public questionTable!: Dexie.Table<IQuestion, number>; // id is number in this case

  constructor() {
    super('QuestionDatabase');
    this.version(1).stores({
      questionTable: 'id,category,difficulty,type'
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDbQuizService {
  private db: QuestionDatabase;

  constructor() {
    this.db = new QuestionDatabase();
  }

  addQuestion(question: IQuestion): Promise<any> {
    return this.db.questionTable.add(question);
  }

  updateQuestion(question: IQuestion): Promise<any> {
    return this.db.questionTable.put(question);
  }

  deleteQuestion(id): Promise<any> {
    return this.db.questionTable.delete(id);
  }

  getQuestionById(id): Promise<IQuestion> {
    return this.db.questionTable.get(id);
  }

  getAllQuestions(): Promise<IQuestion[]> {
    return this.db.questionTable.toArray();
  }
}
