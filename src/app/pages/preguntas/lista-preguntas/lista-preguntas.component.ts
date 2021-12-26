import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreguntaPaginate } from 'src/app/@models/Pregunta/pregunta-paginate.model';
import { Pregunta } from 'src/app/@models/Pregunta/pregunta.model';
import { JuegoService } from 'src/app/@services/Juego/juego.service';
import { PreguntaService } from 'src/app/@services/Pregunta/pregunta.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';

@Component({
  selector: 'app-lista-preguntas',
  templateUrl: './lista-preguntas.component.html',
  styleUrls: ['./lista-preguntas.component.scss']
})
export class ListaPreguntasComponent implements OnInit {

  @Input() preguntasPadre: PreguntaPaginate;

  @Output() getPreguntaPagina: EventEmitter<string> = new EventEmitter<string>();
  @Output() updatePreguntaPagina: EventEmitter<void> = new EventEmitter<void>();
  public paginate:any;

  constructor(
    private spinner: SpinnerService,
    private alert: AlertService,
    private modalService: NgbModal,
    private preguntaService: PreguntaService
  ) { }

  ngOnInit(): void {
    this.paginate = Array.from(Array(this.preguntasPadre.last_page).keys());
    console.log("estas son las preguntas que me llegaron del padre: ", this.preguntasPadre);
  }

  getPreguntaPaginate(url:any){
    this.getPreguntaPagina.emit(url);
  }

  editarJuego(pregunta:Pregunta){
    
  }

  eliminarJuego(pregunta:Pregunta){

  }

}
