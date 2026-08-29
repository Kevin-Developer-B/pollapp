import { inject, Injectable, signal } from '@angular/core';
import { Supabase } from './supabase';

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
}
