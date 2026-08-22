import { inject, Injectable, signal } from '@angular/core';
import { Question, Survey } from '../interfaces/survey';
import { Supabase } from '../../services/supabase';
import { SurveyModel } from '../models/survey-model';

@Injectable({
  providedIn: 'root',
})
export class Surveys {
  db = inject(Supabase)

  surveyslist = signal<Survey[]>([]);

  surveydetail: Survey = {
    "id": 0,
    "surveyname": "n/a",
    "date": "n/a",
    "category": "n/a",
    "description": "n/a",
    "questions": [] as Question[],
  }

  surveylistInsertChannel;
  surveylistUpdateChannel;

  setSurveyDetailByName(name: string) {
    let tmpSurvey = this.surveyslist().find(survey => survey.surveyname == name);
    if (tmpSurvey) this.surveydetail = tmpSurvey;
  }

  constructor() {
    this.getAllSurveys();
    this.surveylistInsertChannel = this.db.supabase.channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'survey' },
        (payload) => {
          let tmpSurvey = new SurveyModel(payload.new)
          this.surveyslist.update(list => [...list, tmpSurvey])
        }
      )
      .subscribe()

    this.surveylistUpdateChannel = this.db.supabase.channel('custom-update-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'survey' },
        (payload) => {
          console.log('Change received!', payload)
        }
      )
      .subscribe()
  }

  async getAllSurveys() {
    let response = await this.db.supabase
      .from('survey')
      .select('*')
    this.surveyslist.set((response.data ?? []) as Survey[])
  }

  async addSurvey(survey: SurveyModel) {
    const survey_data = survey.getCleanAddJson();
    const { data, error } = await this.db.supabase
      .from('survey')
      .insert([
        survey_data
      ])
      .select()
  }

  async updateSurvey(id: number) {
    const { data, error } = await this.db.supabase
      .from('survey')
      .update({ other_column: 'otherValue' })
      .eq('id', id)
      .select()
  }

  async deleteSurvey(id: number) {
    const { error } = await this.db.supabase
      .from('survey')
      .delete()
      .eq('id', id)
  }

  ngOnDestroy() {
    this.db.supabase.removeChannel(this.surveylistInsertChannel);
    this.db.supabase.removeChannel(this.surveylistUpdateChannel);
  }
}
