import {Component, inject} from '@angular/core';
import { Task} from '../../interfaces/task';
import { TasksService} from '../../services/tasks.service';
import {FormsModule} from '@angular/forms';
import {DarkModeService} from '../../services/dark-mode.service';
import {NgClass} from '@angular/common';
import {NgbDatepickerModule, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from '../../services/modal.service';


@Component({
  selector: 'app-task-add',
  imports: [
    NgbDatepickerModule,
    FormsModule,
    NgClass,
    NgbTooltip,
  ],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {
  selectedDateTime: string = new Date().toISOString().slice(0, 16); // Format: "YYYY-MM-DDThh:mm"

  modalService = inject(ModalService)

  constructor(private tasksService: TasksService,
              private darkModeService: DarkModeService) {
  }

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }

  addTask(taskDescription:string) {

    if(taskDescription.length === 0) {
      // console.log("Empty task description");
      this.modalService.showErrorModal(
        "Empty task description",
        "Please enter a task description",
        {showCloseButton:false})
      return;
    }


    let new_id = this.tasksService.getLastID() + 1;

    const options = {
      notify: false,
      notified: false,
      auto_remove: false,
    }

    let task: Task = {
      id: new_id,
      description: taskDescription,
      completed: false,
      dueDate: new Date(this.selectedDateTime),
      options: options,
      order: new_id
    }

    this.tasksService.addTask(task);

  }

}
