import { Component, inject } from '@angular/core';
import { Surveys } from '../../shared/services/surveys';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../../services/service';
import { Question } from '../../shared/interfaces/survey';

@Component({
  selector: 'app-survey',
  imports: [],
  templateUrl: './survey.html',
  styleUrl: './survey.scss',
})
export class Survey {
  surveyService = inject(Surveys)
  service = inject(Service)
  path = ""
  router = inject(Router);
  route = inject(ActivatedRoute);
  surveys = this.surveyService.surveyslist;
  detail = this.surveyService.surveydetail;

  ngOnInit() {
    let currentBg = this.service.setSecondary()
    if (currentBg!) this.path = currentBg

    let currentId = Number(this.route.snapshot.paramMap.get('id'));
    if (currentId) this.surveyService.setSurveyDetailById(currentId);
  }

  survey = this.surveyService.surveydetail;

  toLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  hasVotes(): boolean {
    return this.survey().questions.some(q =>
      q.answers.some(a => a.vote > 0)
    );
  }

  onVote(question: Question, index: number) {
    question.answers[index].vote += 1;
  }

  getPercent(question: Question, index: number): number {
    const total = question.answers.reduce((sum, a) => sum + a.vote, 0);
    if (total === 0) return 0;
    return Math.round((question.answers[index].vote / total) * 100);
  }

  async updateSurveyDetail() {
    this.surveyService.updateSurvey(this.survey().id);
    this.router.navigate([""]);
  }
}
