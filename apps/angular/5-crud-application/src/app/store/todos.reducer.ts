import { createReducer, on } from '@ngrx/store';
import { Todo } from '../model/todo.model';
import * as TodosActions from '../store/todos.actions';

export const todosFeatureKey = 'Todos';

export interface TodosState {
  todos: Todo[];
  loadingTodos: boolean;
}

export const initialState: TodosState = {
  todos: [],
  loadingTodos: false,
};

export const todosReducer = createReducer(
  initialState,
  on(TodosActions.loadTodos, (state) => {
    return { ...state, loadingTodos: true };
  }),
  on(TodosActions.loadTodosSuccess, (state, actions) => {
    return { ...state, todos: actions.todos, loadingTodos: false };
  }),
  on(TodosActions.loadTodosFailed, (state) => {
    return { ...state, loadingTodos: false };
  }),
  on(TodosActions.updateTodo, (state) => {
    return { ...state, loadingTodos: true };
  }),
  on(TodosActions.todoUpdated, (state, { todo }) => {
    const todos = state.todos.map((todoValue) => {
      return todoValue.id === todo.id ? todo : todoValue;
    });
    return { ...state, todos: todos, loadingTodos: false };
  }),
  on(TodosActions.deleteTodo, (state) => {
    return { ...state, loadingTodos: true };
  }),
  on(TodosActions.todoDeleted, (state, { todo }) => {
    const todos = state.todos
      .map((todoValue) => {
        return todoValue.id === todo.id ? null : todoValue;
      })
      .filter((element) => !!element);

    return { ...state, todos: todos, loadingTodos: false };
  }),
);
