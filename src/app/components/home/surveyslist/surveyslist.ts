import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-surveyslist',
  imports: [CommonModule],
  templateUrl: './surveyslist.html',
  styleUrl: './surveyslist.scss',
})


export class Surveyslist {
  selectedCategory: string = "active";
  isDropdownOpen = false;
  dropdownText = signal("")

  cardlist = [
    {
      catergory: "Team activities",
      text: "Let’s Plan the Next Team Event Together",
      day: "1"
    },
    {
      catergory: "Health & Wellness",
      text: "Fit & wellness survey!",
      day: "2"
    },
    {
      catergory: "Gaming & Entertainment",
      text: "Gaming habits and favorite games!",
      day: "3"
    },
  ]

  filterSelection(item: string) {
    this.selectedCategory = item
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  activeCategory() {

  }
}
