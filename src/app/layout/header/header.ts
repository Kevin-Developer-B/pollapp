import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Surveys } from '../../shared/services/surveys';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  router = inject(Router);
  route = inject(ActivatedRoute)
  surveyService = inject(Surveys)
  

  thisRoute() {
    return this.router.url;
  }

  isSurveyRoute() {
    return this.router.url.startsWith('/survey/');
  }
}
