import { Component, inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-survey',
  imports: [],
  templateUrl: './survey.html',
  styleUrl: './survey.scss',
})
export class Survey {
  userId: string | null;
  private route = inject(ActivatedRoute);

  constructor() {
    this.userId = this.route.snapshot.paramMap.get('myVar');
    console.log(this.userId);
    
  }
}
