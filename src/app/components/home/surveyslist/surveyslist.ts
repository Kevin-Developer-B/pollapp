import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenu } from '../../../services/dropdown_service';
import { Surveys } from '../../../shared/services/surveys';
import { DaysLeftPipe } from '../../../shared/pipes/pipes';
import { RouterLink } from '@angular/router';
import { Service } from '../../../services/service';

@Component({
  selector: 'app-surveyslist',
  imports: [CommonModule, DaysLeftPipe, RouterLink],
  templateUrl: './surveyslist.html',
  styleUrl: './surveyslist.scss',
})


export class Surveyslist {
  surveyService = inject(Surveys);
  dropdownMenu = inject(DropdownMenu);
  service = inject(Service);
  list = this.surveyService.surveyslist;
  selectedActive = signal(true);
  selectedPast = signal(false);
  selectedCategory = signal('');


  cardlist = computed(() => {
    let active = this.selectedActive();
    let past = this.selectedPast();
    let category = this.selectedCategory();
    let surveys = this.list();
    return surveys.filter(item => {
      let days = this.service.getDaysLeft(item.date);
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

  filterCategory(item: string) {
    this.selectedCategory.set(item);
  }

  resetFilter() {
    this.selectedCategory.set('');
    this.dropdownMenu.dropdownText.set('');
  }
}
