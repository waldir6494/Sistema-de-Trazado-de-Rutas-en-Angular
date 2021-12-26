import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() public message:string;

  constructor(
    public activeModal: NgbActiveModal,
    config: NgbModalConfig
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

}
