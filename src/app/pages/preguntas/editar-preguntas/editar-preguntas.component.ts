import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pregunta } from 'src/app/@models/Pregunta/pregunta.model';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { PreguntaService } from 'src/app/@services/Pregunta/pregunta.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { ESTADO_MODAL_CORRECTO, ESTADO_MODAL_ERROR } from 'src/app/@constants/constants-global';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-editar-preguntas',
  templateUrl: './editar-preguntas.component.html',
  styleUrls: ['./editar-preguntas.component.scss'],
  providers: [ PreguntaService ]
})
export class EditarPreguntasComponent implements OnInit {

  /* Variables relacionadas a reactive form */
  public crearPregunta: FormGroup;
  private imagenUpload=null;
  public seeBase64 = false;
  public Imagen = "1";

  @Input() public id: any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private preguntaService: PreguntaService,
    private authenticationService: AuthenticationService,
    private spinner: SpinnerService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
    this.obtenerPregunta();
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

  /* editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Ingrese la pregunta...',
    translate: 'no',
    customClasses: [ // optional
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  }; */

  public obtenerPregunta(){
    const spinnerRef = this.spinner.start("Consultando.....");
    this.preguntaService.getPregunta(this.id).subscribe(
      (res) => {
          //console.log("esta es la preguntaaaaaa", res);
          this.crearPregunta.controls['pregunta'].setValue(res.Pregunta);
          this.crearPregunta.controls['respuesta'].setValue(res.Respuesta);
          if(Number(res.Imagen) != 0){
            this.seeBase64 = true;
            this.crearPregunta.controls['files'].setValue('data:image/gif;base64,'+res.Imagen);
          }
          this.spinner.stop(spinnerRef);
      },
      (error) => {
          this.spinner.stop(spinnerRef);
          this.alert.start("Ocurrió un error al obtener los datos, intentelo mas tarde.", 'error');
      },
    );
  }

  public cerrar() {
    this.activeModal.close();
  }

  public guardar(){

    let pregunta = new Pregunta();
    pregunta.idJuego = this.authenticationService.getIdJuegoActual();
    pregunta.idPreguntas = this.id;
    pregunta.Pregunta = this.crearPregunta.controls['pregunta'].value;
    pregunta.Respuesta = this.crearPregunta.controls['respuesta'].value;
    pregunta.imagen = this.crearPregunta.controls['files'].value;
    pregunta.Imagen = this.Imagen;

    this.guardarPreguntaService(pregunta);
  }

  private guardarPreguntaService(pregunta: Pregunta){
    const spinnerRef = this.spinner.start("Guardando.....");
    this.preguntaService.updatePregunta(pregunta, this.imagenUpload).subscribe(
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

  fileuploads(evt:any){
    const files = evt.target.files;

    if (evt.target.files && evt.target.files[0]) {
      const file = evt.target.files[0];
      if(file.size > 748576){
        this.alert.start("¡La imagen no puede superar los 700Kb de tamaño!.", 'error');
        return;
      }
      this.imagenUpload = evt.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.crearPregunta.controls['files'].setValue(reader.result);
      reader.readAsDataURL(file);
  }

  }

  public removeImage(){
    this.imagenUpload = null;
    this.Imagen = null;
    this.crearPregunta.controls['files'].setValue(null);
  }
}
