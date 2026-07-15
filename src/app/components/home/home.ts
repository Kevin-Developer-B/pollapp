import { Component, inject } from '@angular/core';
import { FeedbackAndIdea } from './feedback-and-idea/feedback-and-idea';
import { Surveys } from './surveys/surveys';
import { Surveyslist } from './surveyslist/surveyslist';
import { Service } from '../../services/service';

@Component({
  selector: 'app-home',
  imports: [FeedbackAndIdea, Surveys, Surveyslist],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  path = "";
  bgHome = inject(Service);

  ngOnInit() {
    let currentBg = this.bgHome.setPrimary()
    if(currentBg!) this.path = currentBg
  }
}
