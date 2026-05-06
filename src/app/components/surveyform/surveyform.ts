import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../../services/service';

@Component({
  selector: 'app-surveyform',
  imports: [],
  templateUrl: './surveyform.html',
  styleUrl: './surveyform.scss',
})
export class Surveyform {
  route = inject(ActivatedRoute);
  path = inject(Service);


  ngOnInit() {
    // let currentPath = this.route.snapshot.paramMap.get("form");
    // if (currentPath) this.path.path = currentPath;
    // console.log(this.path);
  }
}
