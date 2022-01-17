import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MapaSeguimientoComponent } from 'src/app/pages/monitoreo/mapa-seguimiento/mapa-seguimiento.component';

const routes: Routes = [
  {
    path: 'mapa-seguimiento',
    component: MapaSeguimientoComponent,
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
export class MonitoreoRoutingModule { }
