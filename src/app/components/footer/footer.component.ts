import {Component, HostListener, OnInit} from '@angular/core';
import {VersionService} from '../../services/version.service';
import {AnnouncementService} from '../../services/announcement.service';
import {Announcement} from '../../interfaces/announcement';
import {FormsModule} from '@angular/forms';
import {SettingsService} from '../../services/settings.service';
import {Settings} from '../../interfaces/settings'
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  notificationsEnabled = true; // assuming you have this property already
  darkModeEnabled = false;
  ProgressbarEnabled = true;
  announcementsEnabled = true;
  checkForUpdatesEnabled = true;


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
              private announcementService: AnnouncementService,
              private settingsService: SettingsService) {}

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
  toggleAnnouncements() {
    // NICHT nötig: this.announcementsEnabled = !this.announcementsEnabled;
    // Weil ngModel das schon gemacht hat
    this.updateSettings({ showAnnouncements: this.announcementsEnabled });
    console.log('Announcements toggled:', this.announcementsEnabled);
  }


  // Add this method
  toggleCheckForUpdates() {
    this.updateSettings({ checkForUpdates: this.checkForUpdatesEnabled });
    console.log('Check for updates toggled:', this.checkForUpdatesEnabled);
  }


  // Add this method
  toggleDarkMode() {
    this.updateSettings({ darkMode: this.darkModeEnabled });
    console.log('Dark mode toggled:', this.darkModeEnabled);
  }


  // Add this method
  toggleNotifications() {
    this.updateSettings({ showNotifications: this.notificationsEnabled });
    console.log('Notifications toggled:', this.notificationsEnabled);
  }


  // Add this method
  toggleProgressbar() {
    this.updateSettings({ showProgressBar: this.ProgressbarEnabled });
    console.log('Progress bar toggled:', this.ProgressbarEnabled);
  }


  // Helper method to update settings in the service
  private updateSettings(updates: Partial<Settings>): void {
    const currentSettings = this.settingsService.getSettings()();
    if (currentSettings && currentSettings.length > 0) {
      const updatedSettings = currentSettings.map((settings, index) => {
        if (index === 0) {
          // Update only the first settings object
          return { ...settings, ...updates };
        }
        return settings;
      });

      this.settingsService.updateSettings(updatedSettings);
    }
  }



  ngOnInit(): void {
    // Get current version
    this.version = this.versionService.getVersion();

    // Initialize settings from SettingsService
    const currentSettings = this.settingsService.getSettings()();
    if (currentSettings && currentSettings.length > 0) {
      const settings = currentSettings[0];
      this.darkModeEnabled = settings.darkMode ?? false;
      this.announcementsEnabled = settings.showAnnouncements ?? true;
      this.checkForUpdatesEnabled = settings.checkForUpdates ?? true;
      this.notificationsEnabled = settings.showNotifications ?? true;
      this.ProgressbarEnabled = settings.showProgressBar ?? true;
    }

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
