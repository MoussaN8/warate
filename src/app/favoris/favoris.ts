import { Component, inject, OnInit } from '@angular/core';
import { FavorisService } from '../services/favoris';
import { Observable } from 'rxjs';
import { Preche } from '../model/preche.model';
import { AsyncPipe, NgClass} from '@angular/common';
import { AudioService } from '../services/audio';
import { BottomNavComponent } from "../components/bottom-nav/bottom-nav";

@Component({
  selector: 'app-favoris',
  imports: [AsyncPipe, NgClass, BottomNavComponent],
  templateUrl: './favoris.html',
  styleUrl: './favoris.css',
})
export class Favoris implements OnInit {

  // j'injecte le service favori et audio
  favoriService = inject(FavorisService)
  audioService = inject(AudioService)

  //on recupere les favoris via une variable
  precheFavoris$! : Observable<Preche[]>

  //on définit une méthode pour récupérer les preches favoris via le service

  ngOnInit(): void {
   
      this.precheFavoris$=this.favoriService.favorisWarate$
  }

  isCurrentPlaying(precheId:string):boolean{
    const current = this.audioService.getCurrentpreche();
    return current?.id  ===  precheId;
  }

  removeFavorite(event: Event, preche: Preche): void {
    event.stopPropagation(); // Empêche le déclenchement de la lecture au clic sur le cœur
    this.favoriService.toggleFavoris(preche);
  }
}
