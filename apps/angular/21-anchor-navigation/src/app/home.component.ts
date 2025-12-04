import { Component } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';

@Component({
  imports: [NavButtonComponent],
  selector: 'app-home',
  template: `
    <nav-button [href]="'/foo'" class="fixed left-1/2 top-3">Go Foo Page</nav-button>

    <div id="top" class="h-screen bg-gray-500">
      THIS IS HOME PAGE
      <nav-button [fragment]="'bottom'">Scroll Bottom</nav-button>
    </div>

    <div id="bottom" class="h-screen bg-blue-300">
      I WANT TO SCROLL EACH
      <nav-button [fragment]="'top'">Scroll Top</nav-button>
    </div>
  `,
})
export class HomeComponent {}
