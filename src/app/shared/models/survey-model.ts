import { Survey, Question } from "../interfaces/survey";

export class SurveyModel implements Survey{
    id: number;
    surveyname: string;
    date: string;
    category: string;
    description: string;
    questions: Question[];

    constructor(data: Partial<Survey> = {}) {
        this.id = data.id ?? 0;
        this.surveyname = data.surveyname ?? "";
        this.date = data.date ?? "";
        this.category = data.category ?? "";
        this.description = data.description ?? "";
        this.questions = data.questions ?? [];
    }

    getCleanAddJson() {
        return {
            surveyname: this.surveyname,
            date: this.date,
            category: this.category,
            description: this.description,
            questions: this.questions,
        }
    }
}
