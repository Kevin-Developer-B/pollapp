import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenu } from '../../../services/dropdown_service';
import { Surveys } from '../../../shared/services/surveys';
import { DaysLeftPipe } from '../../../shared/pipes/pipes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-surveyslist',
  imports: [CommonModule, DaysLeftPipe, RouterLink],
  templateUrl: './surveyslist.html',
  styleUrl: './surveyslist.scss',
})


export class Surveyslist {
  surveyService = inject(Surveys);
  list = this.surveyService.surveyslist;
  dropdownMenu = inject(DropdownMenu);
  selectedActive = signal(true);
  selectedPast = signal(false);
  selectedCategory = signal('');

  private getDaysLeft(date: string | Date): number {
    let end = new Date(date);
    let today = new Date();
    let diff = end.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }


  cardlist = computed(() => {
    let active = this.selectedActive();
    let past = this.selectedPast();
    let category = this.selectedCategory();
    let surveys = this.list();

    return surveys.filter(item => {
      let days = this.getDaysLeft(item.date);

      let activeCheck = active && days > 0;
      let pastCheck = past && days <= 0;

      let noSelection = !active && !past;

      let categoryCheck =
        category === '' ? true : item.category === category;

      return (activeCheck || pastCheck || noSelection) && categoryCheck;
    });
  });

  toggleActive() {
  this.selectedActive.set(!this.selectedActive());
}

togglePast() {
  this.selectedPast.set(!this.selectedPast());
}


  // filterSelection(item: string) {
  //   this.selectedActive.set(item);
  // }

  filterCategory(item: string) {
    this.selectedCategory.set(item);
  }

  resetFilter() {
    this.selectedCategory.set('');
    this.dropdownMenu.dropdownText.set('');
  }
}
