import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MapasRoutingModule } from './mapas.routing';
import { MapasComponent } from './mapas.component';
import { TrazadoMapaComponent } from './trazado-mapa/trazado-mapa.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { injectableMapas } from './mapas.injectable';
import { GOOGLE_KEY } from 'src/app/@constants/constants-global';

@NgModule({
  declarations: [
    MapasComponent,
    TrazadoMapaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MapasRoutingModule,
    SharedModule,
    BrowserModule,
    AgmCoreModule.forRoot({

      apiKey: GOOGLE_KEY,

      libraries: ['places']

    })
  ],
  providers: [injectableMapas],
})
export class MapasModule { }
