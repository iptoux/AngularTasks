import {Component, ViewChild, ElementRef, inject, computed} from '@angular/core';
import {AnnouncementService} from '../../services/announcement.service';
import {Announcement} from '../../interfaces/announcement';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-announcement-box',
  imports: [CommonModule],
  templateUrl: './announcement-box.component.html',
  styleUrl: './announcement-box.component.css'
})
export class AnnouncementBoxComponent {
  private announcementService = inject(AnnouncementService);

  // Update to only get unread announcements by default
  allAnnouncements = this.announcementService.getAnnouncements(true); // showOnlyUnread = true

  // Get the latest unread announcement
  latestUnreadAnnouncement = computed(() => {
    const unreadAnnouncements = this.allAnnouncements();
    return unreadAnnouncements.length > 0 ? unreadAnnouncements[unreadAnnouncements.length - 1] : undefined;
  });

  markAsRead(announcement: Announcement | undefined): void {
    this.announcementService.markAsRead(announcement);
  }

  get lastAnnouncement(): Announcement | undefined {
    const announcements = this.allAnnouncements();
    if (announcements && announcements.length > 0) {
      return announcements[announcements.length - 1];
    }
    return undefined;
  }

  @ViewChild('noAnnouncement') noAnnouncement?: ElementRef;

  ngAfterViewInit() {
    if (this.noAnnouncement) {
      console.log('No Announcements');
    }
  }
}
