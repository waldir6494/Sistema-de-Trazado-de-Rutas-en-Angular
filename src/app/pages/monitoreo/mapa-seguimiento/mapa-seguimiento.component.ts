import { Component, Input, OnInit } from '@angular/core';
import {AgmCoreModule, GoogleMapsAPIWrapper, LatLng, LatLngLiteral} from '@agm/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MonitoreoService } from 'src/app/@services/Monitoreo/monitoreo.service';
import { Marker } from 'src/app/@models/Mapas/marker';
import { AlertService } from 'src/app/shared/alert/alert.service';
declare const google: any;
@Component({
  selector: 'app-mapa-seguimiento',
  templateUrl: './mapa-seguimiento.component.html',
  styleUrls: ['./mapa-seguimiento.component.scss'],
  providers: [MonitoreoService]
})
export class MapaSeguimientoComponent implements OnInit {
  @Input() public ids: any;
  @Input() public id: any;

  lat: number = -16.398839298947458;
	lng: number = -71.53687523018044;
  posicionesActualesTodos:any;
  jugadorActualPosicion:boolean=false;
  TodasRutas:Marker[][]=[];
  verTodo:boolean=false;
  verUno:boolean=false;
  rutaJugadorActual:Object;
  jugadorActual:Marker=
  {
    latitude: 0,
    longitude: 0,
    label: "",
  }

  paths: Array<Array<LatLng | LatLngLiteral>> = [
    [
      {
        "lat": 7.031,
        "lng": 125.573
      },
      {
        "lat": 7.031,
        "lng": 125.575
      }
    ]
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private monitoreoService: MonitoreoService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    },
    async (error) => {
      this.alert.start("Active la ubicación para mejorar la experiencia.", 'error');
    }
    )
    //console.log("recibi estos:", this.ids);
    //console.log("recibi esto:", this.id);
    this.ejecutarVista();
  }

  ejecutarVista(){
    if(this.id){
      console.log("entre a jugador especifico");
      this.verPosicionActualJugador(this.id);
      this.verPuntosJugador(this.id);
    }else{
      console.log("entre a jugador general");
      this.verTodasRutas();
      this.verPosicionActualTodosJugadores();
    }
  }

  verPuntosJugador(idJugador){
    this.monitoreoService.getPuntosJugador(idJugador).subscribe((data)=>{
      this.rutaJugadorActual=data;
    },(error)=>{
    
        alert('Ocurrio un error');
     });

  }

  verTodasRutas(){

  	this.verUno=false;
  	this.monitoreoService.getTodasRutasJugadores(this.ids).subscribe((data : any)=>{
	  		for (let dat of data) {
	  			let ruta:Marker[]=[];
	  			for (let da of dat) {
	  				let m:Marker={
						latitude: da.Latitud,
						longitude: da.Longitud,
						label: "",
					}
	  				ruta.push(m);
	  			}
	  			this.TodasRutas.push(ruta);
	  		}
	  		this.verTodo=true;
  		},(error)=>{
          
          alert('Ocurrio un error mostrar todas las rutas');
       });
  }
  
  verPosicionActualJugador(idJugador){
  	this.verTodo=false;
      this.monitoreoService.getPosicionActual(idJugador).subscribe((data:any)=>{
      	if (data.Latitud==undefined) {
      		this.jugadorActualPosicion=false;
      	}else{
      		this.jugadorActualPosicion=true;
      	}
        this.jugadorActual.latitude=data.Latitud;
        this.jugadorActual.longitude=data.Longitud;
        this.lat=data.Latitud;
        this.lng=data.Longitud;
        this.centerChange(this.lat, this.lng);
        this.verUno=true;
      },(error)=>{
          console.log(error);
          alert('Ocurrio un error ver posicion actual');
       });

    }


  verPosicionActualTodosJugadores(){
  	this.monitoreoService.getPosicionActualTodos(this.ids).subscribe((data:any)=>{
    this.posicionesActualesTodos=data;
    console.log("asd",data);
      },(error)=>{
          //console.log(error);
          alert('Ocurrio un error ver posicion actual de todos');
       });

    }


  public cerrar() {
    this.activeModal.close();
  }

  transformar(coordenada:any){
    return parseFloat(coordenada);
  }

  ngAfterViewInit(){
    this.centerChange(this.lat, this.lng);
  }
  centerChange(lat: any, lng:any) {
      this.lat = lat;
      this.lng = lng;

  }
  
  actualizarPosicion(){
    this.verPosicionActualJugador(this.id);
  }
}
