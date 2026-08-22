import { Component, inject } from '@angular/core';
import { Surveys } from '../../shared/services/surveys';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../../shared/interfaces/survey';

@Component({
  selector: 'app-survey',
  imports: [],
  templateUrl: './survey.html',
  styleUrl: './survey.scss',
})
export class Survey {
  surveyService = inject(Surveys)
  router = inject(Router);
  route = inject(ActivatedRoute);
  surveys = this.surveyService.surveyslist;
  // detail = this.surveyService.surveyDetail;

  ngOnInit() {
    let currentName = this.route.snapshot.paramMap.get('surveyname');
    if(currentName) this.surveyService.setSurveyDetailByName(currentName);
    this.survey = this.surveyService.surveydetail
  }

  survey = {
    "id": 0,
    "surveyname": "n/a",
    "date": "n/a",
    "category": "n/a",
    "description": "n/a",
    "questions": [] as Question[],
  }

  toLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }



  async updateSurveyDetail() {
    // this.surveyService.updateSurvey(this.detail.id)
    this.router.navigate([""]);
  }
}
