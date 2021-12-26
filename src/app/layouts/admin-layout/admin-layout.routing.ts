import { Routes } from '@angular/router';

//import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { JuegosComponent } from 'src/app/pages/juegos/juegos.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { ParticipantesComponent } from 'src/app/pages/participantes/participantes.component';
import { PreguntasComponent } from 'src/app/pages/preguntas/preguntas.component';
import { MapasComponent } from 'src/app/pages/mapas/mapas.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'juegos',         component: JuegosComponent },
    { path: 'participantes',   component: ParticipantesComponent },
    { path: 'preguntas',       component: PreguntasComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'mapas',           component: MapasComponent }
];
