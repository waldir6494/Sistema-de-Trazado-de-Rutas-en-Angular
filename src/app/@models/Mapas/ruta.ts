import { Marker } from 'src/app/@models/Mapas/marker';
export interface Route {
	id?:number;
	startPoint: Marker;
	endPoint: Marker;
	distance:number;
}
