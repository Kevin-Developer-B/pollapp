import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  backgroundMode = signal<'primary' | 'secondary'>('primary');

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
