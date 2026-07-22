import { Component, inject } from '@angular/core';
import { Supabase } from '../../../services/supabase';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-surveys',
  imports: [JsonPipe],
  templateUrl: './surveys.html',
  styleUrl: './surveys.scss',
})
export class Surveys {
  databank = inject(Supabase)

  ngOnInit() {
    this.databank.getSurveys();
  }
}
