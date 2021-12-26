import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantesRoutingModule } from './participantes.routing';
import { ParticipantesComponent } from './participantes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { injectableParticipantes } from './participantes.injectable';
import { ListarParticipantesComponent } from './listar-participantes/listar-participantes.component';
import { CrearParticipanteComponent } from './crear-participante/crear-participante.component';
import { EditarParticipanteComponent } from './editar-participante/editar-participante.component';

@NgModule({
  declarations: [
    ParticipantesComponent,
    ListarParticipantesComponent,
    CrearParticipanteComponent,
    EditarParticipanteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ParticipantesRoutingModule,
    SharedModule
  ],
  providers: [injectableParticipantes],
})
export class ParticipantesModule { }
