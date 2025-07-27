import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./main/main').then(m => m.MainComponent) },
    { path: 'cribbage', redirectTo: 'home', pathMatch: 'prefix' },
    { path: 'euchre', redirectTo: 'home', pathMatch: 'prefix' },
    { path: 'chess', redirectTo: 'home', pathMatch: 'prefix' },
    { path: 'deal', redirectTo: 'home', pathMatch: 'prefix' },
    // { path: 'cribbage', loadComponent: () => import('./main/main').then(m => m.MainComponent) },
    // { path: 'euchre', loadComponent: () => import('./main/main').then(m => m.MainComponent) },
    // { path: 'chess', loadComponent: () => import('./main/main').then(m => m.MainComponent) },
    // { path: 'deal', loadComponent: () => import('./main/main').then(m => m.MainComponent) },
];
