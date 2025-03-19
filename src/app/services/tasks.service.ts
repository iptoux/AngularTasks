import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [];
  private filteredTasks: Task[] = [];
  private filterType: number = -1;

  // BehaviorSubject für die aktuelle Taskliste
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  // Observable, das Komponenten abonnieren können
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasks();
  }

  private applyFilter() {
    if (this.filterType === 1) {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else if (this.filterType === 0) {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    } else {
      this.filteredTasks = [...this.tasks];
    }

    this.tasksSubject.next(this.getFilteredTasks());
  }

  private loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks) as Task[];
      this.tasks.forEach((task, index) => {
        if (task.order === undefined) {
          task.order = index;
        }
      });
      this.tasks.sort((a, b) => a.order - b.order);
      this.applyFilter();
    }
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private getFilteredTasks() {
    return this.filterType === -1 ? [...this.tasks] : [...this.filteredTasks];
  }

  getTasks() {
    return this.getFilteredTasks();
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.saveTasks();
    this.applyFilter();
  }

  removeTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks();
    this.applyFilter();
  }

  updateTask(updatedTask: Task): void {
    const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].completed = updatedTask.completed;
      this.saveTasks();
      this.applyFilter();
    }
  }

  updateTasksOrder(updatedTasks: Task[]): void {
    this.tasks = updatedTasks;
    this.saveTasks();
    this.applyFilter();
  }

  updateTasksOrderForFilter(filteredTasks: Task[]): void {
    if (this.filterType === -1) {
      this.tasks = filteredTasks;
    } else {
      for (let updatedTask of filteredTasks) {
        const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
        if (taskIndex !== -1) {
          this.tasks[taskIndex].order = updatedTask.order;
        }
      }
      this.tasks.sort((a, b) => a.order - b.order);
    }
    this.saveTasks();
    this.applyFilter();
  }


  getFilterType() {
    return this.filterType;
  }

  setFilter(filterBy: number) {
    this.filterType = filterBy;
    this.applyFilter();
  }

  clearFilter() {
    this.filterType = -1;
    this.applyFilter();
  }
}
