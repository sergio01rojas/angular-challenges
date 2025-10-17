import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TodosEffect } from './store/todos.effects';
import * as TodosReducer from './store/todos.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore(TodosReducer.todosReducer),
    provideEffects([TodosEffect]),
    provideState(TodosReducer.todosFeatureKey, TodosReducer.todosReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
