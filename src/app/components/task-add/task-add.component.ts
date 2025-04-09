import { Component } from '@angular/core';
import { Task} from '../../interfaces/task';
import { TasksService} from '../../services/tasks.service';
import {FormsModule} from '@angular/forms';
import {DarkModeService} from '../../services/dark-mode.service';
import {NgClass} from '@angular/common';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-task-add',
  imports: [
    FormsModule,
    NgClass,
    NgbTooltip
  ],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {

  constructor(private tasksService: TasksService,
              private darkModeService: DarkModeService) {
  }

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }

  addTask(taskDescription:string) {

    let new_id = this.tasksService.getLastID() + 1;

    let task: Task = {
      id: new_id,
      description: taskDescription,
      completed: false,
      order: new_id
    }

    this.tasksService.addTask(task);

  }

}
