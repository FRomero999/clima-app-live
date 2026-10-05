import { Routes } from '@angular/router';

export const routes: Routes = [
    // '' es la home. loadComponent carga el fichero solo cuando se visita la ruta (lazy loading).
    { path:'', loadComponent: () => import('./components/city-list/city-list').then(m => m.CityList) },
    // :id es un parámetro de URL. Se lee luego con ActivatedRoute (ej. /ciudad/1).
    { path:'ciudad/:id', loadComponent: () => import('./components/city-card/city-card').then(m => m.CityCard) },
    // ** atrapa cualquier ruta que no exista y redirige a la home. Ponla siempre la última.
    { path:'**', redirectTo: '' }
];
