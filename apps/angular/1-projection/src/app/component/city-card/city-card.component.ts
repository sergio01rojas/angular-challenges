import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { MarkerTemplateDirective } from '../../ui/directive/my-template.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <ng-template markerTemplate let-item let-anyValue="sergio">
      <app-list-item
        [name]="item.name"
        [id]="item.id"
        (deletItem)="onDeleteItem($event)" />
    </ng-template>

    <app-card
      [list]="cities()"
      customClass="bg-light-yellow"
      [itemTemplate]="markerTemplateDirective().templateRef"
      (addItem)="onAddItem()">
      <img ngSrc="assets/img/city.png" width="200" height="200" />
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-yellow {
        background-color: rgba(255, 255, 224, 0.6);
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
export class CityCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(CityStore);

  markerTemplateDirective = viewChild.required(MarkerTemplateDirective);

  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  onAddItem() {
    this.store.addOne(randomCity());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
