import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ToolbarUpdateService {

  messageReceived = new EventEmitter<any>();

  constructor() {}

  updateToolbar(){
    console.log("SI LLEGUUE AL SERVICIOOOOO");
    this.messageReceived.emit();  

  }

}  