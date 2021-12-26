import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Jugador } from 'src/app/@models/Jugador/jugador.model';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { JugadorService } from 'src/app/@services/Jugador/jugador.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { CrearParticipanteComponent } from './crear-participante/crear-participante.component';
import { ESTADO_MODAL_CORRECTO, ESTADO_MODAL_ERROR } from 'src/app/@constants/constants-global';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.scss'],
  providers: [JugadorService]
})
export class ParticipantesComponent implements OnInit {

  public jugadores: Jugador;
  public checkAllSelected: boolean = false;
  public checkAllDate = false;
  eventsSubject: Subject<void> = new Subject<void>();
  eventsNotificate: Subject<void> = new Subject<void>();
  constructor(
    private jugadorService: JugadorService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private spinner: SpinnerService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getParticipantes();
    this.filterJuegosNext();
  }

  getParticipantes(){
    this.checkAllSelected = false;
    this.checkAllDate = false;
    const spinnerRef = this.spinner.start("Cargando....");
    this.jugadorService.getJugadores(Number(this.authenticationService.getIdJuegoActual())).subscribe(
        (res) => {
            console.log(res);
            this.jugadores = res;
            console.log(this.jugadores);
            this.spinner.stop(spinnerRef);
        },
        (error) => {
            //this.spinnerService.stop(spinnerRef);
            //this.badCredentials = true;
            this.spinner.stop(spinnerRef);
            console.error('Ocurrio error login', error);
        },
    );
  }

  updateJugadorPagina(){
    console.log("si me llamaronnn");
    this.getParticipantes();
  }

  filterJuegosNext() {
    this.authenticationService.messageReceived.subscribe((juego: any) => {
      console.log("esto si escuche en el listado: ", juego);
        this.getParticipantes();
    });
  }
  

  crearParticipante() {
    this.modalService.open(CrearParticipanteComponent, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      console.log(result);
      if(result == ESTADO_MODAL_CORRECTO){
        this.getParticipantes();
        this.alert.start("¡Se registró al participante de manera correcta!", 'success');
        console.log("recargue la paggg");
      }
      
      if(result == ESTADO_MODAL_ERROR){
        this.alert.start("Ocurrió un error al registrar al participante, intentelo mas tarde", 'error');
      }
    }, (reason) => {
      console.log("cerre mal");
      
      /* this.closeResult = `Dismissed ${this.getDismissReason(reason)}`; */
    });
  }

  presionarAll(){
    console.log("si presionooo");
    if(this.checkAllSelected){
      this.checkAllSelected = false;
      this.eventsSubject.next();
    }else{
      this.checkAllSelected = true;
      this.eventsSubject.next();
    }
  }

  notificarJugadores(){
    console.log("clickeo padre");
    this.eventsNotificate.next();
  }

  activarBotonNotificacion(){
    console.log("escuche activar boton");
    this.checkAllSelected = true;
  }

  desactivarBotonNotificacion(){
    console.log("escuche desactivar boton");
    this.checkAllSelected = false;
  }

}
