import { Component } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';
import { RouterLink } from '@angular/router';

@Component({
  imports: [NavButtonComponent, RouterLink],
  selector: 'app-foo',
  template: `
    WELCOME TO FOO PAGE
    <nav-button [href]="'/home'" class="fixed left-1/2 top-3">Go Home Page</nav-button>
    <div class="h-screen bg-blue-200" id="section1">
        SECTION 1 - 
        <a [routerLink]="'.'" [fragment]="'section2'" class="bg-red-300">Go Section 2</a>
    </div>
    <div class="h-screen bg-red-200" id="section2">
      SECTION 2 -
      <a [routerLink]="'.'" [fragment]="'section1'" class="bg-blue-300">Go Section 1</a>
    </div>
  `,
})
export class FooComponent {}
