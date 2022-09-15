import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { JugadorService } from 'src/app/@services/Jugador/jugador.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { ESTADO_MODAL_CORRECTO, ESTADO_MODAL_ERROR } from 'src/app/@constants/constants-global';
import { Jugador } from 'src/app/@models/Jugador/jugador.model';

@Component({
  selector: 'app-crear-participante',
  templateUrl: './crear-participante.component.html',
  styleUrls: ['./crear-participante.component.scss'],
  providers: [AuthenticationService, JugadorService]
})
export class CrearParticipanteComponent implements OnInit {

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

    this.crearParticipante.valueChanges.subscribe((productosTabla) => {
      console.log("nuevos datos formulario", productosTabla);
    });
  }

  public cerrar() {
    this.activeModal.close();
  }

  public guardar(){

    let jugador = new Jugador();
    jugador.idJuego = Number(this.authenticationService.getIdJuegoActual());
    jugador.Nombrejugador = this.crearParticipante.controls['nombre'].value;
    jugador.Correo = this.crearParticipante.controls['correo'].value;
    jugador.Celular = this.crearParticipante.controls['celular'].value;

    this.guardarJuegoService(jugador);

  }

  private guardarJuegoService(jugador: Jugador){
    const spinnerRef = this.spinner.start("Guardando.....");
    this.jugadorService.saveJugador(jugador).subscribe(
      (res) => {
          console.log(res);
          this.spinner.stop(spinnerRef);
          this.activeModal.close(ESTADO_MODAL_CORRECTO); 
      },
      (error) => {
          this.activeModal.close(ESTADO_MODAL_ERROR);
          this.spinner.stop(spinnerRef);
          console.error('Ocurrio error login', error);
      },
    );
  }


}
