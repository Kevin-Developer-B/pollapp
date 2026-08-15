import { inject, Injectable, signal } from '@angular/core';
import { Survey } from '../interfaces/survey';
import { Supabase } from '../../services/supabase';

@Injectable({
  providedIn: 'root',
})
export class Surveys {
  db = inject(Supabase)
  surveyslist = signal<Survey[]>([]);

  async getAllSurveys() {
    let response = await this.db.supabase
      .from('survey')
      .select('*')
    this.surveyslist.set((response.data ?? []) as Survey[])
  }

  async addSurvey(survey: Survey) {
    const { data, error } = await this.db.supabase
      .from('survey')
      .insert([
        survey
      ])
      .select()
    this.surveyslist.update(list => [...list, survey])
  }

  constructor() {
    this.getAllSurveys();
  }
}
