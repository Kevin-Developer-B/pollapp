import { Component, inject } from '@angular/core';
import { Service } from '../../services/service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  headerLogo = inject(Service);
}
