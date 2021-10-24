import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { LoginComponent } from 'src/app/pages/authentication/login/login.component';
import { AuthGuard } from 'src/app/@guards/auth.guard';
import { LoginGuard } from 'src/app/@guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: 'login',
        redirectTo: 'login',
        pathMatch: 'full',
      }
    ]
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
export class AuthenticationRoutingModule { }
