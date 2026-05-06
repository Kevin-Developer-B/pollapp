import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Surveyform } from './components/surveyform/surveyform';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'form', component: Surveyform },
];
