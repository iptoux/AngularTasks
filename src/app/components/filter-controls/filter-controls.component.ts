import {Component, OnInit} from '@angular/core';
import { TasksService} from '../../services/tasks.service';
import {NgClass} from '@angular/common';
import {DarkModeService} from '../../services/dark-mode.service';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-filter-controls',
  imports: [
    NgClass,
    NgbTooltip
  ],
  templateUrl: './filter-controls.component.html',
  styleUrl: './filter-controls.component.css'
})
export class FilterControlsComponent implements OnInit {

  filterType: number = -1;

  constructor(private tasksService: TasksService,
              private darkModeService: DarkModeService) {}

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
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
