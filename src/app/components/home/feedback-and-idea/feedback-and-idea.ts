import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-feedback-and-idea',
  imports: [RouterLink],
  templateUrl: './feedback-and-idea.html',
  styleUrl: './feedback-and-idea.scss',
})
export class FeedbackAndIdea {
  routes = inject(Router);
}
