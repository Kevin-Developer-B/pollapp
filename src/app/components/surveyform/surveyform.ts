import { Component, inject } from '@angular/core';
import { Service } from '../../services/service';

@Component({
  selector: 'app-surveyform',
  imports: [],
  templateUrl: './surveyform.html',
  styleUrl: './surveyform.scss',
})
export class Surveyform {
  path = "";
  bgHome = inject(Service);

  ngOnInit() {
    let currentBg = this.bgHome.setSecondary()
    if (currentBg!) this.path = currentBg
  }
}
