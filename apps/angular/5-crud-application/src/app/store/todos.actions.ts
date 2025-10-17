import { createAction, props } from '@ngrx/store';
import { Todo } from '../model/todo.model';

export const loadTodos = createAction('[Todos] load todos');
export const loadTodosSuccess = createAction(
  '[Todos] load todos success',
  props<{ todos: Todo[] }>(),
);
export const loadTodosFailed = createAction(
  '[Todos] load todos failed',
  props<{ error: string }>(),
);

export const updateTodo = createAction(
  '[Todos] update Todo',
  props<{ todo: Todo }>(),
);
export const todoUpdated = createAction(
  '[Todos] updated Todo',
  props<{ todo: Todo }>(),
);

export const deleteTodo = createAction(
  '[Todos] delete Todo',
  props<{ todo: Todo }>(),
);
export const todoDeleted = createAction(
  '[Todos] deleted Todo',
  props<{ todo: Todo }>(),
);
