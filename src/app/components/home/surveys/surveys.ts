import { Component } from '@angular/core';

@Component({
  selector: 'app-surveys',
  imports: [],
  templateUrl: './surveys.html',
  styleUrl: './surveys.scss',
})
export class Surveys {
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
}
