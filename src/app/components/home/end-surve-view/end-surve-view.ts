import { Component, computed, effect, inject } from '@angular/core';
import { Surveys } from '../../../shared/services/surveys';
import { RouterLink } from '@angular/router';
import { DaysLeftPipe } from '../../../shared/pipes/pipes';

@Component({
  selector: 'app-end-surve-view',
  imports: [RouterLink, DaysLeftPipe],
  templateUrl: './end-surve-view.html',
  styleUrl: './end-surve-view.scss',
})
export class EndSurveView {
  surveyService = inject(Surveys);
  list = this.surveyService.surveyslist;

  private getDaysLeft(date: string | Date): number {
    const end = new Date(date);
    const today = new Date();
    const diff = end.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  sortedList = computed(() => {
    return [...this.list()]
      .filter(item => this.getDaysLeft(item.date) > 0)
      .sort((a, b) => this.getDaysLeft(a.date) - this.getDaysLeft(b.date));
  });
}
