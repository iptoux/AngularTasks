import { Injectable } from '@angular/core';
import {ModalComponent} from '../components/modal/modal.component';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

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



  showErrorModal(title: string, message: string, options?: NgbModalOptions): void {
    const defaultOptions: NgbModalOptions = { centered: true };
    const modalOptions = { ...defaultOptions, ...options };

    const modalRef = this.modalService.open(ModalComponent, modalOptions);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = 'error';
  }


  showInfoModal(title: string, message: string, options?: NgbModalOptions): void {
    const defaultOptions: NgbModalOptions = { centered: true };
    const modalOptions = { ...defaultOptions, ...options };

    const modalRef = this.modalService.open(ModalComponent, modalOptions);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = 'info';
  }
}
