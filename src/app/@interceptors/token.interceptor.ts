import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../@services/Autenticacion/authentication.service';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn()) {//IS LOGIN
      request = this.addCredentials(request);
      return next.handle(request)
        .pipe(
         catchError(error => {
           return this.handleError(error,request,next)
         })
        );
    }
    return next.handle(request);
  }
  //Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjY2MDM3MzJFMzIyN0MwN0JFOEQwQUJENDcyRjM4NTBBOEYzNDRFRkQiLCJ0eXAiOiJKV1QifQ.eyJuYmYiOjE1OTY1NTI0NDksImV4cCI6MTU5NjYzODYwOSwiaXNzIjoibXNzZWd1cmlkYWRhcHBzIiwiYXVkIjoiNjJkOWE0ODJjMDNmNDZkNmExYmNjM2E1Yzk0N2E0YzQiLCJzY29wZXMiOnsiSWRVc3VhcmlvIjo0LCJVc3VhcmlvIjoic2lkZXJhbCIsIlRpcG9Ub2tlbiI6MywiSWRFbnRpZGFkUGVyc29uYSI6NCwiSWRFbnRpZGFkRW1wcmVzYSI6MSwiSWRJbnZpdGFkbyI6NCwiRGF0bzEiOm51bGwsIkRhdG8yIjpudWxsLCJEYXRvMyI6bnVsbCwiU3VjdXJzYWxlcyI6W10sIlNlcnZpY2lvcyI6W119fQ.Pps25ELTXagDZz-ZRvJb8QpzvyehI1tgtA3R0zFuPn-MGmiMVyK53gJ7FPKxrdr62EpP278ne9eyvUis1v8Q2mRSzg9sbDReQOYY-pnNx3D5dX33980sE4PbuXroj1vmreQiDw9YnedY_owJ-zi6CQqTgIFr3_g2TVXdox6q5hrAWRMwBGzp5IGtGslERZJKm5bFBKcXr6u95sgeezWWG7hFRYpFNBvPfQMN_6nwC9UIxWUvgKxLdiIoxcko8LLy5CDhrlQvEFhRXvJu6CBPcaHWvWODE0ObGPALQv695DUnPiRha6bD4FSME3QTHVWjV0KNYUr5emzI3-ZMHhxoIw'

  private addCredentials = (request: HttpRequest<any>) => {
    //const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY2MDM3MzJFMzIyN0MwN0JFOEQwQUJENDcyRjM4NTBBOEYzNDRFRkQiLCJ0eXAiOiJKV1QifQ.eyJuYmYiOjE1OTY1NTI0NDksImV4cCI6MTU5NjYzODYwOSwiaXNzIjoibXNzZWd1cmlkYWRhcHBzIiwiYXVkIjoiNjJkOWE0ODJjMDNmNDZkNmExYmNjM2E1Yzk0N2E0YzQiLCJzY29wZXMiOnsiSWRVc3VhcmlvIjo0LCJVc3VhcmlvIjoic2lkZXJhbCIsIlRpcG9Ub2tlbiI6MywiSWRFbnRpZGFkUGVyc29uYSI6NCwiSWRFbnRpZGFkRW1wcmVzYSI6MSwiSWRJbnZpdGFkbyI6NCwiRGF0bzEiOm51bGwsIkRhdG8yIjpudWxsLCJEYXRvMyI6bnVsbCwiU3VjdXJzYWxlcyI6W10sIlNlcnZpY2lvcyI6W119fQ.Pps25ELTXagDZz-ZRvJb8QpzvyehI1tgtA3R0zFuPn-MGmiMVyK53gJ7FPKxrdr62EpP278ne9eyvUis1v8Q2mRSzg9sbDReQOYY-pnNx3D5dX33980sE4PbuXroj1vmreQiDw9YnedY_owJ-zi6CQqTgIFr3_g2TVXdox6q5hrAWRMwBGzp5IGtGslERZJKm5bFBKcXr6u95sgeezWWG7hFRYpFNBvPfQMN_6nwC9UIxWUvgKxLdiIoxcko8LLy5CDhrlQvEFhRXvJu6CBPcaHWvWODE0ObGPALQv695DUnPiRha6bD4FSME3QTHVWjV0KNYUr5emzI3-ZMHhxoIw'
    /*
    return request.clone({
      setHeaders: {
        //Authorization: `Bearer ${token}`
        Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjY2MDM3MzJFMzIyN0MwN0JFOEQwQUJENDcyRjM4NTBBOEYzNDRFRkQiLCJ0eXAiOiJKV1QifQ.eyJuYmYiOjE1OTY1NTI0NDksImV4cCI6MTU5NjYzODYwOSwiaXNzIjoibXNzZWd1cmlkYWRhcHBzIiwiYXVkIjoiNjJkOWE0ODJjMDNmNDZkNmExYmNjM2E1Yzk0N2E0YzQiLCJzY29wZXMiOnsiSWRVc3VhcmlvIjo0LCJVc3VhcmlvIjoic2lkZXJhbCIsIlRpcG9Ub2tlbiI6MywiSWRFbnRpZGFkUGVyc29uYSI6NCwiSWRFbnRpZGFkRW1wcmVzYSI6MSwiSWRJbnZpdGFkbyI6NCwiRGF0bzEiOm51bGwsIkRhdG8yIjpudWxsLCJEYXRvMyI6bnVsbCwiU3VjdXJzYWxlcyI6W10sIlNlcnZpY2lvcyI6W119fQ.Pps25ELTXagDZz-ZRvJb8QpzvyehI1tgtA3R0zFuPn-MGmiMVyK53gJ7FPKxrdr62EpP278ne9eyvUis1v8Q2mRSzg9sbDReQOYY-pnNx3D5dX33980sE4PbuXroj1vmreQiDw9YnedY_owJ-zi6CQqTgIFr3_g2TVXdox6q5hrAWRMwBGzp5IGtGslERZJKm5bFBKcXr6u95sgeezWWG7hFRYpFNBvPfQMN_6nwC9UIxWUvgKxLdiIoxcko8LLy5CDhrlQvEFhRXvJu6CBPcaHWvWODE0ObGPALQv695DUnPiRha6bD4FSME3QTHVWjV0KNYUr5emzI3-ZMHhxoIw"
      }
    });
    */
    if((request.url).includes('subirImagen')){
      return request;
    }

    if((request.url).includes('actualizarPregunta')){
      return request;
    }

    return request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.authService.getToken()}`)

    }); 

  };
  private handleError(error: any, request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        /* return this.authService.refreshToken()
          .pipe(
            mergeMap(res => next.handle(this.addCredentials(request)))
          ); */
      } else if (error.status === 403) { //log back in!!
        let strReturn: string = '/inicio';
        this.authService.logout();
        //this.router.navigateByUrl(strReturn);
        return  throwError(error);
      }
      else{
        return  throwError(error);
      }
    } else {
      return  throwError(error);
    }
  }
}
