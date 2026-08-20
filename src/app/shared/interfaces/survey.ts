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