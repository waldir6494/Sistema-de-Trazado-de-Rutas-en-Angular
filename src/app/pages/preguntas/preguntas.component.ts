import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreguntaPaginate } from 'src/app/@models/Pregunta/pregunta-paginate.model';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { PreguntaService } from 'src/app/@services/Pregunta/pregunta.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
import { ESTADO_MODAL_CORRECTO, ESTADO_MODAL_ERROR } from 'src/app/@constants/constants-global';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
  providers: [PreguntaService]
})
export class PreguntasComponent implements OnInit {

  public preguntas: PreguntaPaginate;

  constructor(
    private preguntaService: PreguntaService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private spinner: SpinnerService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getPreguntas();
    this.filterPreguntaNext();
  }

  getPreguntas(){
    const spinnerRef = this.spinner.start("Cargando....");
    this.preguntaService.getPreguntaJuego(this.authenticationService.getIdJuegoActual()+"").subscribe(
        (res) => {
            console.log("estas son las preguntas que traigo", res);
            this.preguntas = res;
            console.log(this.preguntas);
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

  updatePreguntaPagina(){
    console.log("si me llamaronnn");
    this.getPreguntas();
  }

  getPreguntaPagina($event:string){
    console.log("esto recibo del hijo", $event);
    const spinnerRef = this.spinner.start("Cargando....");
    this.preguntaService.getPreguntaPagina($event).subscribe(
      (res) => {
          console.log(res);
          this.preguntas = res;
          console.log(this.preguntas);
          this.spinner.stop(spinnerRef);
      },
      (error) => {
          //this.spinnerService.stop(spinnerRef);
          //this.badCredentials = true;
          console.error('Ocurrio error login', error);
          this.spinner.stop(spinnerRef);
      },
    );
  }

  filterPreguntaNext() {
    this.authenticationService.messageReceived.subscribe((juego: any) => {
      console.log("esto si escuche en el listado: ", juego);
        this.getPreguntas();
    });
  }

  crearPregunta() {
    this.modalService.open(CrearPreguntasComponent, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      console.log(result);
      if(result == ESTADO_MODAL_CORRECTO){
        this.getPreguntas();
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

}
