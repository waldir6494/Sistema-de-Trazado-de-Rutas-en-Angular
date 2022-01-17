import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Jugador } from 'src/app/@models/Jugador/jugador.model';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { JugadorService } from 'src/app/@services/Jugador/jugador.service';
import { MonitoreoService } from 'src/app/@services/Monitoreo/monitoreo.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { MapaSeguimientoComponent } from './mapa-seguimiento/mapa-seguimiento.component';
import { Tablaid } from 'src/app/@models/Monitoreo/tablaid';

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.scss'],
  providers: [JugadorService, MonitoreoService]
})
export class MonitoreoComponent implements OnInit {
  public jugadores: any;
  tablaMonitoreo:any;
  idd:Tablaid={
    idJugadores:[]
  };
  constructor(
    private modalService: NgbModal,
    private jugadorService: JugadorService,
    private authenticationService: AuthenticationService,
    private spinner: SpinnerService,
    private alert: AlertService,
    private monitoreoService: MonitoreoService
  ) { }

  ngOnInit(): void {
    this.obtenerDatosParticipantes();
    this.filterJuegosNext();
  }

  filterJuegosNext() {
    this.authenticationService.messageReceived.subscribe((juego: any) => {
      this.idd.idJugadores = [];
        this.obtenerDatosParticipantes();
    });
  }

  obtenerDatosParticipantes(){
    const spinnerRef = this.spinner.start("Cargando....");
    this.jugadorService.getJugadores(Number(this.authenticationService.getIdJuegoActual())).subscribe((response) => {
      this.jugadores = response;
      this.jugadores.forEach(element => {
        this.idd.idJugadores.push(element.idJugador);
      });

      this.spinner.stop(spinnerRef);
      this.obtenerDatosResultados(this.idd);
    }),
    (error) => {
      this.spinner.stop(spinnerRef);
      console.error('Ocurrio error, intentelo mas tarde', error);
    };
  }

  obtenerDatosResultados(ids:any){
    
    const spinnerRef = this.spinner.start("Cargando....");
    this.monitoreoService.getTabla(ids).subscribe((response) => {
      this.tablaMonitoreo = response;
      this.spinner.stop(spinnerRef);
    }),
    (error) => {
      this.spinner.stop(spinnerRef);
      console.error('Ocurrio error, intentelo mas tarde', error);
    };
  }

  seguimiento() {
    console.log('entre');
    this.modalService.open(MapaSeguimientoComponent, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl'}).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log("cerre mal");
      
      /* this.closeResult = `Dismissed ${this.getDismissReason(reason)}`; */
    });
  }

}
