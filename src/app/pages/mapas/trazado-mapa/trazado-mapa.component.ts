import { Component, OnInit } from '@angular/core';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Puntos } from 'src/app/@models/Mapas/Puntos';
import { Trama } from 'src/app/@models/Mapas/Trama';
import { ConsultarRutas } from 'src/app/@models/Mapas/ConsultarRutas';
import { Route } from 'src/app/@models/Mapas/ruta';
import { InicioFinRutas } from 'src/app/@models/Mapas/InicioFinRutas';
import { ObtenerRutas } from 'src/app/@models/Mapas/ObtenerRutas';
import { actualizarRuta } from 'src/app/@models/Mapas/ActualizarRuta';
import { Juego } from 'src/app/@models/Juego/juego.model';
import { ConsultarRutasUnicas } from 'src/app/@models/Mapas/ConsultarRutasUnicas';
import { JugadorService } from 'src/app/@services/Jugador/jugador.service';
import { PuntosService } from 'src/app/@services/Mapa/puntos.service';
import { TramaService } from 'src/app/@services/Mapa/trama.service';
import {Marker} from 'src/app/@models/Mapas/marker';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { forkJoin } from 'rxjs';
declare const google: any;

@Component({
  selector: 'app-trazado-mapa',
  templateUrl: './trazado-mapa.component.html',
  styleUrls: ['./trazado-mapa.component.scss'],
  providers: [JugadorService, PuntosService, TramaService]
})

export class TrazadoMapaComponent implements OnInit {
  public crearJuego: FormGroup;
  puntos: Array<Puntos> = [];
  puntosBD:Puntos[];
  tramaBD:Trama[];
  rutasBalanceadas: ConsultarRutas[];
	latitude = -16.398839298947458;
	longitude = -71.53687523018044;
  currentLatitude;
  currentLongitude;
  locationChosen=false;
  show=false;
  index=1;
  letter='0';
  startPointState = true;
  habilitaAleatorio = true;
  habilitaPartida =true;
  btnRutas = true;
  textCantidadNodo = true;
  endPointState = false;
  marKerEditable=true;
  markerList: Array<Marker> = [];
  routeList: Array<Route> = [];
  newMarkerStart:Marker;
  markerUnica:Marker;
  rutasTrazadas:InicioFinRutas;
  newMarkerEnd:Marker;
  contador=0;
  puntosRespuesta: Array<Puntos> = [];
  puntoRespuesta: Puntos;
  juegoActual: Juego;
  nuevasBalanceadas: ObtenerRutas[];
  dibujarRutaSeleccionada: Array<Marker> = [];
  eliminar: Array<Marker> = [];
  cantidadNodo = 0;
	idJuego:any;
  seleccionPunto=false;
  valorCasilla="";
  seleccionAleatorio=true;
  habilitarCasilla=false;
  botonPunto=false;
  contadorGeneral=0;
  FormularioTabla: boolean;
  VerTodoRuta:boolean=true;
  VerUnoRuta:boolean=false;
  generacionRutas=true;
  updRuta:actualizarRuta={
    idsJugadores: [],
    idRuta: 0,
  }
  jugadores:any;
  idsRutas:any;
  cantidadRutasGeneral:any=null;
  cantidadPuntosGeneral:any=null;
  consultarT:ConsultarRutasUnicas = {
    idJuego:0,
    tamanio:0,
    idPunto:0
  }
  cantidadPermitido:number = 0;
  constructor(
    private jugadorService: JugadorService,
    private puntoService: PuntosService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService, 
    private tramaService: TramaService,
    private spinner: SpinnerService,
    private alert: AlertService
    ) { 

    }

  ngOnInit(): void {
    this.crearJuego = this.fb.group({
      intentos: [0, Validators.required]
    });

    this.crearJuego.valueChanges.subscribe((productosTabla) => {
    
    });
    this.iniciarJuego();
    this.filterJuegosNext();
  }

