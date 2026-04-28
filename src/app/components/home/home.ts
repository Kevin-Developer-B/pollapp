import { Component } from '@angular/core';
import { FeedbackAndIdea } from './feedback-and-idea/feedback-and-idea';

@Component({
  selector: 'app-home',
  imports: [FeedbackAndIdea],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
