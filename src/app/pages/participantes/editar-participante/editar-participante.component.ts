import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { JugadorService } from 'src/app/@services/Jugador/jugador.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { ESTADO_MODAL_CORRECTO, ESTADO_MODAL_ERROR, ESTADO_MODAL_EXISTE } from 'src/app/@constants/constants-global';
import { Jugador } from 'src/app/@models/Jugador/jugador.model';

@Component({
  selector: 'app-editar-participante',
  templateUrl: './editar-participante.component.html',
  styleUrls: ['./editar-participante.component.scss'],
  providers: [AuthenticationService, JugadorService]
})
export class EditarParticipanteComponent implements OnInit {
  @Input() public jugadorActual:Jugador;

  /* Variables relacionadas a reactive form */
  public crearParticipante: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private jugadorService: JugadorService,
    private authenticationService: AuthenticationService,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  private inicializarForm(){
    this.crearParticipante = this.fb.group({
      nombre: [null, Validators.required],
      correo: [null, [Validators.required, Validators.email]],
      celular: [null, [Validators.required, Validators.pattern("^[0-9]{9}$")]]
    });
    this.inicializarData();
    this.crearParticipante.valueChanges.subscribe((productosTabla) => {
      console.log("nuevos datos formulario", productosTabla);
    });
  }

  private inicializarData(){
    console.log("esto recibo en participanteeeeee", this.jugadorActual);
    this.crearParticipante.controls['nombre'].setValue(this.jugadorActual.Nombrejugador);
    this.crearParticipante.controls['correo'].setValue(this.jugadorActual.Correo);
    this.crearParticipante.controls['celular'].setValue(this.jugadorActual.Celular);
  }

  public cerrar() {
    this.activeModal.close();
  }

  public guardar(){

    let jugador = new Jugador();
    jugador.idJugador = this.jugadorActual.idJugador;
    jugador.idJuego = Number(this.authenticationService.getIdJuegoActual());
    jugador.Nombrejugador = this.crearParticipante.controls['nombre'].value;
    jugador.Correo = this.crearParticipante.controls['correo'].value;
    jugador.Celular = this.crearParticipante.controls['celular'].value;

    this.guardarJuegoService(jugador);

  }

  private guardarJuegoService(jugador: Jugador){
    console.log("esto envio a guardarrr", jugador);
    const spinnerRef = this.spinner.start("Actualizando.....");
    this.jugadorService.updateJugador(jugador).subscribe(
      (res) => {
          console.log(res);
          if(res.hasOwnProperty('Existe')){
            this.spinner.stop(spinnerRef);
            this.activeModal.close(ESTADO_MODAL_EXISTE);
          }else{
            this.spinner.stop(spinnerRef);
            this.activeModal.close(ESTADO_MODAL_CORRECTO);
          } 
      },
      (error) => {
          this.activeModal.close(ESTADO_MODAL_ERROR);
          this.spinner.stop(spinnerRef);
          console.error('Ocurrio error login', error);
      },
    );
  }


}
