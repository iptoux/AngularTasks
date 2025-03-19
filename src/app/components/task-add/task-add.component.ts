import { Component } from '@angular/core';
import { Task} from '../../interfaces/task';
import { TasksService} from '../../services/tasks.service';


@Component({
  selector: 'app-task-add',
  imports: [],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {

  constructor(private tasksService: TasksService) {
  }

  addTask(taskDescription:string) {

    let new_id = this.tasksService.getTasks().length + 1;

    let task: Task = {
      id: new_id,
      description: taskDescription,
      completed: false
    }

    this.tasksService.addTask(task);

  }

}
