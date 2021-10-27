import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { JuegoPaginate } from 'src/app/@models/Juego/juego-paginate.model';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss']
})
export class ListaJuegosComponent implements OnInit {

  @Input() juegosPadre: JuegoPaginate;

  @Output() getJuegoPagina: EventEmitter<string> = new EventEmitter<string>();
  public paginate:any;

  constructor() { }

  ngOnInit(): void {
    this.paginate = Array.from(Array(this.juegosPadre.last_page).keys());
    console.log("estos son los juegos que me llegaron del padre: ", this.juegosPadre);
  }

  getJuegoPaginate(url:any){
    this.getJuegoPagina.emit(url);
  }

}
