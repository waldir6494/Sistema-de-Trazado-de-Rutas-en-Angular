import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() public message:string;
  @Input() public state:string;
  
  constructor(
    public activeModal: NgbActiveModal,
    config: NgbModalConfig
  ) { 
    /* config.backdrop = 'static';
    config.keyboard = false; */
  }

  ngOnInit(): void {
  }

  public cerrar() {
    this.activeModal.close();
  }

}
