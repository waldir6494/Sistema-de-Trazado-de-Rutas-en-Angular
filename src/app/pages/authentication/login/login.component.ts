import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/@models/Usuario/usuario.model';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService],
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authenticationService: AuthenticationService,
    private router: Router,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  send() {
    if (this.form.invalid) return;

    let user: string = this.form.get('usuario').value || '';
    let pass: string = this.form.get('password').value || '';

    const spinnerRef = this.spinner.start("Iniciando sesión....");
    //this.badCredentials = false;
    //let spinnerRef = this.spinnerService.start();
    this.authenticationService.login(user, pass).subscribe(
        (res) => {
            //this.spinnerService.stop(spinnerRef);
            this.authenticationService.currentUser().subscribe(
              (res) => {
                this.authenticationService.saveUser(res.user);
                  //this.spinnerService.stop(spinnerRef);
                  this.spinner.stop(spinnerRef);
                  this.router.navigate(['juegos']);
              },
              (error) => {
                  //this.spinnerService.stop(spinnerRef);
                  //this.badCredentials = true;
                  this.spinner.stop(spinnerRef);
                  console.error('Ocurrio error login', error);
              },
          );
            //this.router.navigate(['dashboard']);
        },
        (error) => {
            //this.spinnerService.stop(spinnerRef);
            //this.badCredentials = true;
            this.spinner.stop(spinnerRef);
            console.error('Ocurrio error login', error);
        },
    );
  }

}
