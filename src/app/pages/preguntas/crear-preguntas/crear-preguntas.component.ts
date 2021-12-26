import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pregunta } from 'src/app/@models/Pregunta/pregunta.model';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { PreguntaService } from 'src/app/@services/Pregunta/pregunta.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { ESTADO_MODAL_CORRECTO, ESTADO_MODAL_ERROR } from 'src/app/@constants/constants-global';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.scss'],
  providers: [ PreguntaService ]
})
export class CrearPreguntasComponent implements OnInit {

  /* Variables relacionadas a reactive form */
  public crearPregunta: FormGroup;
  
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private preguntaService: PreguntaService,
    private authenticationService: AuthenticationService,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  private inicializarForm(){
    this.crearPregunta = this.fb.group({
      pregunta: [null, Validators.required],
      respuesta: [null, Validators.required],
      files: [null]
    });

    this.crearPregunta.valueChanges.subscribe((productosTabla) => {
      console.log("nuevos datos formulario", productosTabla);
    });
  }

  public cerrar() {
    this.activeModal.close();
  }

  public guardar(){

    let pregunta = new Pregunta();
    pregunta.idJuego = this.authenticationService.getIdJuegoActual();
    pregunta.Pregunta = this.crearPregunta.controls['pregunta'].value;
    pregunta.Respuesta = this.crearPregunta.controls['respuesta'].value;
    pregunta.imagen = this.crearPregunta.controls['files'].value;

    this.guardarPreguntaService(pregunta);
  }

  private guardarPreguntaService(pregunta: Pregunta){
    const spinnerRef = this.spinner.start("Guardando.....");
    this.preguntaService.save(pregunta).subscribe(
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

  public submit(files: FileList) {
    console.log('files:', files);
  }

}
