import { Component, OnInit } from '@angular/core';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare const google: any;

@Component({
  selector: 'app-mapa-seguimiento',
  templateUrl: './mapa-seguimiento.component.html',
  styleUrls: ['./mapa-seguimiento.component.scss']
})
export class MapaSeguimientoComponent implements OnInit {
  latitude = -16.398839298947458;
	longitude = -71.53687523018044;
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  public cerrar() {
    this.activeModal.close();
  }

}
