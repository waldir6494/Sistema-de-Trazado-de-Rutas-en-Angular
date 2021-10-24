import { Component, OnInit } from '@angular/core';
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
  
  public juegos: Juego;

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

}
