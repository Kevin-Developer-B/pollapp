import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-surveyslist',
  imports: [CommonModule],
  templateUrl: './surveyslist.html',
  styleUrl: './surveyslist.scss',
})


export class Surveyslist {
  selectedCategory: string = "all";
  isDropdownOpen = false;

  cardlist = [
    {
      catergory: "Team activities",
      text: "Let’s Plan the Next Team Event Together",
      day: "Ends in 1 Day"
    },
    {
      catergory: "Health & Wellness",
      text: "Fit & wellness survey!",
      day: "Ends in 2 Day"
    },
    {
      catergory: "Gaming & Entertainment",
      text: "Gaming habits and favorite games!",
      day: "Ends in 3 Day"
    },
  ]

  filterSelection(item: string) {
    this.selectedCategory = item
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
