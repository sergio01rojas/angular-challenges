import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { MarkerTemplateDirective } from '../../ui/directive/my-template.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <ng-template markerTemplate let-item let-anyValue="sergio">
      <app-list-item
        [name]="item.firstName"
        [id]="item.id"
        (deletItem)="onDeleteItem($event)" />
    </ng-template>

    <app-card
      [list]="students()"
      customClass="bg-light-green"
      [itemTemplate]="markerTemplateDirective().templateRef"
      (addItem)="onAddItem()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    MarkerTemplateDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(StudentStore);

  markerTemplateDirective = viewChild.required(MarkerTemplateDirective);

  students = this.store.students;
  cardType = CardType.STUDENT;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  onAddItem() {
    this.store.addOne(randStudent());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
