import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../services/service';
import { DropdownMenu } from '../../services/dropdown_service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-surveyform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './surveyform.html',
  styleUrl: './surveyform.scss',
})
export class Surveyform {
  bgHome = inject(Service);
  dropdownMenu = inject(DropdownMenu);
  router = inject(Router);
  formOpen = true
  path = "";

  ngOnInit() {
    let currentBg = this.bgHome.setSecondary()
    if (currentBg!) this.path = currentBg
  }



  surveyform = new FormGroup({
    surveyname: new FormControl('', {
      validators: [Validators.required]
    }),
  })





  closeForm() {
    this.router.navigate([""]);
  }

  onSubmit() {
    // TODO: Use output() with form value

    console.warn();
  }
}
