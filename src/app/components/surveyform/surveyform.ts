import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../services/service';
import { DropdownMenu } from '../../services/dropdown_service';

@Component({
  selector: 'app-surveyform',
  imports: [CommonModule],
  templateUrl: './surveyform.html',
  styleUrl: './surveyform.scss',
})
export class Surveyform {
  path = "";
  bgHome = inject(Service);
  dropdownMenu = inject(DropdownMenu);
  formOpen = true

  ngOnInit() {
    let currentBg = this.bgHome.setSecondary()
    if (currentBg!) this.path = currentBg
  }

  closeForm() { }

  onSubmit() {
    // TODO: Use output() with form value
    console.warn();
  }
}
