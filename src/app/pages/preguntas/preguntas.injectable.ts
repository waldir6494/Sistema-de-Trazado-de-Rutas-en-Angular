import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { PreguntaService } from 'src/app/@services/Pregunta/pregunta.service';

export const injectablePreguntas: any[] = [
  SpinnerService,
  AlertService,
  PreguntaService
]
