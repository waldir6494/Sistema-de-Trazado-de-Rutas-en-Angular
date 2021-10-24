import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authenticationService.isLoggedIn()) {
        this.router.navigate(['juegos']);
        return false;
      } else {
        localStorage.clear();
        return true;
      }
  }
  
}
