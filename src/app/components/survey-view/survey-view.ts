import { Component, inject, signal } from '@angular/core';
import { Surveys } from '../../shared/services/surveys';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../../services/service';
import { Question, Survey } from '../../shared/interfaces/survey';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-survey-view',
  imports: [DatePipe],
  templateUrl: './survey-view.html',
  styleUrl: './survey-view.scss',
})
export class SurveyView {
  surveyService = inject(Surveys)
  service = inject(Service)
  path = ""
  router = inject(Router);
  route = inject(ActivatedRoute);
  surveys = this.surveyService.surveyslist;
  detail = this.surveyService.surveydetail;
  survey = this.surveyService.surveydetail;

  liveSurvey!: Survey;

  ngOnInit() {
    let currentBg = this.service.setSecondary()
    if (currentBg!) this.path = currentBg

    let currentId = Number(this.route.snapshot.paramMap.get('id'));
    if (currentId) this.surveyService.setSurveyDetailById(currentId);

    this.liveSurvey = structuredClone(this.survey());
  }

  toLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  onSelected(question: Question, index: number) {
    if (question.multipleAnswers) {
      question.answers[index].selected = !question.answers[index].selected;
      return;
    }
    if (question.answers[index].selected) {
      question.answers[index].selected = false;
      return;
    }
    question.answers.forEach((a, i) => {
      a.selected = i === index;
    });
  }

  getPercent(qIndex: number, aIndex: number) {
    const answers = this.liveSurvey.questions[qIndex].answers;
    const total = answers.reduce((sum, a) => sum + (a.selected ? 1 : 0), 0);
    if (total === 0) return 0;
    const value = answers[aIndex].selected ? 1 : 0;
    return Math.round((value / total) * 100);
  }

  hasResults(): boolean {
    return this.liveSurvey.questions.some(q =>
      q.answers.some(a => a.selected)
    );
  }

  async updateSurveyDetail() {
    this.surveyService.updateSurvey(this.survey());
    this.router.navigate([""]);
  }
}
