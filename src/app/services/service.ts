import { inject, Injectable, signal } from '@angular/core';
import { Supabase } from './supabase';
import { Survey } from '../components/survey/survey';

@Injectable({
  providedIn: 'root',
})
export class Service {
  backgroundMode = signal<'primary' | 'secondary'>('primary');
  supabase = inject(Supabase)

  setPrimary() {
    this.backgroundMode.set('primary');
    document.body.classList.remove('body--secondary');
    document.body.classList.add('body--primary');
  }

  setSecondary() {
    this.backgroundMode.set('secondary');
    document.body.classList.remove('body--primary');
    document.body.classList.add('body--secondary');
  }

  async addSurvey(survey: Survey) {
    console.log();
    
    // const { data, error } = await this.supabase
    //   .from('survey')
    //   .insert([
    //     { some_column: 'someValue', other_column: 'otherValue' },
    //   ])
    //   .select()
  }
}
