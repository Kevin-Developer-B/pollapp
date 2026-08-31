import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysLeft',
  standalone: true,
})
export class DaysLeftPipe implements PipeTransform {
  transform(endDate: string | Date): number {
    const end = new Date(endDate);
    const today = new Date();
    const diff = end.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}