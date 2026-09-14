import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysLeft',
  standalone: true,
})
export class DaysLeftPipe implements PipeTransform {
  transform(endDate: string | Date): number {
    let normalized: Date;
    if (typeof endDate === 'string' && endDate.includes('.')) {
      const [day, month, year] = endDate.split('.');
      normalized = new Date(`${year}-${month}-${day}`);
    } else {
      normalized = new Date(endDate);
    }
    const today = new Date();
    const diff = normalized.getTime() - today.getTime();
    if (diff >= 0) {
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    } else {
      return 0
    }
  }
}