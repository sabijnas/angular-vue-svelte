import { Routes } from '@angular/router';
import { App } from './app';
import { Favorites } from './favorites/favorites';

export const routes: Routes = [
    {path: '', component: App},
    {path: 'favorites', component: Favorites}
];
