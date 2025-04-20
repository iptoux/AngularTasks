import {Component, inject} from '@angular/core';
import { Task} from '../../interfaces/task';
import { TasksService} from '../../services/tasks.service';
import {FormsModule} from '@angular/forms';
import {DarkModeService} from '../../services/dark-mode.service';
import {NgClass} from '@angular/common';
import {NgbDatepickerModule, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from '../../services/modal.service';
import {AccountService} from '../../services/account.service';


@Component({
  selector: 'app-task-add',
  imports: [
    NgbDatepickerModule,
    FormsModule,
    NgClass,
    NgbTooltip,
  ],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {
  selectedDateTime: string = new Date().toISOString().slice(0, 16); // Format: "YYYY-MM-DDThh:mm"

  modalService = inject(ModalService)

  constructor(private tasksService: TasksService,
              private darkModeService: DarkModeService,
              private accountService: AccountService) {
  }

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }

  adjustTimezone(dateString: string): Date {
    console.log(dateString);
    return new Date(dateString);
    //return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  }

  /**
   * Encrypts a string with a given secret key
   * @param text The string to encrypt
   * @returns Promise with the encrypted string (base64 encoded)
   */
  private async encryptTaskDesk(text: string): Promise<string> {

    const secretKey = this.accountService.getSecret() || '';

    if (!text) return '';

    try {
      // Convert strings to proper format for encryption
      const textEncoder = new TextEncoder();
      const encodedText = textEncoder.encode(text);

      // Create a key from the secret
      const keyMaterial = await this.getKeyMaterial(secretKey);
      const key = await this.deriveKey(keyMaterial);

      // Generate a random initialization vector
      const iv = crypto.getRandomValues(new Uint8Array(12));

      // Encrypt the text
      const encryptedContent = await crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv
        },
        key,
        encodedText
      );

      // Combine the IV and encrypted content into a single array
      const encryptedContentArray = new Uint8Array(iv.length + encryptedContent.byteLength);
      encryptedContentArray.set(iv, 0);
      encryptedContentArray.set(new Uint8Array(encryptedContent), iv.length);

      // Convert to Base64 string for storage
      return btoa(String.fromCharCode(...encryptedContentArray));
    } catch (error) {
      console.error('Encryption error:', error);
      return '';
    }
  }

  /**
   * Helper function to generate key material from a password
   */
  private async getKeyMaterial(password: string): Promise<CryptoKey> {
    const textEncoder = new TextEncoder();
    return await crypto.subtle.importKey(
      'raw',
      textEncoder.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
  }

  /**
   * Helper function to derive an AES-GCM key from key material
   */
  private async deriveKey(keyMaterial: CryptoKey): Promise<CryptoKey> {
    // Use a salt (can be a fixed value as long as it's consistent)
    const textEncoder = new TextEncoder(); // Fixed: Define textEncoder here
    const salt = textEncoder.encode('this-is-a-fixed-salt');

    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }


  async addTask(taskDescription:string) {

    if(taskDescription.length === 0) {
      // console.log("Empty task description");
      this.modalService.showErrorModal(
        "Empty task description",
        "Please enter a task description",
        {showCloseButton:false})
      return;
    }

    let new_id = this.tasksService.getLastID() + 1;

    // Convert the datetime string to timestamp (without timezone issues)
    const timestamp = this.dateStringToTimestamp(this.selectedDateTime);

    const encryptedDescription = await this.encryptTaskDesk(taskDescription);

    const options = {
      notify: false,
      notified: false,
      auto_remove: false,
    }

      let task: Task = {
      id: new_id,
      description: encryptedDescription,
      completed: false,
      dueDate: timestamp,
      options: options,
      order: new_id
    }

    this.tasksService.addTask(task);

  }

  private dateStringToTimestamp(dateString: string): number {
    // Parse the datetime string (YYYY-MM-DDTHH:MM)
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    // Create Date object with the specific components (no timezone conversion)
    const date = new Date(year, month - 1, day, hours, minutes, 0, 0);

    // Return timestamp in milliseconds
    return date.getTime();
  }


}
