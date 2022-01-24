import { Component, OnInit } from '@angular/core';
import { JuegoPaginate } from 'src/app/@models/Juego/juego-paginate.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { JuegoService } from 'src/app/@services/Juego/juego.service';
import { CrearJuegosComponent } from 'src/app/pages/juegos/crear-juegos/crear-juegos.component';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ESTADO_MODAL_CORRECTO, ESTADO_MODAL_ERROR } from 'src/app/@constants/constants-global';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss'],
  providers: [AuthenticationService, JuegoService]
})
export class JuegosComponent implements OnInit {
  
  public juegos: JuegoPaginate;

  constructor(
    private juegoService: JuegoService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private spinner: SpinnerService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getJuegos();
  }

  getJuegos(){
    const spinnerRef = this.spinner.start("Cargando....");
    this.juegoService.getJuegosUsuario(this.authenticationService.getIdUser()+"").subscribe(
        (res) => {
            
            this.juegos = res;
            
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

  updateJuegoPagina(){
    
    this.getJuegos();
  }

  getJuegoPagina($event:string){
    
    const spinnerRef = this.spinner.start("Cargando....");
    this.juegoService.getJuegosPagina($event).subscribe(
      (res) => {
          
          this.juegos = res;
        
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

  crearJuego() {
    this.modalService.open(CrearJuegosComponent, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
     
      if(result == ESTADO_MODAL_CORRECTO){
        this.getJuegos();
        this.alert.start("¡Se guardó el juego de manera correcta!", 'success');
    
      }
      
      if(result == ESTADO_MODAL_ERROR){
        this.alert.start("Ocurrió un error al guardar el juego, intentelo mas tarde", 'error');
      }
    }, (reason) => {
    
      
      /* this.closeResult = `Dismissed ${this.getDismissReason(reason)}`; */
    });
  }
}
