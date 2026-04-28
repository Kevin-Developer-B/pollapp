import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback-and-idea',
  imports: [],
  templateUrl: './feedback-and-idea.html',
  styleUrl: './feedback-and-idea.scss',
})
export class FeedbackAndIdea {
  path = "";
  text = "New survey"

  ngOnInit() {
    this.path = ""
  }
}
