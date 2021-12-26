import { Injectable } from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

/* import { MatDialog, MatDialogRef } from '@angular/material/dialog'; */
import { AlertComponent } from './alert.component';

@Injectable()
export class AlertService {
    constructor(
        /* private dialog: MatDialog */
        private modalService: NgbModal) {
    
      }
      start(message?:string, state?:string, time?:any){
    
        const modalRef = this.modalService.open(AlertComponent, {
          centered: true,
          ariaLabelledBy: 'modal-basic-title'
        });
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.state = state;
        
        setTimeout(() => {
            modalRef.close();
        }, time? time: 5000);

      }
}
