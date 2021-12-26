import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Juego } from 'src/app/@models/Juego/juego.model';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { JuegoService } from 'src/app/@services/Juego/juego.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { ESTADO_MODAL_CORRECTO, ESTADO_MODAL_ERROR } from 'src/app/@constants/constants-global';

@Component({
  selector: 'app-editar-juegos',
  templateUrl: './editar-juegos.component.html',
  styleUrls: ['./editar-juegos.component.scss'],
  providers: [AuthenticationService, JuegoService]
})
export class EditarJuegosComponent implements OnInit {
  @Input() public juegoActual:Juego;

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
    private authenticationService: AuthenticationService,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
    console.log("me llamaron con este objeto: ", this.juegoActual);
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
    this.inicializarData();
    this.crearJuego.valueChanges.subscribe((productosTabla) => {
      console.log("nuevos datos formulario", productosTabla);
    });
  }

  private inicializarData(){

    this.crearJuego.controls['nombre'].setValue(this.juegoActual.NombreJuego);
    this.crearJuego.controls['intentos'].setValue(this.juegoActual.Intentos);
    let splittedInicio = this.juegoActual.Inicio.split(" ", 2);
    let fechaInicio =  splittedInicio[0].split("-", 3);
    let horaInicio =  splittedInicio[1].split(":", 3);

    this.crearJuego.controls['fechaInicio'].setValue({year: Number(fechaInicio[0]), month: Number(fechaInicio[1]), day: Number(fechaInicio[2])});
    this.crearJuego.controls['horaInicio'].setValue({hour: Number(horaInicio[0]), minute: Number(horaInicio[1]), second: Number(horaInicio[2])});

    let splittedFin = this.juegoActual.Fin.split(" ", 2);
    let fechaFin =  splittedFin[0].split("-", 3);
    let horaFin =  splittedFin[1].split(":", 3);

    this.crearJuego.controls['fechaFin'].setValue({year: Number(fechaFin[0]), month: Number(fechaFin[1]), day: Number(fechaFin[2])});
    this.crearJuego.controls['horaFin'].setValue({hour: Number(horaFin[0]), minute: Number(horaFin[1]), second: Number(horaFin[2])});
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

    juego.idJuego = this.juegoActual.idJuego;
    juego.idAdministrador = `${this.authenticationService.getIdUser()}`;
    juego.NombreJuego = this.crearJuego.controls['nombre'].value;
    juego.Intentos = this.crearJuego.controls['intentos'].value;
    juego.Cerrado = this.juegoActual.Cerrado;
    juego.Inicio = `${fechaInicioLocal.year}-${fechaInicioLocal.month}-${fechaInicioLocal.day} ${horaInicioLocal.hour}:${horaInicioLocal.minute}:${horaInicioLocal.second}`;
    juego.Fin = `${fechaFinLocal.year}-${fechaFinLocal.month}-${fechaFinLocal.day} ${horaFinLocal.hour}:${horaFinLocal.minute}:${horaFinLocal.second}`;

    this.guardarJuegoService(juego);
    /* console.log("fecha inicio: ", this.crearJuego.controls['fechaInicio'].value);
    console.log("fecha inicio: ", this.crearJuego.controls['horaInicio'].value); */
  }

  private guardarJuegoService(juego: Juego){
    const spinnerRef = this.spinner.start("Actualizando.....");
    this.juegoService.updateJuego(juego).subscribe(
      (res) => {
          console.log(res);
          this.spinner.stop(spinnerRef);
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
