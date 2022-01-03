import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntasRoutingModule } from './preguntas.routing';
import { PreguntasComponent } from './preguntas.component';
import { ListaPreguntasComponent } from './lista-preguntas/lista-preguntas.component';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
import { EditarPreguntasComponent } from './editar-preguntas/editar-preguntas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { injectablePreguntas } from './preguntas.injectable';


@NgModule({
  declarations: [
    PreguntasComponent,
    ListaPreguntasComponent,
    CrearPreguntasComponent,
    EditarPreguntasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PreguntasRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [injectablePreguntas],
})
export class PreguntasModule { }
