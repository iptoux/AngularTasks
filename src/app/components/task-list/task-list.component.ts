import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {Task} from '../../interfaces/task';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Subscription} from 'rxjs';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {DarkModeService} from '../../services/dark-mode.service';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {ClockComponent} from '../clock/clock.component';
import {ModalService} from '../../services/modal.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-task-list',
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    CdkDrag,
    CdkDropList,
    CdkDragPlaceholder,
    NgbTooltip,
    DatePipe,
    ClockComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  private subscription: Subscription | null = null;
  private notificationService = inject(NotificationService)


  constructor(private tasksService: TasksService,
              private darkModeService: DarkModeService,
              private modalService: ModalService) {}

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }

  showOptionsModal(task: Task): void {
    this.modalService.showOptionsModal(task)
      .then((updatedTask: Task) => {
        this.tasksService.updateTask(updatedTask);
      })
      .catch(() => {
        // Modal wurde geschlossen oder abgebrochen - nichts tun
      });
  }


  /**
   * Calculates the number of hours remaining until the due date
   * @param dueDate The task's due date
   * @returns The number of hours left until the due date, or 0 if the due date is in the past
   */
  calculateRemainingHours(dueDate?: Date): number {
    if (!dueDate) {
      return 0;
    }

    const now = new Date();
    const dueDateObj = new Date(dueDate);

    // If the due date is in the past, return 0
    if (dueDateObj < now) {
      return 0;
    }

    // Calculate the total time span (in milliseconds)
    const totalTimeSpan = dueDateObj.getTime() - now.getTime();

    // Convert milliseconds to hours and round to the nearest integer
    return Math.round(totalTimeSpan / (1000 * 60 * 60))

  }


  /**
   * Calculates the percentage of time remaining until the due date
   * @param dueDate The task's due date
   * @returns A number between 0 and 100 representing the percentage of time left
   */
  calculateTimeLeftPercentage(dueDate?: Date): number {
    if (!dueDate) {
      return 0;
    }

    const now = new Date();
    const dueDateObj = new Date(dueDate);

    // If the due date is in the past, return 0
    if (dueDateObj < now) {
      return 0;
    }

    // Calculate the total time span (in milliseconds)
    const totalTimeSpan = dueDateObj.getTime() - now.getTime();

    // Limit the maximum timespan to 7 days (604800000 ms)
    // This makes the progress bar more meaningful for longer tasks
    const maxTimeSpan = 30 * 24 * 60 * 60 * 1000;

    // Calculate percentage (capped at 100%)
    return Math.min(100, Math.round((totalTimeSpan / maxTimeSpan) * 100));
  }

  /**
   * Checks all tasks and creates notifications for those due within one hour
   */
  private checkTasksDueSoon(): void {
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const hours = this.calculateRemainingHours(task.dueDate);

      if (hours <= 12) {
        this.createDueSoonNotification(task);
      }
    }
  }

  /**
   * Creates a notification for a task that is due soon
   */
  private createDueSoonNotification(task: Task): void {
    if(task.options.notify && !task.options.notified && !task.completed) {
      this.notificationService.addNotification("Near deadline:",`You have less than 12 hours left for [ TaskID ${task.id} ]. Please complete it as soon as possible!`)
      task.options.notified = true;
      this.tasksService.updateTask(task);
    }
  }


  ngOnInit() {
    this.subscription = this.tasksService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.checkTasksDueSoon();
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

  removeTask(id: number): void {
    this.tasksService.removeTask(id)
  }

  updateTaskStatus(task: Task): void {
    task.completed = !task.completed;
    this.tasksService.updateTask(task);
  }

  drop(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);

    this.tasks.forEach((task, index) => {
      task.order = index;
    });
   this.tasksService.updateTasksOrderForFilter(this.tasks);
  }
}
