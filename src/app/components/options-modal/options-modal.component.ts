import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../interfaces/task';
import {DarkModeService} from '../../services/dark-mode.service';

@Component({
  selector: 'app-options-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './options-modal.component.html',
  styleUrl: './options-modal.component.css'
})
export class OptionsModalComponent implements OnInit {
  @Input() task!: Task;
  optionsForm!: FormGroup;

  constructor(
    private darkModeService: DarkModeService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode();
  }

  ngOnInit(): void {
    this.initForm();
  }


  private initForm(): void {
    // Convert timestamp to date string for the form
    let dateString = '';
    if (this.task?.dueDate) {
      dateString = this.timestampToDateString(this.task.dueDate);
    }

    this.optionsForm = this.fb.group({
      description: [this.task?.description || '', Validators.required],
      completed: [this.task?.completed || false],
      dueDate: [dateString],
      order: [this.task?.order || 0],
      options: this.fb.group({
        notify: [this.task?.options?.notify || false],
        auto_remove: [this.task?.options?.auto_remove || false]
      })
    });
  }

  get description() { return this.optionsForm.get('description')!; }

  saveChanges(): void {
    if (this.optionsForm.valid) {
      let dueDate: number | undefined = undefined;

      if (this.optionsForm.value.dueDate) {
        // Convert date string back to timestamp
        dueDate = this.dateStringToTimestamp(this.optionsForm.value.dueDate);
      }

      const updatedTask: Task = {
        ...this.task,
        description: this.optionsForm.value.description,
        completed: this.optionsForm.value.completed,
        dueDate: dueDate,
        order: this.optionsForm.value.order,
        options: this.optionsForm.value.options
      };
      this.activeModal.close(updatedTask);
    }
  }
  // Helper method to convert timestamp to date string
  private timestampToDateString(timestamp: number): string {
    const date = new Date(timestamp);

    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  // Helper method to convert date string to timestamp
  private dateStringToTimestamp(dateString: string): number {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    const date = new Date(year, month - 1, day, hours, minutes, 0, 0);
    return date.getTime();
  }

}

