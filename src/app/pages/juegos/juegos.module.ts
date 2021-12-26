import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos.routing';
import { JuegosComponent } from './juegos.component';
import { ListaJuegosComponent } from './lista-juegos/lista-juegos.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/@interceptors/token.interceptor';
import { CrearJuegosComponent } from './crear-juegos/crear-juegos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { injectableJuegos } from './juegos.injectable';
import { EditarJuegosComponent } from './editar-juegos/editar-juegos.component';


@NgModule({
  declarations: [
    JuegosComponent,
    ListaJuegosComponent,
    CrearJuegosComponent,
    EditarJuegosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    JuegosRoutingModule,
    SharedModule
  ],
  providers: [injectableJuegos],
})
export class JuegosModule { }
