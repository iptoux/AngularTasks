import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DarkModeService} from '../../../services/dark-mode.service';
import {NgClass} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountService} from '../../../services/account.service';
import {Account} from '../../../interfaces/account';

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
              private darkModeService: DarkModeService,
              private accountService: AccountService) {}

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.action = params['action'];
      this.handleAction();
    })
  }

  createAccount(name:string, password:string,avatar:string) {
    const account:Account = {
      offline: true,
      username: name,
      localStorageKey: password,
      avatar: avatar,
    }
    this.accountService.createAccount(account);
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
