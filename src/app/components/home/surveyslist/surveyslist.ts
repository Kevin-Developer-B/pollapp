import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-surveyslist',
  imports: [CommonModule],
  templateUrl: './surveyslist.html',
  styleUrl: './surveyslist.scss',
})


export class Surveyslist {
  selectedActive: string = "active";
  selectedCategory: string = "";
  isDropdownOpen = false;
  dropdownText = signal("")

  allCards = [
    {
      catergory: "Team activities",
      text: "Let’s Plan the Next Team Event Together",
      day: "1",
      stood: "past"
    },
    {
      catergory: "Health & Wellness",
      text: "Fit & wellness survey!",
      day: "2",
      stood: "active"
    },
    {
      catergory: "Gaming & Entertainment",
      text: "Gaming habits and favorite games!",
      day: "3",
      stood: "active"
    },
  ]

  cardlist = [...this.allCards];

  ngOnInit() {
    this.filterSelection('active')
  }

  filterSelection(item: string) {
    this.selectedActive = item
    let card = this.allCards.filter(card => card.stood == item)
    if (card) this.cardlist = card
  }

  filterCategory(item: string) {
    this.selectedCategory = item
    let card = this.allCards.filter(card => card.catergory == item)
    if (card) this.cardlist = card
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // setActiveCategory(name: string) {
  //   let tmpCard = this.cardlist.find(card => card.catergory == name)
  // }
}
