import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit
{
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'confirmation' = 'info';  // Updated to include 'confirmation'
  @Input() showCloseButton: boolean = true;
  @Input() buttonClass: string = '';
  @Input() showConfirmButtons: boolean = false;


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close('close');
  }

  confirm(result: 'yes' | 'no'): void {
    this.activeModal.close(result);
  }

}
