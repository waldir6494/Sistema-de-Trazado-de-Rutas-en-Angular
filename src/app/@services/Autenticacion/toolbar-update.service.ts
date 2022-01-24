import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ToolbarUpdateService {

  messageReceived = new EventEmitter<any>();

  constructor() {}

  updateToolbar(){
    
    this.messageReceived.emit();  

  }

}  