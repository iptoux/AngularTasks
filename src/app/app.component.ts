import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {FilterControlsComponent} from './components/filter-controls/filter-controls.component';
import {TaskAddComponent} from './components/task-add/task-add.component';
import {TaskListComponent} from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FilterControlsComponent, TaskAddComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'untitled1';
}
