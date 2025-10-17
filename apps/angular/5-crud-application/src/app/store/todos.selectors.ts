import { createFeatureSelector, createSelector } from '@ngrx/store';
import { todosFeatureKey, TodosState } from './todos.reducer';

//init selectors
export const selectTodosState =
  createFeatureSelector<TodosState>(todosFeatureKey);

//define selectors
export const selectAllTodos = createSelector(selectTodosState, (state) => {
  return state.todos;
});

export const selectIsloading = createSelector(selectTodosState, (state) => {
  return state.loadingTodos;
});
