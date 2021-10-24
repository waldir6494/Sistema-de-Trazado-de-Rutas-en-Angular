import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HOSTSERVER } from 'src/app/@constants/HOSTSERVER';
import { Token } from 'src/app/@models/Autenticacion/token.model';

/* import { HOSTSERVICE_MSSEGURIDAD_APP, HOSTSERVICE_MSDELIVERY, V_API } from '../../@constants/paths';
import { Token } from 'src/app/@models/back-office/seguridad/token.model';
import { Usuario } from '../../@models/back-office/seguridad/usuario.model';
import { EncryptService } from './encrypt.service';
import { ControlAcessosService } from 'src/app/@services/back-office/seguridad/control-accesos.service'; */
import { EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/@models/Usuario/usuario.model';
/* import { IDMODULO, ID_SREASONS, MODULO, TIPO_ENTIDAD, ID_ORIGEN } from '../../pages/pages.constants'; */

@Injectable()
export class AuthenticationService {
    /* private host = HOSTSERVICE_MSSEGURIDAD_APP;
    private host_delivery = HOSTSERVICE_MSDELIVERY;
    private v_api = 2; //V_API;
    private id_sr = ID_SREASONS;
    private module = IDMODULO; */

    private tokenName = 'gameToken';
    private idUsuario = 'idUsuario';
    private nombre = 'nombre';
    private correo = 'correo';
    private refreshTokenName = 'deliveryRefreshToken';
    private logInName = 'LogIn';
    private tokenSucursal = 'sucursalFilter';

    messageReceived = new EventEmitter<any>();

    constructor(
        private http: HttpClient
        /* private http: HttpClient,
        private encryptService: EncryptService,
        private controlAcessosService: ControlAcessosService, */
    ) {}

    login(Correo: string, password: string): Observable<Token> {
  
        const url = `${HOSTSERVER}/login`;
        //let passencriptado = this.encryptService.encriptAll(password);
        //let headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + passencriptado) });
        //let params = new HttpParams().set('tipoEntidad', TIPO_ENTIDAD);

        return this.http.post(url, {Usuario: Correo, password:password}).pipe(
            map((response) => {
                let token = (<any>response) as Token;
                if (token && token.token) {
                    this.saveToken(token.token);
                    this.currentUser();
                    //this.saveRefreshToken(token.refreshToken);
                    this.setDateLogIn();
                }
                return response;
            }),
            catchError(this.handleError),
        );
    }

    currentUser(): Observable<any>{
        const url = `${HOSTSERVER}/data`;
        return this.http
                .post<any>(url, { token: this.getToken() })
                .pipe(catchError(this.handleError));
        //console.log(data);
    }

    /* loginTiendaLink(username: string, password: string): Observable<Token> {
        const url = `${this.host}/api/v${this.v_api}/usuarios/${this.id_sr}/login/50/5`; //${this.module}`;
        let passencriptado = this.encryptService.encriptAll(password);

        let headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + passencriptado) });
        let params = new HttpParams()
            .set('IdEmpresa', ID_SREASONS.toString())

            .set('IdModulo', '50');
        return this.http.post(url, {}, { headers: headers, params: params }).pipe(
            map((response) => {
                let token = (<any>response) as Token;
                if (token && token.accessToken) {
                    this.saveToken(token.accessToken);
                    this.saveRefreshToken(token.refreshToken);
                    this.setDateLogIn();
                }
                return response;
            }),
            catchError(this.handleError),
        );
    } */

    /* refreshToken(): Observable<Token> {
        const url = `${this.host}/refreshtoken`;
        return this.http
            .post(url, {
                RefreshToken: this.getRefreshToken(),
                AccessToken: this.getToken(),
                IdModulo: IDMODULO.toString(),
            })
            .pipe(
                map((response) => {
                    let json: string = JSON.stringify(response);
                    let tok: Token = JSON.parse(json);
                    if (tok && tok.accessToken) {
                        this.saveToken(tok.accessToken);
                        this.saveRefreshToken(tok.refreshToken);
                        this.setDateLogIn();
                    }
                    return tok;
                }),
                catchError(this.handleError),
            );
    } */
    logout() {
        console.log("salioo");
        localStorage.removeItem(this.tokenName);
        //localStorage.removeItem(this.refreshTokenName);
        localStorage.removeItem(this.logInName);
        localStorage.removeItem(this.tokenSucursal);
        localStorage.removeItem(this.idUsuario);
        localStorage.removeItem(this.nombre);
        localStorage.removeItem(this.correo);
        //this.controlAcessosService.clearRutas();
        //this.controlAcessosService.clearControles();
    } 
    isLoggedIn(): boolean {
        var token = this.getToken();
        if (token) {
            var payload = JSON.parse(atob(token.split('.')[1]));
            if (this.getDateLogIn() == 0) {
                return false;
            } else {
                return payload.exp * 1000 > Date.now();
            }
        } else {
            //return true;
            return false;
        }
    }
    /* currentUser(): Usuario {
        if (this.isLoggedIn()) {
            var token = this.getToken();
            var payload = JSON.parse(atob(token.split('.')[1]));
            let user: Usuario = payload.scopes;
            return user;
        } else {
            return null;
        }
    } */

    setSucursalesFiltro(sucursales: any[]): void {
        console.log('EVENTO', sucursales);
        let suc = sucursales.length > 1 ? '' : sucursales.map((suc) => suc.idSucursal);
        localStorage.setItem(this.tokenSucursal, suc.toString());
    }
    // Opcion el centraliza el combobox toolbar si deseas que se vean todos combo y solo uno select
    // Caso se quiera TODOS que emita combo y en los getSucursales() de cada componente actualizar getSucursalesFiltro() X getSucursales()
    filterGames(select: any[], combo: any[]): void {
        this.setSucursalesFiltro(select);

        this.messageReceived.emit(select);
    }

    saveUser(usuario: Usuario) {
        localStorage.setItem(this.idUsuario, usuario.id+"");
        localStorage.setItem(this.nombre, usuario.Nombre);
        localStorage.setItem(this.correo, usuario.Correo);
    }

    saveToken(token: string): void {
        localStorage.setItem(this.tokenName, token);
    }
    getIdUser(): number {
        return Number(localStorage.getItem(this.idUsuario));
    }
    getNombreUsuario(): string {
        return localStorage.getItem(this.nombre);
    }
    getCorreoUsuario(): string {
        return localStorage.getItem(this.correo);
    }
    getToken(): string {
        return localStorage.getItem(this.tokenName);
    }
    saveRefreshToken(refresh: string): void {
        localStorage.setItem(this.refreshTokenName, refresh);
    }
    getRefreshToken(): string {
        return localStorage.getItem(this.refreshTokenName);
    }
    getDateLogIn(): number {
        let login = localStorage.getItem(this.logInName);
        if (login != null) {
            let numberdate = JSON.parse(login);
            var daylog = new Date(numberdate);
            var daycurrent = new Date();
            if (
                daycurrent.getDate() == daylog.getDate() &&
                daycurrent.getMonth() == daylog.getMonth() &&
                daycurrent.getFullYear() == daylog.getFullYear()
            ) {
                return numberdate;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }
    private setDateLogIn(): void {
        localStorage.setItem(this.logInName, Date.now().toString());
    }

    private handleError(error: any): Promise<any> {
        if (error.error.IdError === 4011000) {
            return Promise.reject(error.error);
        }
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
