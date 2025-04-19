import {Component, inject} from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {DarkModeService} from '../../services/dark-mode.service';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-initial-choice',
  imports: [
    NgClass,
    NgOptimizedImage
  ],
  templateUrl: './initial-choice.component.html',
  styleUrl: './initial-choice.component.css'
})
export class InitialChoiceComponent {

  private readonly initialChoice: string|undefined = undefined;
  private settingsService: SettingsService = inject(SettingsService);
  private notificationService: NotificationService = inject(NotificationService);

  public countdown: number = 5;
  public showCountdown: boolean = false;

  constructor(private darkModeService: DarkModeService,private router: Router
  ) {
    this.initialChoice = this.settingsService.getSettings()()[0]?.initialChoice;
  }

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }

  isInitialChoice(): boolean {
    return this.initialChoice !== undefined;
  }

  setInitialChoice(choice: string) {
    const currentSettings = this.settingsService.getSettings()();

    // Create a new settings array with the initialChoice updated
    const updatedSettings = currentSettings.map((setting, index) => {
      if (index === 0) {
        // Update the first settings object with the new initialChoice
        return {
          ...setting,
          initialChoice: choice
        };
      }
      return setting;
    });

    // Update the settings with the new array
    this.settingsService.updateSettings(updatedSettings);
    console.log("Initial choice set to: " + choice);
    if (choice === 'offline') {
      // Redirect to home
      void this.router.navigate(['/account/create/local']);
    } else if(choice === 'online') {
      console.log("Online mode not implemented yet.")
      this.notificationService.addNotification("Info:", "Online mode not implemented yet.");

      // sleep and show countdown 5 sec
      this.showCountdown = true;
      const intervalId = setInterval(() => {
        this.countdown--;

        if (this.countdown <= 0) {
          clearInterval(intervalId);
          window.location.href = '/';
        }
      }, 1000);
    }

  }

}
