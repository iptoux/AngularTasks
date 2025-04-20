import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DarkModeService} from '../../../services/dark-mode.service';
import {NgClass} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
  offline: boolean = false;
  accountForm: FormGroup;
  selectedFile: File | null = null;

  private localAccount: Account = {
    offline: true,
    username: ''
  };

  private onlineAccount: Account = {
    offline: false,
    username: ''
  };

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private darkModeService: DarkModeService,
              private accountService: AccountService)
  {
      this.accountForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });

    }

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }


  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitForm() {
    if (this.accountForm.valid && this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const avatar = e.target?.result as string;
        this.createAccount(
          this.accountForm.get('username')?.value,
          this.accountForm.get('password')?.value,
          this.accountForm.get('email')?.value.replace('@', '_at_').replace('.', '_dot_').replace(' ', '_'),
          avatar
        );
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      // Mark all fields as touched to trigger validation messages
      this.accountForm.markAllAsTouched();
    }
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.action = params['action'];
      this.handleAction();
    })
  }

  createAccount(name: string, password: string, email: string, avatar: string) {
    if(this.offline) {
      this.localAccount.offline = true;
      this.localAccount.username = name;
      this.localAccount.localStorageKey = password;
      this.localAccount.avatar = avatar;
      this.accountService.createAccount(this.localAccount);
    } else {
      this.onlineAccount.offline = false;
      this.onlineAccount.username = name;
      this.onlineAccount.email = email;
      this.onlineAccount.password = password;
      this.onlineAccount.avatar = avatar;
      this.accountService.createAccount(this.onlineAccount);
    }
  }

  private handleAction() {
    switch (this.action) {
      case 'local':
        console.log('Account creation mode');
        this.offline = true;
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
