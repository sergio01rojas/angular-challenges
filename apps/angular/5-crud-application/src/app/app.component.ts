import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoComponent } from './component/todo/todo.component';
import { TodoService } from './data-access/todo.service';
import { Todo } from './model/todo.model';
import * as TodosActions from './store/todos.actions';
import * as TodosSelector from './store/todos.selectors';

@Component({
  imports: [TodoComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly todoService = inject(TodoService);
  private readonly store = inject(Store);

  todos = this.store.selectSignal(TodosSelector.selectAllTodos);
  isloading = this.store.selectSignal(TodosSelector.selectIsloading);

  /**
   //Mejor usar LinkedSignal, alimentandolo con el todosItems, es decir, todosItems se mantiene  
   //cambiar todos signal por LinkedSignal 
  todosItems = toSignal(this.todoService.getAllTodos(), { initialValue: [] }); //avoid ngOnInit to call todoService.getAllTodos() and subscribe //load initial value
  todos = signal<Todo[]>([]); //editable signal, why =>  1. becuase todosItems field  only changed when component is loaded is good for us to change todos signal list value
  //2. Later when Todo is edited, deleted or added, we can change also the todos signal list

  effectTodos = effect(() => {
    const todosArray = this.todosItems();
    if (todosArray?.length > 0) {
      this.todos.set(todosArray);
    }
  });*/
  

  ngOnInit(): void {
    this.store.dispatch(TodosActions.loadTodos());
  }

  update(todo: Todo) {
    this.store.dispatch(TodosActions.updateTodo({ todo }));
    /**this.todoService.updateTodo(todo).subscribe((updatedTodo: Todo) => {
      this.todos.update((todoList) =>
        todoList.map((todoValueList) => {
          if (todoValueList.id === updatedTodo.id) {
            return updatedTodo;
          } else {
            return todoValueList;
          }
        }),
      );
    });*/
  }

  delete(todo: Todo) {
    this.store.dispatch(TodosActions.deleteTodo({ todo }));

    /**this.todoService.deleteTodo(todo).subscribe(() => {
      this.todos.update((todoList) =>
        todoList
          .map((todoValueList) => {
            if (todoValueList.id === todo.id) {
              return null;
            } else {
              return todoValueList;
            }
          })
          .filter((element) => !!element),
      );
    });*/
  }
}
