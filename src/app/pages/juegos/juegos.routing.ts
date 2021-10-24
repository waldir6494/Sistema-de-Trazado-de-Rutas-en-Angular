import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ListaJuegosComponent } from 'src/app/pages/juegos/lista-juegos/lista-juegos.component';

const routes: Routes = [
  {
    path: 'lista-juegos',
    component: ListaJuegosComponent,
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
export class JuegosRoutingModule { }
