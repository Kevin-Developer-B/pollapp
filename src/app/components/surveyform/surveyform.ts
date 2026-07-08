import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '../../services/service';
import { Router } from '@angular/router';
import { DropdownMenu } from '../../services/dropdown_service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './surveyform.html',
  styleUrl: './surveyform.scss'
})
export class SurveyForm implements OnInit {
  router = inject(Router);
  dropdownMenu = inject(DropdownMenu);
  bgHome = inject(Service);
  path = "";

  surveyform = new FormGroup({
    surveyname: new FormControl('', {
      validators: [Validators.required]
    }),
    date: new FormControl('', {
      validators: [Validators.required]
    }),

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
    const answers = new FormArray([
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
    this.questions.push(this.createQuestion());
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
    this.getAnswers(questionIndex).push(this.createAnswer());
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.getAnswers(questionIndex).removeAt(answerIndex);
  }

  closeForm() {
    this.router.navigate([""]);
  }

  submit(): void {
    console.log(this.surveyform.value);
  }

}


// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Service } from '../../services/service';
// import { DropdownMenu } from '../../services/dropdown_service';
// import { Router } from '@angular/router';
// import { FormControl, ReactiveFormsModule, FormGroup, Validators, FormArray } from '@angular/forms';

// @Component({
//   selector: 'app-surveyform',
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './surveyform.html',
//   styleUrl: './surveyform.scss',
// })
// export class Surveyform {
//   bgHome = inject(Service);
//   dropdownMenu = inject(DropdownMenu);
//   router = inject(Router);
//   formOpen = true
//   path = "";

//   ngOnInit() {
//     let currentBg = this.bgHome.setSecondary()
//     if (currentBg!) this.path = currentBg
//     this.addQuestion();
//   }



//   surveyform = new FormGroup({
//     surveyname: new FormControl('', {
//       validators: [Validators.required]
//     }),

//     questions: new FormArray([])
//   });

//   get questions(): FormArray {
//     return this.surveyform.get('questions') as FormArray;
//   }

//   private createQuestion(): FormGroup {
//     return new FormGroup({
//       question: new FormControl('', {
//         validators: [Validators.required]
//       }),

//       multipleAnswers: new FormControl(false),

//       answers: new FormArray([])
//     });
//   }

//   addQuestion(): void {
//     this.questions.push(this.createQuestion());
//   }

//   

//   onSubmit() {
//     // TODO: Use output() with form value

//     console.warn();
//   }
// }
