import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    DatePickerComponent,
    SpinnerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    DatePickerComponent
  ]
})
export class SharedModule { }
