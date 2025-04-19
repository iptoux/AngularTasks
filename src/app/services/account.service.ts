import { Injectable } from '@angular/core';
import {Account} from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private account: Account|undefined;

  constructor() { }

  createAccount(account: Account) {
    this.account = account;
    if (!account.offline) {
      this.createRemoteAccount();
    } else {
      this.createLocalAccount();
    }
  }

  private createLocalAccount() {
    console.log('Creating local account');
    console.log(this.account);
  }

  private createRemoteAccount() {

  }


}
