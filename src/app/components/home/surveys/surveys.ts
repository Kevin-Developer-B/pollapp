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
}
