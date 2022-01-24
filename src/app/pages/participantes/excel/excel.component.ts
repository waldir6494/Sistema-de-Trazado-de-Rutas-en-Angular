import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pregunta } from 'src/app/@models/Pregunta/pregunta.model';
import { AuthenticationService } from 'src/app/@services/Autenticacion/authentication.service';
import { PreguntaService } from 'src/app/@services/Pregunta/pregunta.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { ESTADO_MODAL_CORRECTO, ESTADO_MODAL_ERROR } from 'src/app/@constants/constants-global';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { JugadorService } from 'src/app/@services/Jugador/jugador.service';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss'],
  providers:[JugadorService]
})
export class ExcelComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    public activeModal: NgbActiveModal,
    private spinner: SpinnerService,
    private jugadorService: JugadorService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
  }

  public cerrar() {
    this.activeModal.close();
  }

  public getPlantilla(){
    const spinnerRef = this.spinner.start("Descargando.....");
    this.jugadorService.getExcelParticipantes().subscribe(
      (res) => {
          console.log(res);
        const linkSource = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + res;
        const downloadLink = document.createElement('a');
        const fileName = 'Resultados de la Evaluacion';
        // HREF para descargar
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

          this.spinner.stop(spinnerRef);
          this.alert.start("¡Se realizó la accion de manera correcta!", 'success');
          this.activeModal.close(ESTADO_MODAL_CORRECTO); 
      },
      (error) => {
          this.activeModal.close(ESTADO_MODAL_ERROR);
          this.spinner.stop(spinnerRef);
          console.error('Ocurrio error login', error);
      },
    );
  }

  registrarExcel(documento:File){
    const spinnerRef = this.spinner.start("Cargando archivo.....");
    this.jugadorService.saveJugadoresExcel(this.authenticationService.getIdJuegoActual(), documento).subscribe(
      (res) => {
          console.log(res);
          this.spinner.stop(spinnerRef);
          this.alert.start(res.Mensaje, 'success');
          this.activeModal.close(ESTADO_MODAL_CORRECTO); 
      },
      (error) => {
          this.activeModal.close(ESTADO_MODAL_ERROR);
          this.spinner.stop(spinnerRef);
          console.error('Ocurrio error login', error);
      },
    );
  }

  fileuploads(evt:any){
    const files = evt.target.files;

    if (evt.target.files && evt.target.files[0]) {
      const file = evt.target.files[0];
      this.registrarExcel(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
  }

  }

}
