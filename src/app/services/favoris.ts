import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { Preche } from '../model/preche.model';

@Injectable({
  providedIn: 'root',
})
export class FavorisService {
  // je définit la clé du local storage
  private STORAGE_KEY = "warate_favoris";
  
  private favorisSubject = new BehaviorSubject<Preche[]>(this.loadFavorisWarateFromStorage())
  favorisWarate$ = this.favorisSubject.asObservable();

  //on charge les favoris déja présent
  private loadFavorisWarateFromStorage():Preche[]{
    // je récupère les favoris dns cette favoris
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveFavorisToLocalStorage(preche:Preche[]):void{
    localStorage.setItem(this.STORAGE_KEY,JSON.stringify(preche));
    this.favorisSubject.next(preche);
  }

  toggleFavoris(preche:Preche):void{
    // je récupère tous les favoris d'abord
    const current = this.favorisSubject.value;
    // je vérifie si c'est déja en favoris
    const exist = current.some(f=>f.id===preche.id);
    let update :Preche[]
    if(exist){
      update = current.filter(f=>f.id != preche.id);
      
    }else{
      update = [...current,preche]
    }
    this.saveFavorisToLocalStorage(update)
  }

  isFavoris(preche:Preche):boolean{
    return this.favorisSubject.value.some(f=>f.id===preche.id);
  }

  getFavoris():Preche[]{
    return this.favorisSubject.value;
  }


}
