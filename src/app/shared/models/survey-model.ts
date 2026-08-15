import { Question, Survey } from "../interfaces/survey";

export class SurveyModel implements Survey, Question {
    surveyname: string;
    date: string;
    category: string;
    description: string;
    question: Question[];
   
    text: string;
    multipleAnswers: boolean;
    Answers: string[];

    constructor(data: Partial<Survey & Question> = {}) {
        this.surveyname = data.surveyname ?? "";
        this.date = data.date ?? "";
        this.category = data.category ?? "";
        this.description = data.description ?? "";
        this.question = data.question ?? [];

        this.text = data.text ?? "";
        this.multipleAnswers = data.multipleAnswers ?? false;
        this.Answers = data.Answers ?? [];

    }
}
