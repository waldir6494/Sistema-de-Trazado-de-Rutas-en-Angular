import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';

import { FormControl, FormGroup } from '@angular/forms';
import { ToolbarService } from 'src/app/@services/Toolbar/Toolbar.service';
import { Juego } from 'src/app/@models/Juego/juego.model';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    providers: [AuthenticationService, ToolbarService]
})
export class ToolbarComponent implements OnInit {
    input: string;
    focused: boolean;
    juegos: any;
    sucursales: any[] = [];
    idEmpresa: string;
    form: FormGroup;
    constructor(
        private _authenticationService: AuthenticationService,
        private _toolbarnService: ToolbarService
    ) {}

    ngOnInit() {
      this.getJuegos();
    }
    initForm() {
        this.form = new FormGroup({
            game: new FormControl(),
        });
    }
    setSucursal() {
        //aqui enviamos la lista de juegos obtenida al servicio de actualizacion de juegos, para que sea guardado en el storage
        this._authenticationService.filterGames(this.form.get('sucursal').value === 'todos' ? this.sucursales : [this.form.get('game').value], this.sucursales);
    }

    getJuegos(){
        this._toolbarnService.getJuegosUsuario(this._authenticationService.getIdUser()+"").subscribe(
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

    openDropdown() {
        this.focused = true;
    }

    closeDropdown() {
        this.focused = false;
    }


}
