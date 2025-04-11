import { Injectable } from '@angular/core';
import {ModalComponent} from '../components/modal/modal.component';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {OptionsModalComponent} from '../components/options-modal/options-modal.component';
import {Task} from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  showSuccessModal(title: string, message: string, options?: NgbModalOptions): void {
    const defaultOptions: NgbModalOptions = { centered: true };
    const modalOptions = { ...defaultOptions, ...options };

    const modalRef = this.modalService.open(ModalComponent, modalOptions);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = 'success';
  }

  showErrorModal(title: string, message: string, extraOptions?: {showCloseButton?: boolean}, modalOptions?: NgbModalOptions): void {
    const defaultOptions: NgbModalOptions = { centered: true, windowClass: 'success-modal', backdropClass:'custom-backdrop',modalDialogClass: 'modal-success', keyboard: false};
    const finalModalOptions = {...defaultOptions, ...modalOptions};

    const modalRef = this.modalService.open(ModalComponent, finalModalOptions);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = 'error';

    if (extraOptions && extraOptions.showCloseButton !== undefined) {
      modalRef.componentInstance.showCloseButton = extraOptions.showCloseButton;
    }
  }

  showInfoModal(title: string, message: string, options?: NgbModalOptions): void {
    const defaultOptions: NgbModalOptions = { centered: true };
    const modalOptions = { ...defaultOptions, ...options };

    const modalRef = this.modalService.open(ModalComponent, modalOptions);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = 'info';
  }

  showConfirmModal(title: string, message: string, extraOptions?: {showCloseButton?: boolean}, modalOptions?: NgbModalOptions): Promise<boolean> {
    const defaultOptions: NgbModalOptions = { centered: true };
    const finalModalOptions = {...defaultOptions, ...modalOptions};

    const modalRef = this.modalService.open(ModalComponent, finalModalOptions);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = 'confirmation';
    modalRef.componentInstance.showConfirmButtons = true;
    modalRef.componentInstance.showCloseButton = false;

    if (extraOptions && extraOptions.showCloseButton !== undefined) {
      modalRef.componentInstance.showCloseButton = extraOptions.showCloseButton;
    }

    return modalRef.result.then(
      (result) => result === 'yes',
      () => false // Handles dismiss cases (like clicking outside the modal)
    );
  }

  showOptionsModal(task: Task, modalOptions?: NgbModalOptions): Promise<Task> {
    const defaultOptions: NgbModalOptions = { centered: true };
    const finalModalOptions = {...defaultOptions, ...modalOptions};

    const modalRef = this.modalService.open(OptionsModalComponent, finalModalOptions);
    modalRef.componentInstance.task = task;

    return modalRef.result;
  }

}
