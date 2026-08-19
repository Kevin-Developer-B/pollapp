import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '../../services/service';
import { Router, RouterLink } from '@angular/router';
import { DropdownMenu } from '../../services/dropdown_service';
import { CommonModule } from '@angular/common';
import { Supabase } from '../../services/supabase';
import { Surveys } from '../../shared/services/surveys';
import { SurveyModel } from '../../shared/models/survey-model';
// import { QuestionForm } from '../../shared/interfaces/survey';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './surveyform.html',
  styleUrl: './surveyform.scss'
})
export class SurveyForm implements OnInit {
  databank = inject(Supabase);
  router = inject(Router);
  dropdownMenu = inject(DropdownMenu);
  service = inject(Service);
  surveyService = inject(Surveys)
  path = "";
  maxAnswer = 6;
  minAnswer = 2;
  maxQuestion = 4;
  showAnswerLimit = false;
  isPopUp = false;
  questionPlaceholders = [
    'Which date would work best for you?',
    'Choose the activities you prefer.',
    'What time would you be available?',
    'Which location would you choose?'
  ];
  answerText = "You can add up to 6 answer fields.";

  surveyform = new FormGroup({
    surveyname: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    date: new FormControl('', { nonNullable: true }),
    category: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    questions: new FormArray<FormGroup>([])
  });

  get questions(): FormArray {
    return this.surveyform.get('questions') as FormArray;
  }

  ngOnInit(): void {
    let currentBg = this.service.setSecondary()
    if (currentBg!) this.path = currentBg
    this.addQuestion();
    // this.surveyService.deleteSurvey(1);
  }


  addQuestion(): void {
    if (this.questions.length >= this.maxQuestion) return
    this.questions.push(this.createQuestion());
  } 

  private createQuestion(): FormGroup {
    return new FormGroup({
      question: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      multipleAnswers: new FormControl(false),
      answers: new FormArray<FormControl<string | null>>([
        new FormControl('', { nonNullable: true, validators: Validators.required }),
        new FormControl('', { nonNullable: true, validators: Validators.required })
      ])
    });
  }

  selectCategory(category: string) {
    this.dropdownMenu.dropdownText.set(category);
    this.surveyform.get('category')?.setValue(category);
  }

  clearQuestion(questionIndex: number): void {
    let question = this.questions.at(questionIndex) as FormGroup;
    question.get('question')?.reset('');
    question.get('multipleAnswers')?.setValue(false);
    let answers = question.get('answers') as FormArray;
    answers.controls.forEach(answer => answer.reset(''));
  }

  deleteQuestion(questionIndex: number): void {
    if (questionIndex === 0) {
      this.clearQuestion(questionIndex);
      return;
    }
    this.removeQuestion(questionIndex);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  getAnswers(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('answers') as FormArray;
  }

  getAnswerLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  addAnswer(questionIndex: number): void {
    let answers = this.getAnswers(questionIndex);
    if (answers.length >= this.maxAnswer) return
    answers.push(new FormControl('', { validators: Validators.required }));
  }

  clearAnswer(questionIndex: number, answerIndex: number): void {
    this.getAnswers(questionIndex).at(answerIndex).reset('');
  }

  showAnswerNotice(questionIndex: number): boolean {
    let answerCount = this.getAnswers(questionIndex).length;
    return answerCount >= 3 && answerCount < this.maxAnswer;
  }

  showQuestionLimit(): boolean {
    return this.questions.length >= this.maxQuestion - 2
      && this.questions.length < this.maxQuestion;
  }

  canAddAnswer(questionIndex: number): boolean {
    return this.getAnswers(questionIndex).length < this.maxAnswer;
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.getAnswers(questionIndex).removeAt(answerIndex);
  }

  clearField(controlName: string): void {
    this.surveyform.get(controlName)?.reset('')
  }

  closeForm() {
    this.router.navigate([""]);
  }

  submit(): void {
    if (this.surveyform.valid) {
      let survey = new SurveyModel(this.surveyform.value)
      this.surveyService.addSurvey(survey);
      this.isPopUp = true;
      this.surveyform.reset();
      this.dropdownMenu.dropdownText.set("");
    }
  }
}