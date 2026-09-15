import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenu } from '../../../services/dropdown_service';
import { Surveys } from '../../../shared/services/surveys';
import { DaysLeftPipe } from '../../../shared/pipes/pipes';

@Component({
  selector: 'app-surveyslist',
  imports: [CommonModule, DaysLeftPipe],
  templateUrl: './surveyslist.html',
  styleUrl: './surveyslist.scss',
})


export class Surveyslist {
  surveyService = inject(Surveys);
  list = this.surveyService.surveyslist;
  dropdownMenu = inject(DropdownMenu);
  selectedActive = signal("active");
  selectedCategory = signal('');

  private getDaysLeft(date: string | Date): number {
    const end = new Date(date);
    const today = new Date();
    const diff = end.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }


  cardlist = computed(() => {
    const active = this.selectedActive();
    const category = this.selectedCategory();
    const surveys = this.list();

    return surveys.filter(item => {
      const days = this.getDaysLeft(item.date);

      const activeCheck =
        active === 'active' ? days > 0 : days <= 0;

      const categoryCheck =
        category === '' ? true : item.category === category;

      return activeCheck && categoryCheck;
    });
  });


  filterSelection(item: string) {
    this.selectedActive.set(item);
  }

  filterCategory(item: string) {
    this.selectedCategory.set(item);
  }

  resetFilter() {
    this.selectedCategory.set('');
    this.dropdownMenu.dropdownText.set('');
  }
}
