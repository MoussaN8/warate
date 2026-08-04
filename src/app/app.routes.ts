import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Favoris } from './favoris/favoris';

export const routes: Routes = [
    {path:"Accueil",component:Home},
    {path:"Favoris",component:Favoris}
];
