import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {Task} from '../../interfaces/task';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Subscription} from 'rxjs';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {DarkModeService} from '../../services/dark-mode.service';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {ClockComponent} from '../clock/clock.component';
import {ModalService} from '../../services/modal.service';
import {NotificationService} from '../../services/notification.service';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-task-list',
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    CdkDrag,
    CdkDropList,
    CdkDragPlaceholder,
    NgbTooltip,
    DatePipe,
    ClockComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  private subscription: Subscription | null = null;
  private notificationService = inject(NotificationService)


  constructor(private tasksService: TasksService,
              private darkModeService: DarkModeService,
              private modalService: ModalService,
              private accountService: AccountService) {}

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }

  showOptionsModal(task: Task): void {
    this.modalService.showOptionsModal(task)
      .then((updatedTask: Task) => {
        this.tasksService.updateTask(updatedTask);
      })
      .catch(() => {
        // Modal wurde geschlossen oder abgebrochen - nichts tun
      });
  }

  public async decryptTask(string: string): Promise<string> {
    return await this.decryptTaskDesk(string);
  }

  /**
   * Decrypts an encrypted string with the same secret key used for encryption
   * @param encryptedText The encrypted string (base64 encoded)
   * @returns Promise with the decrypted string
   */
  private async decryptTaskDesk(encryptedText: string): Promise<string> {
    const secretKey:string = this.accountService.getSecret()

    if (!encryptedText) return '';

    try {
      // Convert the base64 string back to array
      const encryptedData = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));

      // Extract the IV (first 12 bytes)
      const iv = encryptedData.slice(0, 12);

      // Extract the encrypted content (everything except first 12 bytes)
      const encryptedContent = encryptedData.slice(12);

      // Create a key from the secret
      const keyMaterial = await this.getKeyMaterial(secretKey);
      const key = await this.deriveKey(keyMaterial);

      // Decrypt the content
      const decryptedContent = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv
        },
        key,
        encryptedContent
      );

      // Convert the decrypted content back to string
      const textDecoder = new TextDecoder();
      return textDecoder.decode(decryptedContent);
    } catch (error) {
      console.error('Decryption error:', error);
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


  /**
   * Calculates the number of hours remaining until the due date
   * @param dueDate The task's due date
   * @returns The number of hours left until the due date, or 0 if the due date is in the past
   */
  calculateRemainingHours(dueDate?: number): number {
    if (!dueDate) {
      return 0;
    }

    const now = new Date().getTime();

    // If the due date is in the past, return 0
    if (dueDate < now) {
      return 0;
    }

    // Calculate the total time span (in milliseconds)
    const totalTimeSpan = dueDate - now;

    // Convert milliseconds to hours and round to the nearest integer
    return Math.round(totalTimeSpan / (1000 * 60 * 60));
  }

  /**
   * Checks all tasks and creates notifications for those due within one hour
   */
  private checkTasksDueSoon(): void {
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const hours = this.calculateRemainingHours(task.dueDate);

      if (hours <= 12) {
        this.createDueSoonNotification(task);
      }
    }
  }

  /**
   * Creates a notification for a task that is due soon
   */
  private createDueSoonNotification(task: Task): void {
    if(task.options.notify && !task.options.notified && !task.completed) {
      this.notificationService.addNotification("Near deadline:",`You have less than 12 hours left for [ TaskID ${task.id} ]. Please complete it as soon as possible!`)
      task.options.notified = true;
      this.tasksService.updateTask(task);
    }
  }


  ngOnInit() {
    this.subscription = this.tasksService.tasks$.subscribe(async tasks => {
      this.tasks = tasks;
      for (const task of this.tasks) {
        task.decryptedDescription = await this.decryptTaskDesk(task.description);
      }
      this.checkTasksDueSoon();
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

  removeTask(id: number): void {
    this.tasksService.removeTask(id)
  }

  updateTaskStatus(task: Task): void {
    task.completed = !task.completed;
    this.tasksService.updateTask(task);
  }

  drop(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);

    this.tasks.forEach((task, index) => {
      task.order = index;
    });
   this.tasksService.updateTasksOrderForFilter(this.tasks);
  }
}
