import { FormArray, FormControl } from "@angular/forms";

export interface Survey {
    surveyname: string;
    date: string;
    category: string;
    description: string;
    question: Question[];
}

export interface Question {
    text: string;
    multipleAnswers: boolean;
    Answers: string[];
}

export interface QuestionForm {
  question: FormControl<string | null>;
  multipleAnswers: FormControl<boolean | null>;
  answers: FormArray<FormControl<string |null>>;
}