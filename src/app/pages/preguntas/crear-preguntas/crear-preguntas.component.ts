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
  private imagenUpload=null;

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
    this.preguntaService.savePreguntaImagen(pregunta, this.imagenUpload).subscribe(
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
    //const control = <FormArray>this.seccionForm.controls['imagen'];
    /* let noCargados = "";
    for(let i=0; i<files.length;i++){
        const reader = new FileReader();
        console.log("este es el tamanooo: "+files[i].size);
        
        reader.onload = (e) =>{
            if(this.totalImagenes < ConstantesGeneralesTicket.MAXIMO_IMAGENES){
                const base64 = reader.result + '';
                control.push(this.fb.control(base64));
                this.totalImagenes++;
            }
            
        }
        reader.readAsDataURL(files[i]);
    }
    if(noCargados != ""){
        this.alert.start({
            titulo: this.translate.instant('0000007.mensajes.Alerta'),
            mensaje: this.translate.instant('0000007.mensajes.errorTamanioImagen') + "\n"+noCargados,
            tipo: 'warning',
            tiempo: 10000,
        });
    }
    evt.srcElement.value = null; */

    if (evt.target.files && evt.target.files[0]) {
      const file = evt.target.files[0];
      this.imagenUpload = evt.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.crearPregunta.controls['files'].setValue(reader.result);

      reader.readAsDataURL(file);
  }

  }

  public removeImage(){
    this.imagenUpload = null;
    this.crearPregunta.controls['files'].setValue(null);
  }

}
