import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HOSTSERVER } from 'src/app/@constants/HOSTSERVER';
import { Tablaid } from 'src/app/@models/Monitoreo/tablaid';

/* import { HOSTSERVICE_MSSEGURIDAD_APP, HOSTSERVICE_MSDELIVERY, V_API } from '../../@constants/paths';
import { Token } from 'src/app/@models/back-office/seguridad/token.model';
import { Usuario } from '../../@models/back-office/seguridad/usuario.model';
import { EncryptService } from './encrypt.service';
import { ControlAcessosService } from 'src/app/@services/back-office/seguridad/control-accesos.service'; */

/* import { IDMODULO, ID_SREASONS, MODULO, TIPO_ENTIDAD, ID_ORIGEN } from '../../pages/pages.constants'; */

@Injectable()
export class MonitoreoService {
    private host = HOSTSERVER;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient
    ) {}

    getPuntosJugador(id: number){
        const url = `${this.host}/Rutas/rutajugadorT/${id}`;
        return this.http
                        .get<any>(url,)
                        .pipe(catchError(this.handleError));
      }
    
    getTodasRutasJugadores(ids: Tablaid){
        const url = `${this.host}/Rutas/TodasRutas`;
        return this.http
                        .post<any>(url, ids)
                        .pipe(catchError(this.handleError));
    }

    getTabla(ids: Tablaid): Observable<any> {
        const url = `${this.host}/PuntoMonitoreo/getTabla`;
        return this.http
                        .post<any>(url, ids)
                        .pipe(catchError(this.handleError));
    }

    getExcelTabla(ids: Tablaid){
        const url = `${this.host}/resultadosExcel`;
        return this.http
                        .post<any>(url, ids)
                        .pipe(catchError(this.handleError));
    }

    getPosicionActual(id: number){
        const url = `${this.host}/PuntoMonitoreo/getPosicionActualJugador/${id}`;
        return this.http
                        .post<any>(url, id)
                        .pipe(catchError(this.handleError));
    }
    
      getPosicionActualTodos(ids: Tablaid){
        const url = `${this.host}/PuntoMonitoreo/getPosicionActualTodosJugadores`;
        return this.http
                        .post<any>(url, ids)
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
