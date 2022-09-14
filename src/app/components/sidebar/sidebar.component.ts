import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { ToolbarUpdateService } from 'src/app/@services/Autenticacion/toolbar-update.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/juegos', title: 'Juegos',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/participantes', title: 'Participantes',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/preguntas', title: 'Preguntas',  icon:'ni-planet text-blue', class: '' },
    { path: '/mapas', title: 'Configuración de Mapa',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/monitoreo', title: 'Monitoreo',  icon:'ni-bullet-list-67 text-red', class: '' }
    /* { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' } */
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public idJuego = null;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private _toolbarUpdateService:ToolbarUpdateService) { }

  ngOnInit() {


    this._toolbarUpdateService.messageReceived.subscribe((res) => {
        console.info('[TOOLBAR GAMES][messageReceived]', res);
        console.info('me actualize en el sidebarrr', res);
        setTimeout( () => { 
          this.idJuego = this.authenticationService.getIdJuegoActual();
          this.crearOpciones();
         }, 2000 );

      });
    //this.idJuego = this.authenticationService.getIdJuegoActual();
    //this.crearOpciones();
    //this.menuItems = ROUTES.filter(menuItem => menuItem);

    setTimeout( () => { 
      this.idJuego = this.authenticationService.getIdJuegoActual();
      this.crearOpciones();
     }, 3000 );
    this.crearOpciones();
    //console.log(this.menuItems);
    //console.log(this.idJuego);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  crearOpciones(){

    if(this.idJuego){
      this.menuItems = [
        { path: '/juegos', title: 'Juegos',  icon: 'ni-tv-2 text-primary', class: '', state:true},
        { path: '/participantes', title: 'Participantes',  icon:'ni-single-02 text-yellow', class: '', state:true},
        { path: '/preguntas', title: 'Preguntas',  icon:'ni-planet text-blue', class: '', state:true},
        { path: '/mapas', title: 'Configuración de Mapa',  icon:'ni-pin-3 text-orange', class: '', state:true},
        { path: '/monitoreo', title: 'Monitoreo',  icon:'ni-bullet-list-67 text-red', class: '', state:true}
    ];
    }else{
      this.menuItems = [
        { path: '/juegos', title: 'Juegos',  icon: 'ni-tv-2 text-primary', class: '', state:true},
        { path: '/participantes', title: 'Participantes',  icon:'ni-single-02 text-yellow', class: '', state:false},
        { path: '/preguntas', title: 'Preguntas',  icon:'ni-planet text-blue', class: '', state:false},
        { path: '/mapas', title: 'Configuración de Mapa',  icon:'ni-pin-3 text-orange', class: '', state:false},
        { path: '/monitoreo', title: 'Monitoreo',  icon:'ni-bullet-list-67 text-red', class: '', state:false}
    ];
    }
    console.info('me actualize en el sidebarrr', this.menuItems);
    console.info('me actualize en el sidebarrr', this.idJuego);
  }
  
}
