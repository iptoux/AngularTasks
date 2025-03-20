import {Component, OnDestroy, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {Subscription} from 'rxjs';
import {Task} from '../../interfaces/task';

@Component({
  selector: 'app-todo-progressbar',
  imports: [],
  templateUrl: './todo-progressbar.component.html',
  styleUrl: './todo-progressbar.component.css'
})
export class TodoProgressbarComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private subscription: Subscription | null = null;

  constructor(private tasksService: TasksService) {}

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
      return (tasksCompleted / tasksCount) * 100;
    }
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected readonly NaN = NaN;
}

