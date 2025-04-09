import {Injectable, Signal, signal} from '@angular/core';
import {Settings} from '../interfaces/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private storageKey = 'AGTASKS_SETTINGS';

  // Create signals
  private settings = signal<Settings[]>([]);


  constructor() {
    this.initializeDefaultSettings();
    this.loadSettingsFromStorage();
  }

  /**
   * Initializes default settings in localStorage if none exist
   */
  private initializeDefaultSettings(): void {
    try {
      const storedSettings = localStorage.getItem(this.storageKey);
      if (!storedSettings) {
        // No settings found in localStorage, create and save default settings
        const defaultSettings = [this.getDefaultSettings()];
        this.saveToStorage(defaultSettings);
      }
    } catch (error) {
      console.error('Error checking for existing settings:', error);
    }
  }

  /**
   * Loads settings from localStorage
   */
  private loadSettingsFromStorage(): void {
    try {
      const storedSettings = localStorage.getItem(this.storageKey);
      if (storedSettings) {
        this.settings.set(JSON.parse(storedSettings));
      } else {
        // If still no settings, use default settings
        this.settings.set([this.getDefaultSettings()]);
      }
    } catch (error) {
      console.error('Error loading settings from localStorage:', error);
      this.settings.set([this.getDefaultSettings()]);
    }
  }


  private saveToStorage(settings: Settings[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
    }
  }

  /**
   * Updates settings and saves to localStorage
   */
  updateSettings(newSettings: Settings[]): void {
    this.settings.set(newSettings);
    this.saveToStorage(newSettings);
  }


  /**
   * Get all settings
   */
  getSettings(): Signal<Settings[]> {
    return this.settings.asReadonly();
  }

  /**
   * Returns default settings object
   */
  private getDefaultSettings(): Settings {
    return {
      darkMode: false,
      showAnnouncements: true,
      checkForUpdates: true,
      showTaskCount: true,
      showNotifications: true,
      showProgressBar: true
    };
  }
}
