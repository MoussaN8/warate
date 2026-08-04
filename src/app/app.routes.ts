import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Favoris } from './favoris/favoris';
import { HorsLigne } from './hors-ligne/hors-ligne';

export const routes: Routes = [
    {path:"Accueil",component:Home},
    {path:"Favoris",component:Favoris},
    {path:"Hors-ligne",component:HorsLigne}
];
