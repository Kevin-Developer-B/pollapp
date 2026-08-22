import { Component, inject } from '@angular/core';
import { Surveys } from '../../../shared/services/surveys';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-end-surve-view',
  imports: [RouterLink],
  templateUrl: './end-surve-view.html',
  styleUrl: './end-surve-view.scss',
})
export class EndSurveView {
  surveyService = inject(Surveys)

  list = this.surveyService.surveyslist
}
