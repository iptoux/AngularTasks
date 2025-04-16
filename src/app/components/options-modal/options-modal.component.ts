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
    this.optionsForm = this.fb.group({
      description: [this.task?.description || '', Validators.required],
      completed: [this.task?.completed || false],
      dueDate: [this.task?.dueDate ? new Date(this.task.dueDate).toISOString().slice(0, 16) : ''],
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
      const updatedTask: Task = {
        ...this.task,
        description: this.optionsForm.value.description,
        completed: this.optionsForm.value.completed,
        dueDate: this.optionsForm.value.dueDate ? new Date(this.optionsForm.value.dueDate) : undefined,
        order: this.optionsForm.value.order,
        options: this.optionsForm.value.options
      };
      this.activeModal.close(updatedTask);
    }
  }

}

