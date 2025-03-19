import {Component, OnInit} from '@angular/core';
import { TasksService} from '../../services/tasks.service';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-filter-controls',
  imports: [
    NgClass
  ],
  templateUrl: './filter-controls.component.html',
  styleUrl: './filter-controls.component.css'
})
export class FilterControlsComponent implements OnInit {

  filterType: number = -1;

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.filterType = this.tasksService.getFilterType();
  }

  filter_by_completed() {
    this.filterType = 1;
    this.tasksService.setFilter(this.filterType)
    this.tasksService.getTasks();
  }

  filter_by_incomplete() {
    this.filterType = 0;
    this.tasksService.setFilter(this.filterType)
    this.tasksService.getTasks();
  }

  clearFilter() {
    this.filterType = -1;
    this.tasksService.clearFilter();
    this.tasksService.getTasks();
  }


}
