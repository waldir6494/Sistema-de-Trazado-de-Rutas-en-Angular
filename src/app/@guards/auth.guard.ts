import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.isLoggedIn()) {
      console.log(this.authenticationService.isLoggedIn());
      return true;
    } else {
      this.router.navigate(['login'], {
        // queryParams: {
        //   return: state.url
        // }
      });
      return false;
    }
  }

}
