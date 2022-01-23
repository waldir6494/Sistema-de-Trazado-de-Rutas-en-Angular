import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioRegistro } from 'src/app/@models/Autenticacion/usuario-registro.model';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthenticationService, SpinnerService, AlertService]
})
export class RegisterComponent implements OnInit {
  /* Variables relacionadas a reactive form */
  public crearUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private alert: AlertService,
    private spinner: SpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.inicializarForm();
    this.crearUsuario.valueChanges.subscribe((productosTabla) => {
      console.log("nuevos datos formulario", productosTabla);
    });
  }

  private inicializarForm(){
    this.crearUsuario = this.fb.group({
      nombre: [null, Validators.required],
      correo: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    });
  }

  public registrar(){
    let usuario = new UsuarioRegistro();
    usuario.Nombre = this.crearUsuario.get('nombre').value;
    usuario.Correo = this.crearUsuario.get('correo').value;
    usuario.Usuario = this.crearUsuario.get('correo').value;
    usuario.password = this.crearUsuario.get('password').value;
    usuario.confirmPassword = this.crearUsuario.get('confirmPassword').value;
    if(usuario.password != usuario.confirmPassword){
      this.alert.start("El valor de la contraseña y la confirmación no es el mismo.", 'error');
      return;
    }
    const spinnerRef = this.spinner.start("Registrando.....");
    this.authenticationService.registrar(usuario).subscribe(
      (res) => {
          console.log(res);
          this.spinner.stop(spinnerRef);
          if(res.Campo){
            if(res.Campo == "Correo" && res.Existe == "true"){
              this.alert.start("Este correo ya esta siendo usado en el sistema", 'error');
              return;
            }
          }else{
            this.alert.start("¡Se registró al usuario de manera correcta!, ahora puede iniciar sesión", 'success');
            this.router.navigate(['login'], {
            });
          } 
      },
      (error) => {
          this.spinner.stop(spinnerRef);
          this.alert.start("Ocurrió un error, intentelo mas tarde.", 'error');
          this.router.navigate(['login'], {
          });
      },
    );
    
  }
}
