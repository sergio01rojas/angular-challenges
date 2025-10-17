import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'todoComponent',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class TodoComponent {
  todo = input.required<Todo>();
  changed = output<Todo>();
  deleted = output<void>();

  updateTodo() {
    const currentTodo = this.todo();
    this.changed.emit({ ...currentTodo, title: randText() });
  }

  deleteTodo() {
    this.deleted.emit();
  }
}
