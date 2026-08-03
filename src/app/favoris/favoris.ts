import { Component, inject } from '@angular/core';
import { FavorisService } from '../services/favoris';

@Component({
  selector: 'app-favoris',
  imports: [],
  templateUrl: './favoris.html',
  styleUrl: './favoris.css',
})
export class Favoris {
  
  favoriService = inject(FavorisService)
}
