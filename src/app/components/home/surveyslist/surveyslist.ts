import { Component, inject, signal } from '@angular/core';
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
  selectedActive: string = "active";
  selectedCategory: string = "";

  cardlist = [...this.list()];


  filterSelection(item: string) {
    this.selectedActive = item;
  }

  filterCategory(item: string) {
    this.selectedCategory = item;
  }

  resetFilter() {
    this.selectedActive = 'active';
    this.selectedCategory = '';
  }
}
