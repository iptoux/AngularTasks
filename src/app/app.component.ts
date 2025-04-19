import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AnnouncementBoxComponent} from './components/announcement-box/announcement-box.component';
import {DarkModeService} from './services/dark-mode.service';
import {SettingsService} from './services/settings.service';
import {NotificationBoxComponent} from './components/notification-box/notification-box.component';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent,FooterComponent, AnnouncementBoxComponent, NotificationBoxComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'untitled1';

  private settingsService = inject(SettingsService)
  protected settings = this.settingsService.getSettings();

  private initialChoice = this.settings()[0]?.initialChoice;

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }

  get showNotifications():boolean {
    return this.settings()[0]?.showNotifications || false
  }

  constructor(
    private darkModeService: DarkModeService,
    private router: Router) {}

  ngOnInit() {
    if(this.initialChoice === undefined) {
      void this.router.navigate(['/initial-choice']);
    }
  }
}
