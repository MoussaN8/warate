import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preche } from '../model/preche.model';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio = new Audio();

  /* l'objectif est de permettre aux autres composants d'être au courant
  de la nouvelle valeur par defaut le preche actuel vaut null si elle 
  contient une vleur elle peut lire modifier ou next sur un audio
  */
  private currentPrecheSubject = new BehaviorSubject<Preche|null>(null);
 
  /*asObservable() crée une vue en lecture seule du BehaviorSubject
  on crée une fenêtre vers cette boîte. Depuis cette fenêtre, on peut seulement regarder.
  Impossible de modifier. ici on peut faire un subscribe mais pas next
  asObservable() signifie donc : “Je transforme mon BehaviorSubject en un
   Observable en lecture seule, afin que les autres composants puissent 
   écouter les changements sans pouvoir modifier les données. en gros
   juste pour consulter

  */
  currentPreche$=this.currentPrecheSubject.asObservable();

  // savoir si audio est en cours de lecture ou pas
  private isPlayingSubject=new BehaviorSubject<boolean>(false)
  isPlaying$ = this.isPlayingSubject.asObservable();

  private currentTimeSubject = new BehaviorSubject<number>(0);
  currentTime$ = this.currentTimeSubject.asObservable();

  private durationSubject = new BehaviorSubject<number>(0);
  duration$ = this.durationSubject.asObservable();

  // Le constructeur est appelé une seule fois, lorsque le service est créé.
  constructor(){
    /*ecouter la fin de l'audio quand l'audio arrive à la fin le nvigateur
    déclenche onended angular exécute donc this.isPlayingsubject.next(false)
    Tous les composants sont immédiatement informés que la lecture est terminée.
    */

    this.audio.onended=()=>{
      this.isPlayingSubject.next(false)
    }

    // Écouter les erreurs d'audio (URL introuvable, format non pris en charge, etc.)
    this.audio.onerror = (e) => {
      console.error("Erreur de chargement audio :", this.audio.error);
      this.isPlayingSubject.next(false);
    };

    this.audio.ontimeupdate = () => {
    this.currentTimeSubject.next(this.audio.currentTime);
    };

    this.audio.onloadedmetadata = () => {
    this.durationSubject.next(this.audio.duration);
    };

  }

  // utile pour le clic sur la barre de progression
  seekTo(seconds: number): void {
    this.audio.currentTime = seconds;
  }

  //lancer un preche
  playPreche(preche:Preche):void{
    // on recupere le preche actuel
    const current = this.currentPrecheSubject.value;

    // on vérifie si le user a cliqué sur le même audio si oui on met l'audio en pause
    if(current?.id===preche?.id){
      this.togglePlayPause();
      return;
    }

    //lancer le nouveau preche
    this.currentPrecheSubject.next(preche);
    this.audio.src=preche.audioUrl;
    this.audio.load();
    this.audio.play()
    .then(() => this.isPlayingSubject.next(true))
    .catch(err => {
      console.error('Erreur lecture audio:', err);
      this.isPlayingSubject.next(false);
    });
 
  }

  togglePlayPause():void{
      if(!this.audio.src)return
      if(this.audio.paused){
        this.audio.play();
        this.isPlayingSubject.next(true)
      }else{
        this.audio.pause();
         this.isPlayingSubject.next(false)
      }
    }


    getCurrentpreche():Preche|null{
      return this.currentPrecheSubject.value;
    }

    //arrêter l'audio
    // Dans src/app/services/audio.service.ts

stop(): void {
  this.audio.pause();
  this.audio.currentTime = 0;
  this.currentPrecheSubject.next(null); // Réinitialise le prêche en cours (ferme le mini-player)
  this.isPlayingSubject.next(false);
  this.currentTimeSubject.next(0);
  this.durationSubject.next(0);
}




}
