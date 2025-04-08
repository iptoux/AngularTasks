import {computed, Injectable, Signal, signal} from '@angular/core';
import {Announcement} from '../interfaces/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private storageKey = 'announcements';

  // Create signals
  private announcements = signal<Announcement[]>([]);

  // Computed signal for the latest announcement
  readonly latestAnnouncement: Signal<Announcement | undefined> = computed(() => {
    const items = this.announcements();
    return items.length > 0 ? items[items.length - 1] : undefined;
  });

  constructor() {
    this.loadAnnouncementsFromStorage();
  }

  /**
   * Get all announcements
   */
  getAnnouncements(showOnlyUnread: boolean = false): Signal<Announcement[]> {
    if (!showOnlyUnread) {
      return this.announcements.asReadonly();
    }

    // Create a computed signal that filters by isRead = false (unread announcements)
    return computed(() => {
      const allAnnouncements = this.announcements();
      return allAnnouncements.filter(announcement => !announcement.isRead);
    });
  }



  /**
   * Loads announcements from localStorage
   */
  private loadAnnouncementsFromStorage(): void {
    try {
      const storedAnnouncements = localStorage.getItem(this.storageKey);
      if (storedAnnouncements) {
        this.announcements.set(JSON.parse(storedAnnouncements));
      }
    } catch (error) {
      console.error('Error loading announcements from localStorage:', error);
      this.announcements.set([]);
    }
  }

  /**
   * Saves announcements to localStorage
   */
  private saveToStorage(announcements: Announcement[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(announcements));
    } catch (error) {
      console.error('Error saving announcements to localStorage:', error);
    }
  }

  /**
   * Adds a new announcement if it doesn't already exist (checks by title)
   */
  addAnnouncement(announcement: Announcement): void {
    const currentAnnouncements = this.announcements();

    // Check if an announcement with the same title already exists
    const existingAnnouncement = currentAnnouncements.find(
      existing => existing.title === announcement.title
    );

    // Only add the announcement if it doesn't already exist
    if (!existingAnnouncement) {
      const updatedAnnouncements = [...currentAnnouncements, announcement];
      this.announcements.set(updatedAnnouncements);
      this.saveToStorage(updatedAnnouncements);
    } else {
      console.log(`Announcement with title "${announcement.title}" already exists, not adding duplicate.`);
    }
  }


  /**
   * Marks an announcement as read
   */
  markAsRead(announcement: Announcement | undefined): void {
    const currentAnnouncements = this.announcements();
    const updatedAnnouncements = currentAnnouncements.map(a =>
      a === announcement ? {...a, isRead: true} : a
    );
    this.announcements.set(updatedAnnouncements);
    this.saveToStorage(updatedAnnouncements);
  }

  /**
   * Clears all announcements
   */
  clearAnnouncements(): void {
    this.announcements.set([]);
    localStorage.removeItem(this.storageKey);
  }

}
