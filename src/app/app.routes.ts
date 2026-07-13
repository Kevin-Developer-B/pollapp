import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SurveyForm } from './components/surveyform/surveyform';
import { Survey } from './components/survey/survey';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'form', component: SurveyForm },
    { path: 'survey', component: Survey },
];
