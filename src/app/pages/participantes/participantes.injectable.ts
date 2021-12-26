import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { JugadorService } from 'src/app/@services/Jugador/jugador.service';

export const injectableParticipantes: any[] = [
  SpinnerService,
  AlertService,
  JugadorService
]
