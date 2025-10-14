import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { MarkerTemplateDirective } from '../directive/my-template.directive';

@Component({
  selector: 'app-card',
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  template: `
    <ng-content select="img"></ng-content>
    <section>
      @for (item of list(); track item) {
        <ng-container
          [ngTemplateOutlet]="contentTemplate2()"
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
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly itemTemplate = input.required<TemplateRef<unknown>>();
  readonly contentTemplate = contentChild(MarkerTemplateDirective, {
    read: TemplateRef,
  });
  readonly contentTemplate2 = contentChild('markerTemplateSergio', {
    read: TemplateRef,
  });

  readonly addItem = output<void>();
}
