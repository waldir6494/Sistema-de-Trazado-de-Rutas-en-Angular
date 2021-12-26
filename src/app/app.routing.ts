import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthenticationComponent } from 'src/app/pages/authentication/authentication.component';
import { AuthGuard } from 'src/app/@guards/auth.guard';
import { LoginGuard } from 'src/app/@guards/login.guard';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { ParticipantesComponent } from 'src/app/pages/participantes/participantes.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { MapasComponent } from './pages/mapas/mapas.component';

const routes: Routes =[
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  },
  {
    path: 'juegos',
    component: JuegosComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/juegos/juegos.module').then(m => m.JuegosModule)
      }
    ]
  },
  {
    path: 'participantes',
    component: ParticipantesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/participantes/participantes.module').then(m => m.ParticipantesModule)
      }
    ]
  }, 
  {
    path: 'preguntas',
    component: PreguntasComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/preguntas/preguntas.module').then(m => m.PreguntasModule)
      }
    ]
  },
  {
    path: 'mapas',
    component: MapasComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/mapas/mapas.module').then(m => m.MapasModule)
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
