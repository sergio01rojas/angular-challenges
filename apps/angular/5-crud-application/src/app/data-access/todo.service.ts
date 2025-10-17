import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly TODO_REST_URL = 'https://jsonplaceholder.typicode.com/todos';

  private readonly httpClient = inject(HttpClient);

  /**
   * GET
   */
  getAllTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.TODO_REST_URL);
  }

  /**
   * UPDATE
   */
  updateTodo(todo: Todo): Observable<Todo> {
    const todoString = JSON.stringify({
      todo: todo.id,
      title: todo.title,
      userId: todo.userId,
    });

    return this.httpClient
      .put<Todo>(`${this.TODO_REST_URL}/${todo.id}`, todoString, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .pipe(map(() => todo));
  }

  /**
   * DELETE
   */
  deleteTodo(todo: Todo): Observable<void> {
    return this.httpClient.delete<void>(`${this.TODO_REST_URL}/${todo.id}`);
  }
}
