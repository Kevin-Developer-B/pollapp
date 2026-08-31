import { inject, Injectable, Signal, signal } from '@angular/core';
import { Question, Survey } from '../interfaces/survey';
import { Supabase } from '../../services/supabase';
import { SurveyModel } from '../models/survey-model';

@Injectable({
  providedIn: 'root',
})
export class Surveys {
  db = inject(Supabase)

  surveyslist = signal<Survey[]>([]);
  surveydetail = signal<Survey>({
    "id": 0,
    "surveyname": "n/a",
    "date": "n/a",
    "category": "n/a",
    "description": "n/a",
    "questions": [] as Question[],
  })

  surveylistInsertChannel;
  surveylistUpdateChannel;

  setSurveyDetailById(id: number) {
    let tmpSurvey = this.surveyslist().find(survey => survey.id == id);
    if (tmpSurvey) this.surveydetail.set(tmpSurvey);
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
    this.surveyslist.set((response.data ?? []) as Survey[]);
  }

  async addSurvey(survey: SurveyModel) {
    const survey_data = survey.getCleanAddJson();
    survey_data.date = this.normalizeDate(survey_data.date);
    const { data, error } = await this.db.supabase
      .from('survey')
      .insert([
        survey_data
      ])
      .select()
  }

  async updateSurvey(survey: Survey) {
    await this.db.supabase
      .from('survey')
      .update({ questions: survey.questions })
      .eq('id', survey.id)
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

  private normalizeDate(input: string): string {
    if (!input) return input;
    if (input.includes('.')) {
      const [day, month, year] = input.split('.');
      return `${year}-${month}-${day}`;
    }
    if (input.includes('-') && input.split('-')[0].length === 2) {
      const [day, month, year] = input.split('-');
      return `${year}-${month}-${day}`;
    }
    if (input.includes('/')) {
      const [year, month, day] = input.split('/');
      return `${year}-${month}-${day}`;
    }
    return input;
  }

}
