import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HOSTSERVER } from 'src/app/@constants/HOSTSERVER';
import { Jugador } from 'src/app/@models/Jugador/jugador.model';
import { PreguntaPaginate } from 'src/app/@models/Pregunta/pregunta-paginate.model';
import { Pregunta } from 'src/app/@models/Pregunta/pregunta.model';

/* import { HOSTSERVICE_MSSEGURIDAD_APP, HOSTSERVICE_MSDELIVERY, V_API } from '../../@constants/paths';
import { Token } from 'src/app/@models/back-office/seguridad/token.model';
import { Usuario } from '../../@models/back-office/seguridad/usuario.model';
import { EncryptService } from './encrypt.service';
import { ControlAcessosService } from 'src/app/@services/back-office/seguridad/control-accesos.service'; */

/* import { IDMODULO, ID_SREASONS, MODULO, TIPO_ENTIDAD, ID_ORIGEN } from '../../pages/pages.constants'; */

@Injectable()
export class PreguntaService {
    private host = HOSTSERVER;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient
    ) {}

    /* login(Correo: string, password: string): Observable<Token> {
  
        
    } */
    
    /* getJugadores(id: number): Observable<Jugador> {
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
    } */
    getPreguntaJuego(id: string): Observable<PreguntaPaginate> {
        const url = `${this.host}/getAllPreguntas/${id}`;
        return this.http
                        .get<PreguntaPaginate>(url)
                        .pipe(catchError(this.handleError));
    }

    getPreguntaPagina(url: string): Observable<PreguntaPaginate> {
        return this.http
                        .get<PreguntaPaginate>(url)
                        .pipe(catchError(this.handleError));
    }

    getPregunta(id: number): Observable<Pregunta> {
        const url = `${this.host}/verpregunta/${id}`;
        return this.http
                        .get<Pregunta>(url)
                        .pipe(catchError(this.handleError));
    }

    /* save(pregunta: Pregunta){

        const url = `${this.host}/subirImagen`;
        return this.http
                    .post<Pregunta>(url, pregunta, { headers: this.headers })
                    .pipe(catchError(this.handleError));
	} */

    savePreguntaImagen(pregunta:Pregunta,imagen:File){
        const url = `${this.host}/subirImagen`;
        const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
        const token = localStorage.getItem('token');
        const formData:FormData = new FormData();
        formData.append('imagen',imagen);
        formData.append('idJuego',pregunta.idJuego);
        formData.append('Pregunta',pregunta.Pregunta);
        formData.append('Respuesta',pregunta.Respuesta);
        
    
        return this.http
                    .post<Pregunta>(url, formData)
                    .pipe(catchError(this.handleError));
    }

    updatePregunta(pregunta:Pregunta,imagen:File){
        const url = `${this.host}/actualizarPregunta/${pregunta.idPreguntas}`;
        const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
        const token = localStorage.getItem('token');
        const formData:FormData = new FormData();
        formData.append('imagen',imagen);
        formData.append('idJuego',pregunta.idJuego);
        formData.append('Pregunta',pregunta.Pregunta);
        formData.append('Respuesta',pregunta.Respuesta);
        formData.append('Imagen',pregunta.Imagen);
        
    
        return this.http
                    .post<Pregunta>(url, formData)
                    .pipe(catchError(this.handleError));
    }

    deletePregunta(id:number): Observable<any>{
        const url = `${this.host}/eliminarPregunta/${id}`;
        return this.http
                    .delete<any>(url, { headers: this.headers })
                    .pipe(catchError(this.handleError));
    }
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
