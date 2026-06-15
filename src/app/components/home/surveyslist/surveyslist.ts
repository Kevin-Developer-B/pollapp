import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenu } from '../../../services/dropdown_service';

@Component({
  selector: 'app-surveyslist',
  imports: [CommonModule],
  templateUrl: './surveyslist.html',
  styleUrl: './surveyslist.scss',
})


export class Surveyslist {

  dropdownMenu = inject(DropdownMenu);

  selectedActive: string = "active";
  selectedCategory: string = "";



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
}
