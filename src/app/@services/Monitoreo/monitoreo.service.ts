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


    getTabla(ids: Tablaid): Observable<any> {
        const url = `${this.host}/PuntoMonitoreo/getTabla`;
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
