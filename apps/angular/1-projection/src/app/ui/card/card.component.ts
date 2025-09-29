import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="img"></ng-content>

      <section>
        @for (item of list(); track item) {
          <ng-container
            [ngTemplateOutlet]="itemTemplate()"
            [ngTemplateOutletContext]="{
              $implicit: item,
              sergio: 'any value'
            }"></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addItem.emit()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  readonly itemTemplate = input.required<TemplateRef<unknown>>();

  readonly addItem = output<void>();
}
