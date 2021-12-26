import { Marker } from 'src/app/@models/Mapas/marker';
export interface InicioFinRutas {
	inicio:Marker;
	fin:Marker;
	Distancia:number;
}