  private reiniciarForms(){
    this.puntos = [];
    this.puntosBD=[];
    this.tramaBD=[];
    this.cantidadRutasGeneral=null;
    this.cantidadPuntosGeneral=null;
    this.generacionRutas = true;
    this.rutasBalanceadas=[];
    this.latitude = -16.398839298947458;
    this.longitude = -71.53687523018044;
    this.currentLatitude;
    this.currentLongitude;
    this.locationChosen=false;
    this.show=false;
    this.index=1;
    this.letter='0';
    this.startPointState = true;
    this.habilitaAleatorio = true;
    this.habilitaPartida =true;
    this.btnRutas = true;
    this.textCantidadNodo = true;
    this.endPointState = false;
    this.marKerEditable=true;
    this.markerList = [];
    this.routeList = [];
    this.newMarkerStart = null;
    this.markerUnica = null;
    this.rutasTrazadas = null;
    this.newMarkerEnd = null;
    this.contador=0;
    this.puntosRespuesta = [];
    this.puntoRespuesta= null;
    this.juegoActual = null;
    this.nuevasBalanceadas = [];
    this.dibujarRutaSeleccionada = [];
    this.eliminar = [];
    this.cantidadNodo = 0;
    this.idJuego = null;
    this.seleccionPunto=false;
    this.valorCasilla="";
    this.seleccionAleatorio=true;
    this.habilitarCasilla=false;
    this.botonPunto=false;
    this.contadorGeneral=0;
    this.FormularioTabla= null;
    this.VerTodoRuta=true;
    this.VerUnoRuta=false;

    this.updRuta= {
      idsJugadores: [],
      idRuta: 0,
    }
    this.jugadores=null;
    this.idsRutas=null;
    this.consultarT = {
      idJuego:0,
      tamanio:0,
      idPunto:0
    }
  }

  filterJuegosNext() {
    this.authenticationService.messageReceived.subscribe((juego: any) => {
      
        this.iniciarJuego();
    });
  }

  private iniciarJuego(){
    this.reiniciarForms();
    this.idJuego = this.authenticationService.getIdJuegoActual();
    this.mostrarPuntosPorIdJuego(this.idJuego);
    this.consultarNumeroNodos();
    this.getPath();
  }

