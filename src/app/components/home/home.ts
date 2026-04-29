import { Component } from '@angular/core';
import { FeedbackAndIdea } from './feedback-and-idea/feedback-and-idea';
import { Surveys } from './surveys/surveys';
import { Surveyslist } from './surveyslist/surveyslist';

@Component({
  selector: 'app-home',
  imports: [FeedbackAndIdea, Surveys, Surveyslist],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
