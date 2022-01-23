import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pregunta } from 'src/app/@models/Pregunta/pregunta.model';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { PreguntaService } from 'src/app/@services/Pregunta/pregunta.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { ESTADO_MODAL_CORRECTO, ESTADO_MODAL_ERROR } from 'src/app/@constants/constants-global';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-imagen-vista',
  templateUrl: './imagen-vista.component.html',
  styleUrls: ['./imagen-vista.component.scss'],
  providers: [ PreguntaService ]
})
export class ImagenVistaComponent implements OnInit {

  @Input() public id: any;
  public imagen:any = null;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private preguntaService: PreguntaService,
    private authenticationService: AuthenticationService,
    private spinner: SpinnerService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.obtenerPregunta();
  }

  public cerrar() {
    this.activeModal.close();
  }

  public obtenerPregunta(){
    const spinnerRef = this.spinner.start("Consultando.....");
    this.preguntaService.getPregunta(this.id).subscribe(
      (res) => {
          this.imagen ='data:image/gif;base64,'+res.Imagen;
      
          this.spinner.stop(spinnerRef);
      },
      (error) => {
          this.spinner.stop(spinnerRef);
          this.alert.start("Ocurrió un error al obtener los datos, intentelo mas tarde.", 'error');
          this.cerrar();
        },
    );
  }

}
