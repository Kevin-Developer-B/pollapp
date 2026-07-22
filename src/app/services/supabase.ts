import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  supabase = createClient('https://jhjioktzlzlmjvsbxeva.supabase.co', 'sb_publishable_NbL2wcqTG9MyJe-iAQgzLw_zfmvt9Ix')

  surveys = signal<{ id: number, created_at: string, name: string }[]>([]);

  async getSurveys() {
    let { data: survey, error } = await this.supabase
      .from('survey')
      .select('*')
    if (!survey) return
    this.surveys.set(survey)
  }

  async setSurvey(survey: {name: string, date:number}) {
    let { data, error } = await this.supabase
      .from('survey')
      .insert([survey])
      .select()
  }
}
