import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HOSTSERVER } from 'src/app/@constants/HOSTSERVER';
import { Jugador } from 'src/app/@models/Jugador/jugador.model';
import { Generico } from 'src/app/@models/Shared/generico.model';

/* import { HOSTSERVICE_MSSEGURIDAD_APP, HOSTSERVICE_MSDELIVERY, V_API } from '../../@constants/paths';
import { Token } from 'src/app/@models/back-office/seguridad/token.model';
import { Usuario } from '../../@models/back-office/seguridad/usuario.model';
import { EncryptService } from './encrypt.service';
import { ControlAcessosService } from 'src/app/@services/back-office/seguridad/control-accesos.service'; */

/* import { IDMODULO, ID_SREASONS, MODULO, TIPO_ENTIDAD, ID_ORIGEN } from '../../pages/pages.constants'; */

@Injectable()
export class JugadorService {
    private host = HOSTSERVER;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient
    ) {}

    /* login(Correo: string, password: string): Observable<Token> {
  
        
    } */
    
    getJugadores(id: number): Observable<Jugador> {
        const url = `${this.host}/listarJugadores/${id}`;
        return this.http
                        .get<Jugador>(url)
                        .pipe(catchError(this.handleError));
    }

    saveJugador(juego:Jugador): Observable<Jugador>{
        const url = `${this.host}/guardarJugador`;
        return this.http
                    .post<Jugador>(url, juego, { headers: this.headers })
                    .pipe(catchError(this.handleError));
    }

    updateJugador(jugador:Jugador): Observable<Jugador>{
        console.log("esto me llega al servicio", jugador);
        const url = `${this.host}/actualizarJugadores/${jugador.idJugador}`;
        return this.http
                    .put<Jugador>(url, jugador, { headers: this.headers })
                    .pipe(catchError(this.handleError));
    }

    deleteJugador(id:number): Observable<Jugador>{
        const url = `${this.host}/eliminarJugador/${id}`;
        return this.http
                    .delete<Jugador>(url, { headers: this.headers })
                    .pipe(catchError(this.handleError));
    }

    notificar(participantes:number[]){
        const url = `${this.host}/enviarNotificaciones`;
        return this.http
                    .post<any>(url, {'notificados': participantes}, { headers: this.headers })
                    .pipe(catchError(this.handleError));
    }

    contarRutas(id:number): Observable<Generico>{
        const url = `${this.host}/Ruta/contar/${id}`;
        return this.http
                        .get<Generico>(url)
                        .pipe(catchError(this.handleError));
    }

    /* getJuegosPagina(url: string): Observable<JuegoPaginate> {
        return this.http
                        .get<JuegoPaginate>(url)
                        .pipe(catchError(this.handleError));
    } */

    /* saveJuego(juego:Juego): Observable<Juego>{
        const url = `${this.host}/crearJuego`;
        return this.http
                    .post<Juego>(url, juego, { headers: this.headers })
                    .pipe(catchError(this.handleError));
    } */

    /* updateJuego(juego:Juego): Observable<Juego>{
        const url = `${this.host}/actualizarJuegoGlobal/${juego.idJuego}`;
        return this.http
                    .put<Juego>(url, juego, { headers: this.headers })
                    .pipe(catchError(this.handleError));
    }

    deleteJuego(id:number): Observable<Juego>{
        const url = `${this.host}/eliminarJuegoGlobal/${id}`;
        return this.http
                    .delete<Juego>(url, { headers: this.headers })
                    .pipe(catchError(this.handleError));
    } */

    private handleError(error: any): Promise<any> {
        if (error.error.IdError === 4011000) {
            return Promise.reject(error.error);
        }
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
