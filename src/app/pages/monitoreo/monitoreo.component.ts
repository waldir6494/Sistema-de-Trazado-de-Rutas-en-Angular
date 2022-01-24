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
  archivoExcel:any;

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
      this.alert.start("Ocurrió un error al obtener los datos, intentelo mas tarde.", 'error');
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
      this.alert.start("Ocurrió un error al obtener los datos, intentelo mas tarde.", 'error');
    };
  }

  seguimientoTodosJugadores() {
   
    const ref = this.modalService.open(MapaSeguimientoComponent, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl'});
    ref.componentInstance.ids = this.idd;
  }

  seguimientoUnicoJugador(id:number) {
    
    const ref = this.modalService.open(MapaSeguimientoComponent, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl'});
    ref.componentInstance.id = id;
  }

  descargarExcelTabla(){
    const spinnerRef = this.spinner.start("Descargando....");
    this.monitoreoService.getExcelTabla(this.idd).subscribe((data: any) => {
       this.archivoExcel = data;
       // link para descargar
       const linkSource = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + this.archivoExcel;
       const downloadLink = document.createElement('a');
       const fileName = 'Resultados de la Evaluacion';
       // HREF para descargar
       downloadLink.href = linkSource;
       downloadLink.download = fileName;
       downloadLink.click();
       this.spinner.stop(spinnerRef);
     }, (error) => {
       
       this.alert.start("Ocurrió un error al descargar el documento excel, intentelo mas tarde.", 'error');
     });
 }

}
