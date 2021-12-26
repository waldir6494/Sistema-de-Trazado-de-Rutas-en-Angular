import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { TrazadoMapaComponent } from './trazado-mapa/trazado-mapa.component';

const routes: Routes = [
  {
    path: 'trazado-mapas',
    component: TrazadoMapaComponent,
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
export class MapasRoutingModule { }
