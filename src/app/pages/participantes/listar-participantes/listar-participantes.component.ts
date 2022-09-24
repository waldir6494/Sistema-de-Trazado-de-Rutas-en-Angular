import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Jugador } from 'src/app/@models/Jugador/jugador.model';
import { JuegoService } from 'src/app/@services/Juego/juego.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { EditarParticipanteComponent } from '../editar-participante/editar-participante.component';
import { ESTADO_MODAL_CORRECTO, ESTADO_MODAL_ERROR, ESTADO_MODAL_EXISTE } from 'src/app/@constants/constants-global';
import { JugadorService } from 'src/app/@services/Jugador/jugador.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-participantes',
  templateUrl: './listar-participantes.component.html',
  styleUrls: ['./listar-participantes.component.scss']
})
export class ListarParticipantesComponent implements OnInit {

  @Input() jugadoresPadre: Jugador[];
  public notificados:any = [];
  private cantidadDatos;
  private todosSeleccionados = false;
  @Output() updateJugadorPagina: EventEmitter<void> = new EventEmitter<void>();
  @Output() activarBotonNotificar: EventEmitter<void> = new EventEmitter<void>();
  @Output() desactivarBotonNotificar: EventEmitter<void> = new EventEmitter<void>();

  private eventsSubscription: Subscription;
  private notificationSubscription: Subscription;
  @Input() events: Observable<void>;
  @Input() notificate: Observable<void>;
  //variables para el formulario reactivo
  tableForm: FormGroup;
  constructor(
    private spinner: SpinnerService,
    private alert: AlertService,
    private fb: FormBuilder,
    private jugadorService: JugadorService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    console.log("esto recibi del padre en participantes: ", this.jugadoresPadre);
    this.tableForm = this.fb.group({
      participantesCheck: this.fb.array([]),
    });

   
    this.setLineasForm();
    this.cantidadDatos = this.jugadoresPadre.length;
    this.eventsSubscription = this.events.subscribe(() => this.seleccionarTodo());
    this.notificationSubscription = this.notificate.subscribe(() => this.enviarNotificacion());
    this.tableForm.get('participantesCheck').valueChanges.subscribe((data) => {
      this.revisarSeleccionados();
      console.log('data del reactive form de formulariooooo:', data);
    });
  }

  //funcion agregar controles al formulario reactivo
  private setLineasForm() {
    const participantesCtrl = this.tableForm.get('participantesCheck') as FormArray;
    this.jugadoresPadre.forEach((jugador) => {
      participantesCtrl.push(this.setLineasFormArray(jugador));
    });
    /* this.dataSource = new MatTableDataSource(this.tableForm.controls.respuestasCheck['controls']); notificados*/
  }

  private setLineasFormArray(jugador:Jugador) {
    return this.fb.group({
      id: [jugador.idJugador],
      check: Number(jugador.Notificado) ? [true]:[false],
      editable: Number(jugador.Notificado) ? [false]:[true]
    });
  }

  ngOnChanges() {
    // create header using child_id
    //console.log("esto cambio cuentas", this.cantidadDatos);
    if(this.cantidadDatos != this.jugadoresPadre.length){
      this.cantidadDatos = this.jugadoresPadre.length;
      this.tableForm = this.fb.group({
        participantesCheck: this.fb.array([]),
      });
      this.setLineasForm();
      this.tableForm.get('participantesCheck').valueChanges.subscribe((data) => {
        this.revisarSeleccionados();
        console.log('data del reactive form de formulariooooo:', data);
      });
    }
    //console.log("esto cambio", this.jugadoresPadre);
  }
  editarJugador(jugador:Jugador){

    const ref = this.modalService.open(EditarParticipanteComponent, {ariaLabelledBy: 'modal-basic-title', centered: true});
    ref.componentInstance.jugadorActual = jugador;
    ref.result.then((result) => {
      //console.log(result);
      if(result == ESTADO_MODAL_CORRECTO){
        //this.getJuegos();
        this.updateJugadorPagina.emit();
        this.alert.start("¡Los cambios se guardaron de manera correcta!", 'success');
        //console.log("recargue la paggg");
      }
      
      if(result == ESTADO_MODAL_ERROR){
        this.alert.start("Ocurrió un error al actualizar al participante, intentelo mas tarde", 'error');
      }

      if(result == ESTADO_MODAL_EXISTE){
        this.alert.start("Este correo ya está registrado en este juego", 'error');
      }
    }, (reason) => {
      //console.log("cerre mal");
      
      /* this.closeResult = `Dismissed ${this.getDismissReason(reason)}`; */
    });
    /* const spinnerRef = this.spinner.start("pruebaCarga"); */
    //console.log("deberia salir el spinner porque me");

  }