  getPath() {
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{
            this.longitude = position.coords.longitude;
            this.latitude = position.coords.latitude;
  
           // this.callApi(longitude, latitude);
          });
      } else {
         
      }
  }
  
  verSoloUnaRuta(){
    this.VerTodoRuta=false;
    this.VerUnoRuta=true;
  }

  verTodasRutas(){
    this.FormularioTabla=false;
    this.VerTodoRuta=true;
    this.VerUnoRuta=false;
    
  }

  escogerRutaParaTodos(id){
    
    this.jugadorService.getJugadores(this.idJuego).subscribe((data : any)=>{
        this.jugadores = data;
        //console.log(this.jugadores);
        for (let jugador of this.jugadores) {
          //console.log("asdasd"+jugador)
          this.updRuta.idsJugadores.push(jugador.idJugador);
        }
        this.updRuta.idRuta=id;
        this.actualizarTodasRutas();
      },(error)=>{
          //console.log(error);
          alert('Ocurrio un error en mostrar jugadores');
      });
  }

  actualizarTodasRutas(){
    this.tramaService.actualizarRutas(this.updRuta).subscribe((data : any)=>{
      alert('Se modifico de manera correcta');
      }, (error) => {
      //console.log(error);
      alert('Ocurrio un error en actualizar ruta');
    });
  }

  reiniciarTodo(){
    this.puntoService.eliminarPuntos(this.idJuego).subscribe((data : any)=>{
      //console.log(data);
      window.location.reload();
    });
  }

  mostrarPuntosPorIdJuego(idJuego: number){
    const spinnerRef = this.spinner.start("Cargando....");
    forkJoin([
      this.puntoService.getPuntosPorIdJuego(idJuego),
      this.puntoService.contarPreguntas(idJuego),
    ]).subscribe((response: any) => {
      this.puntosBD = response[0];
      this.cantidadPuntosGeneral = response[0].length;
      this.contador = response[0].length;
      this.letter=response[0].length+"";
       // console.log(data);
        for (var i =0; i< this.puntosBD.length; i++) {
          let newMarker:Marker = {
            id: this.puntosBD[i].idPuntos,
            latitude:this.puntosBD[i].Latitud,
            longitude:this.puntosBD[i].Longitud,
            label:String.fromCharCode(Number(this.puntosBD[i].NombrePunto)+65)
        }
        this.markerList.push(newMarker);

      }
      //console.log(this.markerList);
      this.cantidadPermitido = response[1].Total;
      this.mostrarTramaPorIdJuego(idJuego);
      this.spinner.stop(spinnerRef);
    }),
      (error) => {
        this.spinner.stop(spinnerRef);
        console.error('Ocurrio error, intentelo mas tarde', error);
      };

    /* this.puntoService.getPuntosPorIdJuego(idJuego).subscribe((data : any)=>{
        this.puntosBD = data;
       // console.log(data);
        for (var i =0; i< this.puntosBD.length; i++) {
          let newMarker:Marker = {
            id: this.puntosBD[i].idPuntos,
            latitude:this.puntosBD[i].Latitud,
            longitude:this.puntosBD[i].Longitud,
            label:String.fromCharCode(Number(this.puntosBD[i].NombrePunto)+65)
        }
        this.markerList.push(newMarker);

      }
      console.log(this.markerList);
      this.mostrarTramaPorIdJuego(idJuego);
      }); */
    }

    buscarPuntoID(id: number){
      for (var i =0; i< this.markerList.length; i++) {
        if(this.markerList[i].id == id){
          return this.markerList[i];
        }
      }
    }

    mostrarTramaPorIdJuego(idJuego: number){
      this.tramaService.getTramasPorIdJuego(idJuego).subscribe((data : any)=>{
          this.tramaBD = data;
          //console.log(data);
          for (var i =0; i< this.tramaBD.length; i++) {
            let route: Route = {
            startPoint:this.buscarPuntoID(this.tramaBD[i].idPuntoOrigen),
            endPoint:this.buscarPuntoID(this.tramaBD[i].idPuntoDestino),
            distance:this.tramaBD[i].Distancia
          }
          //console.log(route);
          this.routeList.push(route);
        }
        });
        
  
    }
    
    saveTrama(trama: Trama){
        const spinnerRef = this.spinner.start("Guardando trama....");
        this.tramaService.save(trama).subscribe((data) =>{
          this.spinner.stop(spinnerRef);
          this.alert.start("¡Se guardó la trama de manera correcta!", 'success');
          this.enableMarkers();
         }, (error) => {
            //console.log(error);
            this.spinner.stop(spinnerRef);
            this.alert.start("Ocurrió un error al guardar la trama, intentelo más tarde.", 'error');
            this.enableMarkers();
         });
     }
    
     onChoseLocation(event){
        if(this.cantidadRutasGeneral){
          this.alert.start("No es posible editar el mapa cuando ya se generaron las rutas.", 'error');
          return;
        }
      //this.marKerEditable=true;
      if (this.marKerEditable) {
         this.currentLatitude = event.coords.lat;
        this.currentLongitude = event.coords.lng;
        let newMarker:Marker = {
          latitude:this.currentLatitude,
          longitude:this.currentLongitude,
          label:this.letter
        }
        let newPunto:Puntos = {
          idJuego:this.idJuego,
          NombrePunto:newMarker.label,
          Alias:this.contador,
          Latitud:newMarker.latitude,
          Longitud:newMarker.longitude
        }
  
        this.contador++;
  
         this.markerList.push(newMarker);
         this.setMarkerLabel();
         this.savePuntos(newPunto,this.contador-1);
  
  
      }
    }

    showMarkers(){
      for (var i = this.markerList.length - 1; i >= 0; i--) {
        //console.log(i+"\t"+this.markerList[i].latitude +"\t"+this.markerList[i].longitude);
      }
    }
    setMarkerLabel(){
      //this.labelOptions.text=this.letter;
      //this.letter=String.fromCharCode((this.letter.charCodeAt(0)+1));
   
      this.letter=Number(this.letter)+1+"";
   
      //console.log(this.currentLatitude +"\t " +this.currentLongitude +"\t"+ this.letter);
    }

  mapDragEnd(event){
    //console.log(event.coords);
  }

  markerClic(event){
    if(this.cantidadRutasGeneral){
      this.alert.start("No es posible editar el mapa cuando ya se generaron las rutas.", 'error');
      return;
    }
    //console.log(event.label);
    //console.log("DISABLE MARKERS");
    //this.marKerEditable=false;
    this.disableEditableMarker();
     if (!this.marKerEditable) {
       //console.log("click en marcador");
      this.currentLatitude = event.latitude;
      this.currentLongitude = event.longitude;
            if (this.startPointState) {
               this.newMarkerStart = {
                id:event.id,
                latitude:this.currentLatitude,
                longitude:this.currentLongitude,
                label:event.label

              };
              this.markerUnica = {
                id:event.id,
                latitude:this.currentLatitude,
                longitude:this.currentLongitude,
                label:event.label
              };
              this.valorCasilla=event.label;
              this.startPointState=false;
              this.endPointState=true;
              //console.log("startPoint TRUE");
            }else {
              this.newMarkerEnd = {
                id:event.id,
                latitude:this.currentLatitude,
                longitude:this.currentLongitude,
                label:event.label
              };

              if(this.newMarkerStart.latitude ==this.newMarkerEnd.latitude &&  this.newMarkerStart.longitude ==this.newMarkerEnd.longitude ){
                this.startPointState=true;
                this.endPointState=false;
                this.enableMarkers();
                this.alert.start("El punto de partida no puede ser el mismo que el punto final.", 'error');
 
              }else{
                this.startPointState=true;
                this.endPointState=false;
                //console.log("startPoint FALSE");
                this.saveRoute();
              }
              
            }
      //console.log(newMarker);
      }
  }

  buscarID(testMarked: Marker){
    for (var i = this.markerList.length - 1; i >= 0; i--) {
      if(this.markerList[i].label === testMarked.label){
        return this.markerList[i].id;
      }
    }
  }

  saveRoute(){
    //console.log("si llegue al metodo guardar ruta");
    
    const pointA = new google.maps.LatLng(this.newMarkerStart.latitude,this.newMarkerStart.longitude);
    const pointB = new google.maps.LatLng(this.newMarkerEnd.latitude,this.newMarkerEnd.longitude);
   
    const Distance = google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB);

    let route: Route = {
        startPoint:this.newMarkerStart,
        endPoint:this.newMarkerEnd,
        distance:Distance
      }
        this.routeList.push(route);
        
        let newTrama:Trama = {
        idPuntoOrigen:this.buscarID(this.newMarkerStart),
        idPuntoDestino:this.buscarID(this.newMarkerEnd),
        Distancia:Distance
      }
     // console.log("id recibido"+"\t"+this.buscarID(this.puntoRespuesta));
     //console.log("id recibido"+"\t"+this.buscarID(this.puntoRespuesta));
     this.saveTrama(newTrama);

      //  console.log("PUNTOS GUARDADOS"+"\t"+Distance);
  }

  savePuntos(puntos: Puntos, cont){
    const spinnerRef = this.spinner.start("Registrando punto....");
    this.puntoService.save(puntos).subscribe((data: Puntos) =>{
    this.puntoRespuesta = data;
    
      this.markerList[cont].id = this.puntoRespuesta.idPuntos;
      
      this.contadorGeneral++;
    this.spinner.stop(spinnerRef);
    this.alert.start("¡El punto se guardó de manera correcta!", 'success');
    }, (error) => {
    
      this.alert.start("Ocurrió un error al guardar el punto, intentelo más tarde.", 'error');
    });
  }

  obtenerRutas(){
 
    if(this.cantidadPermitido == 0){
    
      this.alert.start(`Primero debes generar almenos una pregunta`, 'error');
      return;
    }

    if(this.cantidadNodo == 0){
  
      this.alert.start(`La cantidad de puntos a recorrer no puede ser 0.`, 'error');
      return;
    }

    if(this.markerList.length < 4){
  
      this.alert.start(`Debe establecer almenos 4 marcadores en el mapa.`, 'error');
      return;
    }

    if(this.routeList.length < 3){
  
      this.alert.start(`Debe establecer almenos 3 rutas en el mapa.`, 'error');
      return;
    }
    if(this.cantidadNodo > this.cantidadPermitido){
      this.alert.start(`No puedes generar rutas mayores a la cantidad de preguntas registradas, solo puedes generar una cantidad de rutas menor a ${this.cantidadPermitido}`, 'error');
    }else{
      if(this.seleccionAleatorio){
        const spinnerRef = this.spinner.start("Obteniendo rutas....");
            let consulta:ConsultarRutas = {
                  idJuego:this.idJuego,
                  tamanio:this.cantidadNodo
            }
          this.tramaService.getRutas(consulta).subscribe((data: ObtenerRutas[]) => {
          this.nuevasBalanceadas = data;
          this.etiquetarNuevasRutas();
          this.spinner.stop(spinnerRef);
          this.alert.start("¡Se generaron las rutas de manera correcta!", 'success');
          this.iniciarJuego();
        }, (error) => {
            this.spinner.stop(spinnerRef);
            this.alert.start("Ocurrió un error al generar las rutas, intentelo mas tarde", 'error');
         
        });
    }else{
      const spinnerRef = this.spinner.start("Obteniendo rutas....");
        let consultar:ConsultarRutasUnicas = {
            idJuego:this.idJuego,
            tamanio:this.cantidadNodo,
            idPunto:this.buscarID(this.markerUnica)
          }
    
      this.tramaService.getRutasUnica(consultar).subscribe((data: ObtenerRutas[]) => {
        
      this.nuevasBalanceadas = data;
      this.etiquetarNuevasRutas();
      this.spinner.stop(spinnerRef);
      this.alert.start("¡Se generaron las rutas de manera correcta!", 'success');
      this.iniciarJuego();
      
    }, (error) => {
        this.spinner.stop(spinnerRef);
        this.alert.start("Ocurrió un error al generar las rutas, intentelo mas tarde", 'error');
   
    });
    }
    }
  }

  mostrarTabla(){

    if (this.consultarT.tamanio==0) {

     return;
    }
   
       this.tramaService.getRutasUnicaT(this.consultarT).subscribe((data: ObtenerRutas[]) => {
   
       this.nuevasBalanceadas = data;
  
       this.etiquetarNuevasRutas();
      
     }, (error) => {
      
     });
   
   }

  consultarNumeroNodos(){
    this.tramaService.consultarNumeroNodos(this.idJuego).subscribe((data: any) => {
    this.consultarT.tamanio=data.Total;
    if(this.consultarT.tamanio > 0){
      this.generacionRutas = false;
    }
    
    this.consultarRutasGeneradas();
    }, (error) => {
      
    });
  }

  consultarRutasGeneradas(){
    this.tramaService.consultarRutasGeneradas(this.idJuego).subscribe((data: any) => {

    this.cantidadRutasGeneral = data.length;
    this.idsRutas=data;
    this.consultarT.idPunto=data[0].idPuntoPartida;
    this.consultarT.idJuego=this.idJuego;
  
    this.mostrarTabla();
    }, (error) => {
  
    });

  }

  etiquetarNuevasRutas(){
    for (var i =0; i< this.nuevasBalanceadas.length; i++) {
      for(var j = 0; j<((this.nuevasBalanceadas[i]).visited_nodes.length); j++){
        var num = parseInt((((this.nuevasBalanceadas[i])).visited_nodes[j]));
        (((this.nuevasBalanceadas[i])).visited_nodes[j]) = this.markerList[num].label;
      }
    }
  }

  EliminarTrazo(){
    while(this.dibujarRutaSeleccionada.pop());
  }

  HacerTrazo(rutas: ObtenerRutas){
    this.EliminarTrazo();
  
    for(var j = 0; j < rutas.visited_nodes.length; j++){
    for(var i =0; i<this.markerList.length; i++){
  
          if(this.markerList[i].label === rutas.visited_nodes[j]){
            this.dibujarRutaSeleccionada.push(this.markerList[i]);
            
          }
        }
    }
  }

  seleccionarPunto(){
    this.botonPunto=true;
    this.seleccionPunto = true;
    this.seleccionAleatorio = false;

  }

  HabilitarCasilla(){
    this.habilitarCasilla=true;
  }
  
  aleatorioPunto(){
    this.botonPunto=false;
    this.habilitarCasilla=false;
    this.seleccionPunto = false;
    this.seleccionAleatorio = true;
  
  }

  disableEditableMarker(){
    //asdasdasds
    
      this.marKerEditable=false;
  }
  enableMarkers(){
    this.marKerEditable=true;
  }
  sayChesse(){
     
  }

  transformar(coordenada:any){
    return parseFloat(coordenada);
  }

}
