import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name() }}

      <button (click)="delete(id())">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  private readonly teacherStore = inject(TeacherStore);
  private readonly studentStore = inject(StudentStore);

  readonly id = input.required<number>();
  readonly name = input.required<string>();

  readonly deletItem = output<number>();

  delete(id: number) {
    this.deletItem.emit(id);
  }
}
