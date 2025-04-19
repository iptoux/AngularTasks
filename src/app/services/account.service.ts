import {inject, Injectable} from '@angular/core';
import {Account} from '../interfaces/account';
import {NotificationService} from './notification.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private account: Account|undefined;
  private notificationService = inject(NotificationService);

  constructor(private router: Router) { }

  createAccount(account: Account) {
    this.account = account;
    if (!account.offline) {
      this.createRemoteAccount();
    } else {
      this.createLocalAccount();
    }
  }

  private createLocalAccount() {
    localStorage.setItem('AGTASKS_ACCOUNT', JSON.stringify(this.account));
    this.notificationService.addNotification('Success', 'Account created successfully.');
    void this.router.navigate(['/']);
  }

  private createRemoteAccount() {
    console.log('Creating remote account');
    console.log('Not implemented yet.');
  }

}
