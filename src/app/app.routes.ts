import { Routes } from '@angular/router';

export const routes: Routes = [
    { path:'', loadComponent: () => import('./components/city-list/city-list').then(m => m.CityList) }
];
