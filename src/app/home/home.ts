import { Component, inject, OnInit } from '@angular/core';
import { PrecheService } from '../services/preche';
import { Observable } from 'rxjs';
import { Preche } from '../model/preche.model';
import { ChipModule } from 'primeng/chip';
import { BottomNavComponent } from "../components/bottom-nav/bottom-nav";
import { Navbar } from "../navbar/navbar";
import { map } from 'rxjs/operators';
import { AsyncPipe, NgClass} from '@angular/common';
import { AudioService } from '../services/audio';


@Component({
  selector: 'app-home',
  imports: [ChipModule, BottomNavComponent, Navbar,AsyncPipe,NgClass
    
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements  OnInit {
  // j'injecte le service 
  precheService = inject(PrecheService)
  preches$!: Observable<Preche[]>
  activeFilter: 'tout' | 'favoris' | 'telecharges' = 'tout';
  heroPreche$!:Observable<Preche| undefined>;
  audioService= inject(AudioService)


  ngOnInit(): void {
    this.preches$ = this.precheService.getPreches();
    this.heroPreche$ = this.preches$.pipe(
      map(list=>{
        if(!list || list.length ===0)return undefined;

        // je définit l'interval souhaité
        const dureeRotationJour=30

        const millisecondeparJour = 1000 * 60 * 60 * 24

        //nous permet de savoir le jour actuel si on est le 2e jour puis 3 ainsi de suite
        const indexActuel = Math.floor(Date.now() / (millisecondeparJour * dureeRotationJour));

        // ici l'objectif est de ne pas dépasser la taille Le modulo (%) garantit qu'on boucle sur la liste sans jamais dépasser sa taille
        const selectedPreche = indexActuel % list.length

        return list[selectedPreche]
      })
    )
    
  }

  setFilter(filter: 'tout' | 'favoris' | 'telecharges'): void {
    this.activeFilter = filter;
  }

  toggleHeroPlay(preche:Preche):void{
    this.audioService.playPreche(preche);
  }

  //vérifie si un preche spécifique est en cours de lecture
  isCurrentPlaying(precheId?:string):boolean{
    const current = this.audioService.getCurrentpreche();
    return current?.id===precheId;
  }
}
