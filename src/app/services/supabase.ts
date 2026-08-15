import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  supabase = createClient('https://jhjioktzlzlmjvsbxeva.supabase.co', 'sb_publishable_NbL2wcqTG9MyJe-iAQgzLw_zfmvt9Ix')

  // surveys = signal<Survey[]>([]);

  // async getSurveys() {
  //   let { data: survey, error } = await this.supabase
  //     .from('survey')
  //     .select('name')
  //     // .range ( 0 , 2 )​
  //     // .lte ( 'date' , '3' )
  //   if (!survey) return
  //   this.surveys.set(survey)
  // }

  // async setSurvey(survey: Survey) {
  //   let { data, error } = await this.supabase
  //     .from('survey')
  //     .insert([survey])
  //     .select()
  // }
}
