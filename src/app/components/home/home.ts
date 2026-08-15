import { Component, inject } from '@angular/core';
import { FeedbackAndIdea } from './feedback-and-idea/feedback-and-idea';
import { Surveyslist } from './surveyslist/surveyslist';
import { Service } from '../../services/service';
import { EndSurveView } from "./end-surve-view/end-surve-view";

@Component({
  selector: 'app-home',
  imports: [FeedbackAndIdea, Surveyslist, EndSurveView],
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
