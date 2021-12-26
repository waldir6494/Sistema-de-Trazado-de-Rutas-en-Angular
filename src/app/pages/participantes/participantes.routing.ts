import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ListarParticipantesComponent } from 'src/app/pages/participantes/listar-participantes/listar-participantes.component';

const routes: Routes = [
  {
    path: 'lista-participantes',
    component: ListarParticipantesComponent,
  }
];

@NgModule({
  imports: [CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })],
  exports: [RouterModule]
})
export class ParticipantesRoutingModule { }
