import {Component, inject} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {FilterControlsComponent} from './components/filter-controls/filter-controls.component';
import {TaskAddComponent} from './components/task-add/task-add.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {TodoProgressbarComponent} from './components/todo-progressbar/todo-progressbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {AnnouncementBoxComponent} from './components/announcement-box/announcement-box.component';
import {DarkModeService} from './services/dark-mode.service';
import {SettingsService} from './services/settings.service';
import {NotificationBoxComponent} from './components/notification-box/notification-box.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FilterControlsComponent, TaskAddComponent, TaskListComponent, TodoProgressbarComponent, FooterComponent, AnnouncementBoxComponent, NotificationBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'untitled1';

  private settingsService = inject(SettingsService)
  protected settings = this.settingsService.getSettings();

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }

  get showProgressBar():boolean {
    return this.settings()[0]?.showProgressBar || false
  }

  constructor(private darkModeService: DarkModeService) {}

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

}
