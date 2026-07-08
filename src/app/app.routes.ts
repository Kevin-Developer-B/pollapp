import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SurveyForm } from './components/surveyform/surveyform';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'form', component: SurveyForm },
];
