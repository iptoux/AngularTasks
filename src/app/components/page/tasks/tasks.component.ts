import {Component, inject} from '@angular/core';
import {FilterControlsComponent} from '../../filter-controls/filter-controls.component';
import {TaskAddComponent} from '../../task-add/task-add.component';
import {TodoProgressbarComponent} from '../../todo-progressbar/todo-progressbar.component';
import {TaskListComponent} from '../../task-list/task-list.component';
import {SettingsService} from '../../../services/settings.service';

@Component({
  selector: 'app-tasks',
  imports: [FilterControlsComponent, TaskAddComponent, TodoProgressbarComponent, TaskListComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  private settingsService = inject(SettingsService)
  protected settings = this.settingsService.getSettings();

  get showProgressBar():boolean {
    return this.settings()[0]?.showProgressBar || false
  }
}
