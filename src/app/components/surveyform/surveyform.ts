import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '../../services/service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DropdownMenu } from '../../services/dropdown_service';
import { CommonModule } from '@angular/common';
import { Supabase } from '../../services/supabase';

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
  bgHome = inject(Service);
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
    surveyname: new FormControl('', {
      validators: [Validators.required]
    }),
    date: new FormControl(''),
    description: new FormControl(''),
    questions: new FormArray([])
  });

  get questions(): FormArray {
    return this.surveyform.get('questions') as FormArray;
  }

  ngOnInit(): void {
  let currentBg = this.bgHome.setSecondary()
    if (currentBg!) this.path = currentBg
    this.addQuestion();
  }

  private createQuestion(): FormGroup {
    let answers = new FormArray([
      this.createAnswer(),
      this.createAnswer()
    ]);
    return new FormGroup({
      question: new FormControl('', Validators.required),
      multipleAnswers: new FormControl(false),
      answers: answers
    });
  }

  addQuestion(): void {
    if (this.questions.length >= this.maxQuestion) {
      return
    }
    this.questions.push(this.createQuestion());
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

  private createAnswer(): FormControl {
    return new FormControl('', Validators.required);
  }

  getAnswers(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('answers') as FormArray;
  }

  getAnswerLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  addAnswer(questionIndex: number): void {
    let answer = this.getAnswers(questionIndex);
    if (answer.length >= this.maxAnswer) {
      return
    }
    answer.push(this.createAnswer());
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
    this.isPopUp = true;
    console.log(this.surveyform.value);
    this.surveyform.reset();
    this.databank.setSurvey(
      {name: "Wie gehts", date: 22});
  }

}