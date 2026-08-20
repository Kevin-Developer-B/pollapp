import { inject, Injectable, signal } from '@angular/core';
import { Survey } from '../interfaces/survey';
import { Supabase } from '../../services/supabase';
import { SurveyModel } from '../models/survey-model';

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
    console.log(response.data);
  }

  async addSurvey(survey: SurveyModel) {
    const survey_data = survey.getCleanAddJson();
    const { data, error } = await this.db.supabase
      .from('survey')
      .insert([
        survey_data
      ])
      .select()
    this.surveyslist.update(list => [...list, survey])
  }

  async deleteSurvey(id: number) {
    const { error } = await this.db.supabase
      .from('survey')
      .delete()
      .eq('id', id)
  }

  constructor() {
    this.getAllSurveys();
  }
}
