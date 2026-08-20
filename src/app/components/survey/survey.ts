import { Component, inject } from '@angular/core';
import { Surveys } from '../../shared/services/surveys';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-survey',
  imports: [],
  templateUrl: './survey.html',
  styleUrl: './survey.scss',
})
export class Survey {
  supabase = inject(Surveys)

  list = this.supabase.surveyslist;

  toLetter(index: number): string {
    return String.fromCharCode(65 + index); // A = 65
  }
}
