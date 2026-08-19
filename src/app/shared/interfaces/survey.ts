import { FormArray, FormControl } from "@angular/forms";

export interface Survey {
    surveyname: string;
    date: string;
    category: string;
    description: string;
    questions: Question[];
}

export interface Question {
    question: string;
    multipleAnswers: boolean;
    answers: string[];
}

// export interface QuestionForm {
//   question: FormControl<string | null>;
//   multipleAnswers: FormControl<boolean | null>;
//   answers: FormArray<FormControl<string |null>>;
// }