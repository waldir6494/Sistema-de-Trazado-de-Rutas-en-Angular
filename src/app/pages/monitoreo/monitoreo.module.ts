import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MonitoreoRoutingModule } from './monitoreo.routing';
import { MonitoreoComponent } from './monitoreo.component';
import { injectableMonitoreo } from './monitoreo.injectable';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { GOOGLE_KEY } from 'src/app/@constants/constants-global';
import { MapaSeguimientoComponent } from './mapa-seguimiento/mapa-seguimiento.component';

@NgModule({
  declarations: [
    MonitoreoComponent,
    MapaSeguimientoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MonitoreoRoutingModule,
    SharedModule,
    BrowserModule,
    AgmCoreModule.forRoot({

      apiKey: GOOGLE_KEY,

      libraries: ['places']

    })
  ],
  providers: [injectableMonitoreo],
})
export class MonitoreoModule { }