  eliminarJugador(jugador:Jugador){
    //console.log("esto saco del html: ", jugador);
    const spinnerRef = this.spinner.start("Eliminando.....");
    this.jugadorService.deleteJugador(jugador.idJugador).subscribe(
      (res) => {
          console.log(res);
          this.spinner.stop(spinnerRef);
          this.updateJugadorPagina.emit();
          this.alert.start("Se eliminó el registro de manera correcta!", 'success');
          
      },
      (error) => {
          //this.spinnerService.stop(spinnerRef);
          //this.badCredentials = true;
          this.spinner.stop(spinnerRef);
          this.updateJugadorPagina.emit();
          console.error('Ocurrio error login', error);
          
      },
    );

    //console.log("deberia salir la alerta");
  }

  seleccionarTodo(){
    let contador = 0;
    this.todosSeleccionados = !this.todosSeleccionados ? true:false;
    this.jugadoresPadre.forEach((jugador) => {
      if(this.tableForm.controls.participantesCheck['controls'][contador].get('editable').value){
        //this.tableForm.controls.participantesCheck['controls'][contador].get('check').value ? this.tableForm.controls.participantesCheck['controls'][contador].get('check').setValue(false) : this.tableForm.controls.participantesCheck['controls'][contador].get('check').setValue(true);
        this.tableForm.controls.participantesCheck['controls'][contador].get('check').setValue(this.todosSeleccionados);
      }
      contador++;
    });
  }

  enviarNotificacion(){
    let notificados =[];
    let contador = 0;
    this.jugadoresPadre.forEach((jugador) => {
      let editable = this.tableForm.controls.participantesCheck['controls'][contador].get('editable').value;
      let check = this.tableForm.controls.participantesCheck['controls'][contador].get('check').value;
      if( editable && check){
        notificados.push(this.tableForm.controls.participantesCheck['controls'][contador].get('id').value);
      }
      contador++;
    });
    //console.log("ids seleccionados: ", notificados);
    const spinnerRef = this.spinner.start("Notificando.....");
    this.jugadorService.notificar(notificados).subscribe(
      (res) => {
          console.log(res);
          this.spinner.stop(spinnerRef);
          this.updateJugadorPagina.emit();
          this.alert.start("Se notificó a los participantes manera correcta!", 'success');
          
      },
      (error) => {
          //this.spinnerService.stop(spinnerRef);
          //this.badCredentials = true;
          this.spinner.stop(spinnerRef);
          this.updateJugadorPagina.emit();
          this.alert.start('Ocurrió un error al notificar a los participantes, intentelo mas tarde', 'error');
          
      },
    );

  }

  revisarSeleccionados(){
    let contador = 0;
    let verificador = 0;
    this.jugadoresPadre.forEach((jugador) => {
      let editable = this.tableForm.controls.participantesCheck['controls'][contador].get('editable').value;
      let check = this.tableForm.controls.participantesCheck['controls'][contador].get('check').value;
      if( editable && check){
        verificador++;
      }
      contador++;
    });
    if(verificador > 0){
      //console.log("contadorrrrrr true", verificador);
      this.activarBotonNotificar.emit();
    }else{
      //console.log("contadorrrrrr false", verificador);
      this.desactivarBotonNotificar.emit();
    }
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
    this.notificationSubscription.unsubscribe();
  }

}
