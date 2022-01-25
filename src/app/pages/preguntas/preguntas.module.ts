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
import { ImagenVistaComponent } from './imagen-vista/imagen-vista.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    PreguntasComponent,
    ListaPreguntasComponent,
    CrearPreguntasComponent,
    EditarPreguntasComponent,
    ImagenVistaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PreguntasRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule, 
    AngularEditorModule
  ],
  providers: [injectablePreguntas],
})
export class PreguntasModule { }
