import { Component, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { CustomPipe } from './pipes/custom.pipe';

@Component({
  selector: 'app-root',
  template: `
    <button class="custom-button" (click)="change()">Change Data</button>
    <div class="container">
      @for (person of persons(); track person; let myIndex = $index) {
        <div class="card">
          {{ person | custom: $index }}
        </div>
      }
    </div>
  `,
  imports: [CustomPipe],
  styles: `
    .container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
      padding: 16px;
    }

    .card {
      display: flex;
      background-color: #f9faec;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 16px;
      width: 300px;
    }

    .custom-button {
      width: 100%;
      height: 25px;
      background-color: green;
      color: #fff;
    }
  `,
})
export class AppComponent {
  persons = signal(['toto', 'jack', 'sergio', 'andres', 'moises', 'daniel']);

  change() {
    const isAdded = Math.random() > 0.5;
    this.persons.update((values) => {
      const returnedValue = [...values];
      if (isAdded) {
        returnedValue.push(randText());
      } else {
        returnedValue.pop();
      }
      return returnedValue;
    });
  }
}
