import {Component, OnDestroy, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {Subscription} from 'rxjs';
import {Task} from '../../interfaces/task';
import {NgClass} from '@angular/common';
import {DarkModeService} from '../../services/dark-mode.service';

@Component({
  selector: 'app-todo-progressbar',
  imports: [
    NgClass
  ],
  templateUrl: './todo-progressbar.component.html',
  styleUrl: './todo-progressbar.component.css'
})
export class TodoProgressbarComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private subscription: Subscription | null = null;

  constructor(private tasksService: TasksService,
              private darkModeService: DarkModeService) {}

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }

  ngOnInit() {
    this.subscription = this.tasksService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  get progress(): number {
    let tasksCount = this.tasks.length;
    let tasksCompleted = this.tasks.filter(task => task.completed).length;

    if (tasksCount === 0) {
      return 0;
    } else if (tasksCompleted === 0) {
      return 0;
    } else {
      return Number(((tasksCompleted / tasksCount) * 100).toFixed(0));
    }
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected readonly NaN = NaN;
}

