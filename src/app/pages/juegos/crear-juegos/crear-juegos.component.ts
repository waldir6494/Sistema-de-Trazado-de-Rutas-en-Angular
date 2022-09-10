import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Juego } from 'src/app/@models/Juego/juego.model';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { JuegoService } from 'src/app/@services/Juego/juego.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { ESTADO_MODAL_CORRECTO, ESTADO_MODAL_ERROR } from 'src/app/@constants/constants-global';
import { ToolbarUpdateService } from 'src/app/@services/Autenticacion/toolbar-update.service';

@Component({
  selector: 'app-crear-juegos',
  templateUrl: './crear-juegos.component.html',
  styleUrls: ['./crear-juegos.component.scss'],
  providers: [AuthenticationService, JuegoService]
})
export class CrearJuegosComponent implements OnInit {
  public inicioDate:any;
  public finDate:any;
  public horaInicio = {hour: 13, minute: 30};
  public horaFin = {hour: 15, minute: 35};

  /* Variables relacionadas a reactive form */
  public crearJuego: FormGroup;

  constructor(
      public activeModal: NgbActiveModal,
      private fb: FormBuilder,
      private juegoService: JuegoService,
      private _toolbarUpdateService:ToolbarUpdateService,
      private authenticationService: AuthenticationService,
      private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  private inicializarForm(){
    this.crearJuego = this.fb.group({
      nombre: [null, Validators.required],
      intentos: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1)]],
      fechaInicio: ['', Validators.required],
      horaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      horaFin: ['', Validators.required]
    });

    this.crearJuego.valueChanges.subscribe((productosTabla) => {
      
    });
  }

  public cerrar() {
    this.activeModal.close();
  }

  public guardar(){

    let juego = new Juego();

    /* fecha y hora de inicio del juego */
    let fechaInicioLocal = this.crearJuego.controls['fechaInicio'].value;
    let horaInicioLocal = this.crearJuego.controls['horaInicio'].value;

    /* fecha y hora de culminación del juego */
    let fechaFinLocal = this.crearJuego.controls['fechaFin'].value;
    let horaFinLocal = this.crearJuego.controls['horaFin'].value;

    juego.idAdministrador = `${this.authenticationService.getIdUser()}`;
    juego.NombreJuego = this.crearJuego.controls['nombre'].value;
    juego.Intentos = this.crearJuego.controls['intentos'].value;
    juego.Inicio = `${fechaInicioLocal.year}-${fechaInicioLocal.month}-${fechaInicioLocal.day} ${horaInicioLocal.hour}:${horaInicioLocal.minute}:${horaInicioLocal.second}`;
    juego.Fin = `${fechaFinLocal.year}-${fechaFinLocal.month}-${fechaFinLocal.day} ${horaFinLocal.hour}:${horaFinLocal.minute}:${horaFinLocal.second}`;

    this.guardarJuegoService(juego);
    /* console.log("fecha inicio: ", this.crearJuego.controls['fechaInicio'].value);
    console.log("fecha inicio: ", this.crearJuego.controls['horaInicio'].value); */
  }

  private guardarJuegoService(juego: Juego){
    const spinnerRef = this.spinner.start("Guardando.....");
    this.juegoService.saveJuego(juego).subscribe(
      (res) => {
       
          this.spinner.stop(spinnerRef);
          //this._toolbarUpdateService.updateToolbar();
          this.activeModal.close(ESTADO_MODAL_CORRECTO); 
      },
      (error) => {
          //this.spinnerService.stop(spinnerRef);
          //this.badCredentials = true;
          this.activeModal.close(ESTADO_MODAL_ERROR);
          this.spinner.stop(spinnerRef);
          console.error('Ocurrio error login', error);
      },
    );
  }

}
