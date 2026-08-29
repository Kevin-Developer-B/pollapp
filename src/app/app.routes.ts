import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SurveyForm } from './components/surveyform/surveyform';
import { SurveyView } from './components/survey-view/survey-view';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'form', component: SurveyForm },
    { path: 'survey/:id', component: SurveyView },
];
