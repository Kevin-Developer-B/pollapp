import { Component, inject } from '@angular/core';
import { Surveys } from '../../../shared/services/surveys';

@Component({
  selector: 'app-end-surve-view',
  imports: [],
  templateUrl: './end-surve-view.html',
  styleUrl: './end-surve-view.scss',
})
export class EndSurveView {
  surveyService = inject(Surveys)

  list = this.surveyService.surveyslist
}
