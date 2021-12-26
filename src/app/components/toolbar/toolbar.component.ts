import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToolbarService } from 'src/app/@services/Toolbar/Toolbar.service';
import { Juego } from 'src/app/@models/Juego/juego.model';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    input: string;
    focused: boolean;
    juegos: Juego;
    sucursales: any[] = [];
    idEmpresa: string;
    form: FormGroup;
    constructor(
        private _authenticationService: AuthenticationService,
        private _toolbarnService: ToolbarService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
      
      this.initForm();
      this.form.valueChanges.subscribe((juegoSeleccionado) => {
          this.setJuego(juegoSeleccionado.game);
        console.log("nuevos cambio toolbar", juegoSeleccionado);
      });

      this.getJuegos();
    }
    initForm() {
        /* this.form = new FormGroup({
            game: new FormControl(),
        }); */

        this.form = this.fb.group({
            game: []
          });
    }
    setJuego(juego:any) {
        console.log("esto seleccione: ", juego);
        //aqui enviamos la lista de juegos obtenida al servicio de actualizacion de juegos, para que sea guardado en el storage
        this._authenticationService.filterGames(juego);
    }

    getJuegos(){
        this._toolbarnService.getJuegosUsuario(this._authenticationService.getIdUser()+"").subscribe(
            (res) => {
                console.log(res);
                this.juegos = res;
                console.log(this.juegos);
                this.form.controls['game'].setValue( this.juegos[0], {onlySelf: true});
                this._authenticationService.setInicioJuego(this.juegos[0]);
            },
            (error) => {
                //this.spinnerService.stop(spinnerRef);
                //this.badCredentials = true;
                console.error('Ocurrio error login', error);
            },
        );
    }

    openDropdown() {
        this.focused = true;
    }

    closeDropdown() {
        this.focused = false;
    }


}
