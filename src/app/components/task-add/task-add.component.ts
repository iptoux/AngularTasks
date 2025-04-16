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

  adjustTimezone(dateString: string): Date {
    console.log(dateString);
    return new Date(dateString);
    //return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
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

    // Convert the datetime string to timestamp (without timezone issues)
    const timestamp = this.dateStringToTimestamp(this.selectedDateTime);

    const options = {
      notify: false,
      notified: false,
      auto_remove: false,
    }

      let task: Task = {
      id: new_id,
      description: taskDescription,
      completed: false,
      dueDate: timestamp,
      options: options,
      order: new_id
    }

    this.tasksService.addTask(task);

  }

  private dateStringToTimestamp(dateString: string): number {
    // Parse the datetime string (YYYY-MM-DDTHH:MM)
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    // Create Date object with the specific components (no timezone conversion)
    const date = new Date(year, month - 1, day, hours, minutes, 0, 0);

    // Return timestamp in milliseconds
    return date.getTime();
  }


}
