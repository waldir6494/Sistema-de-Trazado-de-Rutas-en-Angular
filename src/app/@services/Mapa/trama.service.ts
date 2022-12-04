import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HOSTSERVER } from 'src/app/@constants/HOSTSERVER';
import { Jugador } from 'src/app/@models/Jugador/jugador.model';
import { PreguntaPaginate } from 'src/app/@models/Pregunta/pregunta-paginate.model';
import { Pregunta } from 'src/app/@models/Pregunta/pregunta.model';
import { Puntos } from 'src/app/@models/Mapas/Puntos';
import {Trama} from 'src/app/@models/Mapas/Trama';
import { Route } from 'src/app/@models/Mapas/ruta';
import { ConsultarRutas } from 'src/app/@models/Mapas/ConsultarRutas';
import { ConsultarRutasUnicas } from 'src/app/@models/Mapas/ConsultarRutasUnicas';
import { actualizarRuta } from 'src/app/@models/Mapas/ActualizarRuta';
import { ObtenerRutas } from 'src/app/@models/Mapas/ObtenerRutas';

/* import { HOSTSERVICE_MSSEGURIDAD_APP, HOSTSERVICE_MSDELIVERY, V_API } from '../../@constants/paths';
import { Token } from 'src/app/@models/back-office/seguridad/token.model';
import { Usuario } from '../../@models/back-office/seguridad/usuario.model';
import { EncryptService } from './encrypt.service';
import { ControlAcessosService } from 'src/app/@services/back-office/seguridad/control-accesos.service'; */

/* import { IDMODULO, ID_SREASONS, MODULO, TIPO_ENTIDAD, ID_ORIGEN } from '../../pages/pages.constants'; */

@Injectable()
export class TramaService {
    private host = HOSTSERVER;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient
    ) {}

    getTramasPorIdJuego(idJuego:number): Observable<Trama> {
        const url = `${this.host}/mostrarTramaCompleta/${idJuego}`;
        return this.http
                        .get<Trama>(url)
                        .pipe(catchError(this.handleError));
    }

    getRutas(consultar: ConsultarRutas): Observable<ObtenerRutas[]> {
        const url = `${this.host}/obtenerRutas`;
        return this.http
                        .post<ObtenerRutas[]>(url, consultar, { headers: this.headers })
                        .pipe(catchError(this.handleError));
    }

    getRutasUnica(consultar: ConsultarRutasUnicas): Observable<ObtenerRutas[]>{

        const url = `${this.host}/obtenerUnica`;
        return this.http
                    .post<ObtenerRutas[]>(url, consultar, { headers: this.headers })
                    .pipe(catchError(this.handleError));
	}

    getRutasUnicaT(consultar: ConsultarRutasUnicas): Observable<any>{
        const url = `${this.host}/obtenerUnicaT`;
        return this.http
                    .post<any>(url, consultar, { headers: this.headers })
                    .pipe(catchError(this.handleError));
    }

    actualizarRutas(consultar: actualizarRuta): Observable<any>{
        const url = `${this.host}/actualizarRutas`;
        return this.http
                    .post<any>(url, consultar, { headers: this.headers })
                    .pipe(catchError(this.handleError));
    }

    consultarRutasGeneradas(id:number): Observable<any>{
        const url = `${this.host}/Rutas/RutasGeneradas/${id}`;
        return this.http
                    .get<any>(url)
                    .pipe(catchError(this.handleError));
    }

    consultarNumeroNodos(id:number): Observable<any>{
        const url = `${this.host}/RutaPunto/contar/${id}`;
        return this.http
                    .get<any>(url)
                    .pipe(catchError(this.handleError));
    }

    save(trama: Trama): Observable<Trama>{
        const url = `${this.host}/guardarTrama`;
        return this.http
                    .post<Trama>(url, trama, { headers: this.headers })
                    .pipe(catchError(this.handleError));
    }

    eliminarMapa(id:number): Observable<any>{
        const url = `${this.host}/mapa/reiniciar/${id}`;
        return this.http
                    .post<any>(url, { headers: this.headers })
                    .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Promise<any> {
        if (error.error.IdError === 4011000) {
            return Promise.reject(error.error);
        }
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
