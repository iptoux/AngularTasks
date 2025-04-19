import {Component, HostListener, inject, Input, OnInit} from '@angular/core';
import {VersionService} from '../../services/version.service';
import {AnnouncementService} from '../../services/announcement.service';
import {Announcement} from '../../interfaces/announcement';
import {FormsModule} from '@angular/forms';
import {SettingsService} from '../../services/settings.service';
import {Settings} from '../../interfaces/settings'
import {NgClass} from '@angular/common';
import {DarkModeService} from '../../services/dark-mode.service';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from '../../services/modal.service';
import {TasksService} from '../../services/tasks.service';
import {NotificationService} from '../../services/notification.service';
import {Account} from '../../interfaces/account';


@Component({
  selector: 'app-footer',
  imports: [
    FormsModule,
    NgClass,
    NgbTooltip
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

  notificationService = inject(NotificationService)

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
              private settingsService: SettingsService,
              private darkModeService: DarkModeService,
              private modalService: ModalService,
              private tasksService: TasksService) {}

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }


  addAnnouncement(type: string, title: string, description: string): void {
    const announcement: Announcement = {
      type: type,
      title: title,
      Description: description,
      isRead: false
    };

    this.announcementService.addAnnouncement(announcement);
  }

  showHelpModal() {
    this.modalService.showInfoModal(
      "Help",
      "This is a simple Help Modal",
    )
  }

  addUpdateAnnouncement(): void {
    this.addAnnouncement(
      'update',
      `New Version Available [${this.latestVersion}] now!`,
      `You are currently using version ${this.version}.`
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
  @Input() useraccount!: Account|undefined;

  getUserAvatar(): string {
    if (!this.useraccount?.avatar) {
      return 'assets/default-avatar.png'; // Default avatar path
    }

    // If the avatar is already a data URL, return it directly
    if (this.useraccount.avatar.startsWith('data:')) {
      return this.useraccount.avatar;
    }

    // Otherwise, try to decode it (if it's just a base64 string without the data URL prefix)
    try {
      return this.decodeBase64(this.useraccount.avatar);
    } catch (error) {
      console.error('Error getting user avatar:', error);
      return 'assets/default-avatar.png';
    }
  }

  decodeBase64(base64String?: string): string {
    if (!base64String) {
      return 'assets/default-avatar.png';
    }

    // If it's already a data URL, return it
    if (base64String.startsWith('data:')) {
      return base64String;
    }

    try {
      // Try to convert a plain base64 string to a data URL
      // This assumes the base64String is just the encoded data without the data URL prefix
      return `data:image/jpeg;base64,${base64String}`;
    } catch (error) {
      console.error('Error decoding Base64 string:', error);
      return 'assets/default-avatar.png';
    }
  }



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

  removeUserData() {
    this.modalService.showConfirmModal(
      "Delete User Data",
      "Are you sure you want to delete all your user data?"
    ).then(confirmed => {
      if (confirmed) {
        console.log('User confirmed deletion');
        this.tasksService.clearAllTasks();
        localStorage.removeItem('AGTASKS_SETTINGS')
        localStorage.removeItem('AGTASKS_ANNOUNCEMENTS')
        localStorage.removeItem('AGTASKS_ACCOUNT')
        this.notificationService.addNotification(
          'Success!',
          'All your user data has been deleted.')
        // this.addAnnouncement(
        //   'success',
        //   'Success!',
        //   'All your user data has been deleted.'
        // );
      } else {
        console.log('User canceled deletion');
        this.notificationService.addNotification(
          'Cancelled!',
          'No user data has been deleted.')
      }
    });
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

    if(this.checkForUpdatesEnabled) {
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
}
