import { Injectable, OnDestroy, effect } from '@angular/core';
import { SettingsService } from './settings.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private readonly DARK_CLASS = 'dark-theme';

  constructor(private settingsService: SettingsService) {
    // Initialize dark mode based on current settings
    this.initDarkMode();
  }


  private initDarkMode(): void {
    const settings = this.settingsService.getSettings();

    // Apply dark mode based on current settings
    if (settings().length > 0 && settings()[0].darkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }


    // Subscribe to settings changes
    // Use effect to react to Signal changes
    const settingsSignal = this.settingsService.getSettings();
    effect(() => {
      const settings = settingsSignal();
      if (settings.length > 0) {
        if (settings[0].darkMode) {
          this.enableDarkMode();
        } else {
          this.disableDarkMode();
        }
      }
    });
  }

  toggleDarkMode(): void {
    const settings = this.settingsService.getSettings();
    if (settings().length > 0) {
      const currentSettings = [...settings()];
      currentSettings[0] = {
        ...currentSettings[0],
        darkMode: !currentSettings[0].darkMode
      };

      this.settingsService.updateSettings(currentSettings);
    }
  }


  enableDarkMode(): void {
    document.body.classList.add(this.DARK_CLASS);
    // Removed localStorage.setItem('darkMode', 'enabled');
  }


  disableDarkMode(): void {
    document.body.classList.remove(this.DARK_CLASS);
    // Removed localStorage.setItem('darkMode', 'disabled');
  }


  isDarkMode(): boolean {
    try {
      const settingsArray = this.settingsService.getSettings()();
      return settingsArray.length > 0 && Boolean(settingsArray[0]?.darkMode);
    } catch (error) {
      console.error('Error checking dark mode status:', error);
      return false; // Default fallback value
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
