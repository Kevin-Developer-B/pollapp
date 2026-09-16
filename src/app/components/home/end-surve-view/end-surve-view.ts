import { Component, computed, effect, inject } from '@angular/core';
import { Surveys } from '../../../shared/services/surveys';
import { RouterLink } from '@angular/router';
import { DaysLeftPipe } from '../../../shared/pipes/pipes';
import { Service } from '../../../services/service';

@Component({
  selector: 'app-end-surve-view',
  imports: [RouterLink, DaysLeftPipe],
  templateUrl: './end-surve-view.html',
  styleUrl: './end-surve-view.scss',
})
export class EndSurveView {
  surveyService = inject(Surveys);
  service = inject(Service);
  list = this.surveyService.surveyslist;

  sortedList = computed(() => {
    return [...this.list()]
      .filter(item => this.service.getDaysLeft(item.date) > 0)
      .sort((a, b) => this.service.getDaysLeft(a.date) - this.service.getDaysLeft(b.date));
  });
}
