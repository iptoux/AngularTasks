import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DarkModeService} from '../../../services/dark-mode.service';
import {NgClass} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-account',
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent implements OnInit {
  action:string = '';

  constructor(private route: ActivatedRoute,
              private darkModeService: DarkModeService,) {}

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.action = params['action'];
      this.handleAction();
    })
  }

  private handleAction() {
    switch (this.action) {
      case 'local':
        console.log('Account creation mode');
        // Initialize form for creation
        break;
      case 'online':
        console.log('Account editing mode');
        // Load account data and initialize form for editing
        break;
      default:
        console.log('Unknown action:', this.action);
      // Handle unknown action
    }
  }
}
