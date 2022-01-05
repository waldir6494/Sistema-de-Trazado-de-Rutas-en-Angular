import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from './@interceptors/token.interceptor';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AuthGuard } from 'src/app/@guards/auth.guard';
import { LoginGuard } from 'src/app/@guards/login.guard';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { ToolbarUpdateService } from 'src/app/@services/Autenticacion/toolbar-update.service';
import { JuegosModule } from './pages/juegos/juegos.module';
import { AgmCoreModule } from '@agm/core';
import { GOOGLE_KEY } from 'src/app/@constants/constants-global';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    JuegosModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({

      apiKey: GOOGLE_KEY,

      libraries: ['places']

    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    ToolbarUpdateService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

