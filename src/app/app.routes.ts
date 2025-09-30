import { Routes } from '@angular/router';

export const routes: Routes = [

    //TODO: Use lazy loading for loading games
    //    Need to investigate how to best reuse game components

    // For now, using game service to set the current game

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./main/main').then(m => m.MainComponent) },
    { path: 'cribbage', loadComponent: () => import('./_Games/cribbage/cribbage').then(m => m.Cribbage) },
    { path: 'euchre', redirectTo: 'home', pathMatch: 'prefix' },
    { path: 'experiment', loadComponent: () => import('./_Games/test-game/test-game').then(m => m.TestGameComponent)},
    { path: 'deal', redirectTo: 'home', pathMatch: 'prefix' },
    { path: '*', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'cribbage', loadComponent: () => import('./main/main').then(m => m.MainComponent) },
    // { path: 'euchre', loadComponent: () => import('./main/main').then(m => m.MainComponent) },
    // { path: 'chess', loadComponent: () => import('./main/main').then(m => m.MainComponent) },
    // { path: 'deal', loadComponent: () => import('./main/main').then(m => m.MainComponent) },
];
