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

  /**
   * Resizes an image to 128x128 pixels and returns it as a data URL
   * @param imageDataUrl The original image data URL
   * @returns Promise with the resized image data URL
   */
  resizeAvatar(imageDataUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // Create a canvas element to resize the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set target dimensions
        canvas.width = 128;
        canvas.height = 128;

        if (ctx) {
          // Draw the image with the new dimensions
          ctx.drawImage(img, 0, 0, 128, 128);

          // Get the resized image as a data URL (same type as original)
          const format = imageDataUrl.split(';')[0].split(':')[1] || 'image/jpeg';
          const resizedDataUrl = canvas.toDataURL(format, 0.9); // 0.9 quality
          resolve(resizedDataUrl);
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      // Set the source of the image to the data URL
      img.src = imageDataUrl;
    });
  }



  async createAccount(account: Account) {
    // If there's an avatar, resize it
    if (account.avatar) {
      try {
        account.avatar = await this.resizeAvatar(account.avatar);
      } catch (error) {
        console.error('Failed to resize avatar:', error);
        this.notificationService.addNotification('Warning', 'Failed to resize avatar. Using original image.');
      }
    }

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

  loadLocalAccount(): Account|undefined {
    this.account = JSON.parse(localStorage.getItem('AGTASKS_ACCOUNT') || '{}');
    return this.account;
  }
}
