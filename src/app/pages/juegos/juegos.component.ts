import { Component, OnInit } from '@angular/core';
import { JuegoPaginate } from 'src/app/@models/Juego/juego-paginate.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { JuegoService } from 'src/app/@services/Juego/juego.service';
import { CrearJuegosComponent } from 'src/app/pages/juegos/crear-juegos/crear-juegos.component';

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
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getJuegos();
  }

  getJuegos(){
    this.juegoService.getJuegosUsuario(this.authenticationService.getIdUser()+"").subscribe(
        (res) => {
            console.log(res);
            this.juegos = res;
            console.log(this.juegos);
        },
        (error) => {
            //this.spinnerService.stop(spinnerRef);
            //this.badCredentials = true;
            console.error('Ocurrio error login', error);
        },
    );
  }

  getJuegoPagina($event:string){
    console.log("esto recibo del hijo", $event);
    this.juegoService.getJuegosPagina($event).subscribe(
      (res) => {
          console.log(res);
          this.juegos = res;
          console.log(this.juegos);
      },
      (error) => {
          //this.spinnerService.stop(spinnerRef);
          //this.badCredentials = true;
          console.error('Ocurrio error login', error);
      },
    );
  }

  crearJuego() {
    this.modalService.open(CrearJuegosComponent, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      console.log("cerre bien");
    }, (reason) => {
      console.log("cerre mal");
      /* this.closeResult = `Dismissed ${this.getDismissReason(reason)}`; */
    });
  }
}
