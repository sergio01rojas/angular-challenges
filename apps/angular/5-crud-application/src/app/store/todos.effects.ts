import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TodoService } from '../data-access/todo.service';
import { Todo } from '../model/todo.model';
import * as TodoActions from '../store/todos.actions';

@Injectable({ providedIn: 'root' })
export class TodosEffect {
  private readonly actions$ = inject(Actions);
  private readonly todoService = inject(TodoService);

  public loadTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() => {
        return this.todoService.getAllTodos().pipe(
          map((todos: Todo[]) => {
            return TodoActions.loadTodosSuccess({ todos });
          }),
          catchError((error: Error) => {
            console.log(`Error loading the Todos: ${error.message}`);
            return of(TodoActions.loadTodosFailed({ error: error.message }));
          }),
        );
      }),
    );
  });

  public udpateTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap(({ todo }) => {
        return this.todoService.updateTodo(todo).pipe(
          map((updatedTodo: Todo) => {
            return TodoActions.todoUpdated({ todo: updatedTodo });
          }),
        );
      }),
    );
  });

  public deleteTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap(({ todo }) => {
        return this.todoService.deleteTodo(todo).pipe(
          map(() => {
            return TodoActions.todoDeleted({ todo });
          }),
        );
      }),
    );
  });
}
