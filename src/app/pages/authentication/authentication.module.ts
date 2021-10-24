import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication.routing';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AuthGuard } from 'src/app/@guards/auth.guard';
import { LoginGuard } from 'src/app/@guards/login.guard';

@NgModule({
  declarations: [
    LoginComponent,
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    LoginGuard
  ]
})
export class AuthenticationModule { }
