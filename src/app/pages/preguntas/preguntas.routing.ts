import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ListaPreguntasComponent } from './lista-preguntas/lista-preguntas.component';

const routes: Routes = [
  {
    path: 'lista-preguntas',
    component: ListaPreguntasComponent,
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
export class PreguntasRoutingModule { }
