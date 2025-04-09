import {computed, Injectable, Signal, signal} from '@angular/core';

interface Settings {
  darkMode?: boolean;
  showAnnouncements?: boolean;
  checkForUpdates?: boolean;
  showTaskCount?: boolean;
  showProgressBar?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private storageKey = 'settings';

  // Create signals
  private settings = signal<Settings[]>([]);


  constructor() {
    this.loadSettingsFromStorage();
  }

  /**
   * Loads settings from localStorage
   */
  private loadSettingsFromStorage(): void {
    try {
      const storedSettings = localStorage.getItem(this.storageKey);
      if (storedSettings) {
        this.settings.set(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error('Error loading settings from localStorage:', error);
      this.settings.set([]);
    }
  }

  /**
   * Get all settings
   */
  getSettings(): Signal<Settings[]> {
    return this.settings.asReadonly();
  }

}
