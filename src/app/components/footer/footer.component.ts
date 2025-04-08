import {Component, OnInit} from '@angular/core';
import {VersionService} from '../../services/version.service';
import {AnnouncementService} from '../../services/announcement.service';
import {Announcement} from '../../interfaces/announcement';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  version: string = '';
  updateAvailable: boolean = false;
  latestVersion: string | null = null;


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
