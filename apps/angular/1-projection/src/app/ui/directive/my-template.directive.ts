import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[markerTemplate]',
})
export class MarkerTemplateDirective {
  public templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}
