import { Routes } from '@angular/router';

export const routes: Routes = [
    // '' es la home. loadComponent carga el fichero solo cuando se visita la ruta (lazy loading).
    { path:'', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
    // Página informativa "Acerca de...". También usa lazy loading.
    { path:'acerca-de', loadComponent: () => import('./pages/about/about').then(m => m.About) },
    
    { path: 'ciudad/nueva', loadComponent: () => import('./pages/city-new/city-new').then((m) => m.CityNew) },

    { path: 'ciudad/:id', loadComponent: () => import('./pages/city-detail/city-detail').then(m => m.CityDetail) },

    // ** atrapa cualquier ruta que no exista y redirige a la home. Ponla siempre la última.
    { path:'**', redirectTo: '' },


];
