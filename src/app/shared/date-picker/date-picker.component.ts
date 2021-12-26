import { Component, ElementRef, forwardRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true }]
})
export class DatePickerComponent implements ControlValueAccessor {

  @Input() name: string = '';
  @Input() model: any;
  @ViewChild('dp') dp;

  private propagateChange:any = () => {};
  constructor(private _eref: ElementRef) { }
  @HostListener('document:click', ['$event'])

  ngOnInit(): void {
  }

  onClick(event) {
    if (this._eref.nativeElement.contains(event.target)) return true;
    setTimeout(() => this.dp.close(), 10);
  }

  onModelChange() {
    this.propagateChange(this.model);
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.model = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

}
