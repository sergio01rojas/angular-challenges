import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, viewChild } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { MarkerTemplateDirective } from '../../ui/directive/my-template.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <ng-template markerTemplate let-myItem let-otherValue="sergio">
      <app-list-item
        [name]="myItem.firstName"
        [id]="myItem.id"
        (deletItem)="onDeleteItem($event)" />
    </ng-template>

    <app-card
      [list]="teachers()"
      customClass="bg-light-red"
      [itemTemplate]="markerTemplateDirective().templateRef"
      (addItem)="onAddItem()">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" />
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    MarkerTemplateDirective,
  ],
})
export class TeacherCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(TeacherStore);

  markerTemplateDirective = viewChild.required(MarkerTemplateDirective);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  onAddItem() {
    this.store.addOne(randTeacher());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
