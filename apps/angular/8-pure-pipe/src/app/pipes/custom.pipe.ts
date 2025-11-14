import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom',
  standalone: true,
})
export class CustomPipe<T> implements PipeTransform {
  transform(value: T, index: number): string {
    return `${value} - ${index}`;
  }
}
