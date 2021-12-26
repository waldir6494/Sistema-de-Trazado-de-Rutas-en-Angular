import { Injectable } from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

/* import { MatDialog, MatDialogRef } from '@angular/material/dialog'; */
import { SpinnerComponent } from './spinner.component';

@Injectable()
export class SpinnerService {


  constructor(
    /* private dialog: MatDialog */
    private modalService: NgbModal) {

  }
  start(message?:string): NgbModalRef{

    const modalRef = this.modalService.open(SpinnerComponent, {
      backdrop : 'static',
      keyboard : false,
      centered: true,
      ariaLabelledBy: 'modal-basic-title'
    });
    modalRef.componentInstance.message = message;
    return modalRef;
  }

  stop(ref: NgbModalRef) {
    ref.close();
  }
  /* 
  stop(ref: MatDialogRef<SpinnerComponent>) {
    ref.close();
  } */
}  