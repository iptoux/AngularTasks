import {Component, HostListener, OnInit} from '@angular/core';
import {VersionService} from '../../services/version.service';
import {AnnouncementService} from '../../services/announcement.service';
import {Announcement} from '../../interfaces/announcement';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [
    FormsModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  version: string = '';
  updateAvailable: boolean = false;
  latestVersion: string | null = null;
  showSettingsMenu = false;
  notificationsEnabled = false; // assuming you have this property already
  darkModeEnabled = false;
  ProgressbarEnabled = true;


  toggleSettingsMenu(event: Event): void {
    event.stopPropagation();
    this.showSettingsMenu = !this.showSettingsMenu;
  }

  selectSetting(setting: string): void {
    console.log(`Selected setting: ${setting}`);
    // Implement your logic here
    this.showSettingsMenu = false;
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: MouseEvent): void {
    if (this.showSettingsMenu) {
      const settingsContainer = document.querySelector('.settings-container');
      if (settingsContainer && !settingsContainer.contains(event.target as Node)) {
        this.showSettingsMenu = false;
      }
    }
  }



  constructor(private versionService: VersionService,
              private announcementService: AnnouncementService) {}

  addAnnouncement(type: string, title: string, description: string): void {
    const announcement: Announcement = {
      type: type,
      title: title,
      Description: description,
      isRead: false
    };

    this.announcementService.addAnnouncement(announcement);
  }


  addUpdateAnnouncement(): void {
    this.addAnnouncement(
      'update',
      'New Version Available',
      `Version ${this.latestVersion} is now available! You are currently using version ${this.version}.`
    );
  }


  // Add this method
  toggleDarkMode() {
    // Your notification toggling logic here
    console.log('DarkMode toggled:', this.notificationsEnabled);

    // Example: You might want to save the setting or notify a service
    // this.userSettingsService.updateNotificationPreference(this.notificationsEnabled);
  }

  // Add this method
  toggleNotifications() {
    // Your notification toggling logic here
    console.log('Notifications toggled:', this.notificationsEnabled);

    // Example: You might want to save the setting or notify a service
    // this.userSettingsService.updateNotificationPreference(this.notificationsEnabled);
  }

  // Add this method
  toggleProgressbar() {
    // Your notification toggling logic here
    console.log('Progressbar toggled:', this.ProgressbarEnabled);

    // Example: You might want to save the setting or notify a service
    // this.userSettingsService.updateNotificationPreference(this.notificationsEnabled);
  }


  ngOnInit(): void {
    // Get current version
    this.version = this.versionService.getVersion();

    // Check for updates
    this.versionService.checkForUpdates().subscribe(result => {
      if (result.hasUpdate) {
        console.log(`Update available! Current: ${result.currentVersion}, Latest: ${result.latestVersion}`);
        this.updateAvailable = true;
        this.latestVersion = result.latestVersion;
        this.addUpdateAnnouncement()
      } else {
        console.log('No updates available');
      }
    });

  }

}
