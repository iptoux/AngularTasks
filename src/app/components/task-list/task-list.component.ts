import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-task-list',
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    CdkDrag,
    CdkDropList,
    CdkDragPlaceholder
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  private subscription: Subscription | null = null;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.subscription = this.tasksService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
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
