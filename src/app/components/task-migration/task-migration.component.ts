import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {DarkModeService} from '../../services/dark-mode.service';
import {Task} from '../../interfaces/task';
import {TasksService} from '../../services/tasks.service';
import {Router} from '@angular/router';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-task-migration',
  imports: [
    NgClass
  ],
  templateUrl: './task-migration.component.html',
  styleUrl: './task-migration.component.css'
})
export class TaskMigrationComponent implements OnInit{

  private tasks: Task[] = []
  public tasksCount: number = 0;
  public currentTaskID: number = 0;
  public currentTaskDescription: string = '';

  protected secret: string|undefined;

  constructor(private darkModeService: DarkModeService,
              private tasksService: TasksService,
              private accountService: AccountService,
              private router: Router) {
  }

  loadSecret(): void {
    this.secret = this.accountService.getSecret()
  }


  // Define the sleep function
  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Encrypts a string with a given secret key
   * @param text The string to encrypt
   * @returns Promise with the encrypted string (base64 encoded)
   */
  private async encryptTaskDesk(text: string): Promise<string> {

    const secretKey = this.secret || '';

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



  migrateTasks() {
    this.currentTaskID = 0;
    this.loadSecret()
    const processTasks = async () => {
      for(let i = 0; i < this.tasks.length; i++) {
        this.currentTaskID = i + 1;
        this.currentTaskDescription = this.tasks[i].description || 'Processing task...';

        // Include function to encrypt tasks with user secret
        this.tasks[i].description = await this.encryptTaskDesk(this.currentTaskDescription);
        this.tasksService.updateTask(this.tasks[i]);

        // Simulate task processing with a delay
        await this.sleep(1000); // Adjust the time as needed for each task
      }

      // Final delay after all tasks complete
      await this.sleep(2500);
      console.log('Migration completed');
      void this.router.navigate(['/']);
      // Add your post-migration logic here
    };

    // Start the migration process
    processTasks();

  }


  get progress(): number {
    return Number(((this.currentTaskID / this.tasksCount) * 100).toFixed(0));
  }


  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
    this.tasksCount = this.tasks.length;
    this.migrateTasks(); // Start migration when component initializes
  }
}
