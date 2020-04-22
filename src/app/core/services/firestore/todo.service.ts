import { Entity, FirestoreCrudService } from '@app/core/services/firestore/firestore-crud.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Todo extends Entity {
  todo: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly crudService: FirestoreCrudService<Todo>;

  // AngularFirestore should be found by Angular DI System
  constructor(
    private readonly db: AngularFirestore
  ) {
    // Let's create our CrudService and use the a Collection with the name 'todos'
    this.crudService = new FirestoreCrudService<Todo>(db, 'todos');
  }

  addTodo(model: Todo) {
    return this.crudService.add(model);
  }

  getById(id: number) {
    const d = this.crudService.getById(id);
    // console.log('AICI', d);
    return d;
  }

  updateTodoCategory(todo: Todo, category: string) {
    return this.crudService.update({...todo, category});
  }

  deleteTodo(todo: Todo) {
    return this.crudService.delete(todo.id);
  }

  getAllTodos() {
    return this.crudService.list();
  }
}
