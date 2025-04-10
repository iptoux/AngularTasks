import { Component } from '@angular/core';
import {NgClass} from '@angular/common';
import {DarkModeService} from '../../services/dark-mode.service';

@Component({
  selector: 'app-header',
  imports: [
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private darkModeService: DarkModeService) {}

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }
}
