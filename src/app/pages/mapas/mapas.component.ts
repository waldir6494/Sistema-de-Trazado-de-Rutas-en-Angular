import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.scss']
})
export class MapasComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  constructor() { }

  ngOnInit(): void {
  }

}
