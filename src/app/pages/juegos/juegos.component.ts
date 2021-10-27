import { Component, OnInit } from '@angular/core';
import { JuegoPaginate } from 'src/app/@models/Juego/juego-paginate.model';
import { Juego } from 'src/app/@models/Juego/juego.model';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { JuegoService } from 'src/app/@services/Juego/juego.service';

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
    private authenticationService: AuthenticationService
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
}
