import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { JuegoPaginate } from 'src/app/@models/Juego/juego-paginate.model';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { Juego } from 'src/app/@models/Juego/juego.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarJuegosComponent } from 'src/app/pages/juegos/editar-juegos/editar-juegos.component';
import { ESTADO_MODAL_CORRECTO, ESTADO_MODAL_ERROR } from 'src/app/@constants/constants-global';
import { JuegoService } from 'src/app/@services/Juego/juego.service';
import { ToolbarUpdateService } from 'src/app/@services/Autenticacion/toolbar-update.service';
import * as moment from 'moment';
import { decimalDigest } from '@angular/compiler/src/i18n/digest';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss']
})
export class ListaJuegosComponent implements OnInit {

  @Input() juegosPadre: JuegoPaginate;

  @Output() getJuegoPagina: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateJuegoPagina: EventEmitter<void> = new EventEmitter<void>();
  public paginate:any;

  constructor(
    private spinner: SpinnerService,
    private alert: AlertService,
    private modalService: NgbModal,
    private _toolbarUpdateService:ToolbarUpdateService,
    private juegoService: JuegoService
  ) { }

  ngOnInit(): void {
    this.paginate = Array.from(Array(this.juegosPadre.last_page).keys());
    //console.log("estos son los juegos que me llegaron del padre: ", this.juegosPadre);
  }

  getJuegoPaginate(url:any){
    this.getJuegoPagina.emit(url.replace('http:', 'https:'));
  }
  
  editarJuego(juego:Juego){
    
    const ref = this.modalService.open(EditarJuegosComponent, {ariaLabelledBy: 'modal-basic-title', centered: true});
    ref.componentInstance.juegoActual = juego;
    ref.result.then((result) => {
      //console.log(result);
      if(result == ESTADO_MODAL_CORRECTO){
        //this.getJuegos();
        this.updateJuegoPagina.emit();
        this.alert.start("¡Los cambios se guardaron de manera correcta!", 'success');
        
      }
      
      if(result == ESTADO_MODAL_ERROR){
        this.alert.start("Ocurrió un error al actualizar el juego, intentelo mas tarde", 'error');
      }
    }, (reason) => {
      
      
      /* this.closeResult = `Dismissed ${this.getDismissReason(reason)}`; */
    });
    /* const spinnerRef = this.spinner.start("pruebaCarga"); */
    
  }

  eliminarJuego(juego:Juego){
    const spinnerRef = this.spinner.start("Eliminando.....");
    this.juegoService.deleteJuego(juego.idJuego).subscribe(
      (res) => {
          
          this.spinner.stop(spinnerRef);
          this.updateJuegoPagina.emit();
          let idActual = localStorage.getItem('idJuegoSeleccionado');
          if(Number(idActual) == juego.idJuego){
            localStorage.removeItem('idJuegoSeleccionado');
          }
          this._toolbarUpdateService.updateToolbar();
          this.alert.start("Se eliminó el registro de manera correcta!", 'success');
          
      },
      (error) => {
          //this.spinnerService.stop(spinnerRef);
          //this.badCredentials = true;
          this.spinner.stop(spinnerRef);
          this.updateJuegoPagina.emit();
          this.alert.start("Ocurrió un error al elimnar el juego, intentelo mas tarde", 'error');
          console.error('Ocurrio error login', error);
          
      },
    );

   
  }

  hallarDiferencia(fechaIncio:string, fechaFin:string){
    let fechaInicioParceado = new Date(fechaIncio);
    let fechaFinParceado = new Date(fechaFin);
    return this.diff_minutes(fechaFinParceado, fechaInicioParceado);

  }

  verificarFecha(dateCheckInicio:string, dateCheckFinal:string, state:number){
    let date = moment().format('YYYY-MM-DD h:mm');
    console.log(date);
    let fechaRecibidaInicio: moment.Moment = moment(dateCheckInicio, 'YYYY-MM-DD h:mm');
    let fechaRecibidaFin: moment.Moment = moment(dateCheckFinal, 'YYYY-MM-DD h:mm');
    console.log(fechaRecibidaInicio);
    console.log(fechaRecibidaFin);
    console.log(fechaRecibidaInicio.isBefore(date) && fechaRecibidaFin.isBefore(date));
    console.log(fechaRecibidaFin.isBefore(date));
    console.log(fechaRecibidaInicio.isBefore(date) && fechaRecibidaFin.isAfter(date));
    /*if(fechaRecibidaInicio.isBefore(date) && fechaRecibidaFin.isBefore(date)){
      console.log('retorne 1');
      return 1;
    }*/
    if(state == 1){
      console.log('retorne 2');
      return 2;
    }
    if(fechaRecibidaInicio.isAfter(date)){
      console.log('retorne 1');
      return 1;
    }

    if(fechaRecibidaFin.isBefore(date)){
      console.log('retorne 2');
      return 2;
    }
    
    if(fechaRecibidaInicio.isBefore(date) && fechaRecibidaFin.isAfter(date)){
      console.log('retorne 3');
      return 3;
    }
  }

  diff_minutes(fecha1, fecha12) 
  {
    var diff =(fecha12.getTime() - fecha1.getTime()) / 1000;
    diff /= 60;
    return this.getDataHR(Math.abs(Math.round(diff)));
  }

  getDataHR (newMinutes) {
    let MINS_PER_YEAR = 24 * 365 * 60
    let MINS_PER_MONTH = 24 * 30 * 60
    let MINS_PER_WEEK = 24 * 7 * 60
    let MINS_PER_DAY = 24 * 60
    let minutes = newMinutes;
    let years = Math.floor(minutes / MINS_PER_YEAR)
    minutes = minutes - years * MINS_PER_YEAR
    let months = Math.floor(minutes / MINS_PER_MONTH)
    minutes = minutes - months * MINS_PER_MONTH
    let weeks = Math.floor(minutes / MINS_PER_WEEK)
    minutes = minutes - weeks * MINS_PER_WEEK
    let days = Math.floor(minutes / MINS_PER_DAY)
    minutes = minutes - days * MINS_PER_DAY
    return years + " año(s) " + months + " mes(es) " + weeks + " semana(s) " + days + " día(s) " + minutes + " minuto(s)"
    //return hrData; // 1 year, 2 months, 2 week, 2 days, 12 minutes
}

}
