import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { JugadorService } from 'src/app/@services/Jugador/jugador.service';
import { PuntosService } from 'src/app/@services/Mapa/puntos.service';
import { TramaService } from 'src/app/@services/Mapa/trama.service';


export const injectableMapas: any[] = [
  SpinnerService,
  AlertService,
  JugadorService,
  PuntosService,
  TramaService
]
