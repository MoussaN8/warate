import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { Preche } from '../model/preche.model';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  //on définit le cache l'espace où sera stocké les téléchargements
  private CACHE_NAME = "audio-preches-cache";
  private readonly STORAGE_KEY = 'warate_downloads';


  private downloadedBehavioSubject = new BehaviorSubject<Preche[]>(this.listPrecheDownloaded())
  downloadedPreche$ = this.downloadedBehavioSubject.asObservable();

  // Charger la liste des prêches téléchargés sauvegardée dans localStorage
  listPrecheDownloaded():Preche[]{
    const list = localStorage.getItem(this.STORAGE_KEY);
    return list ? JSON.parse(list) : [];
  }

  //enregistrer l'audio au niveau du cache; permettre le telechargement
  async downloadPreche(preche:Preche):Promise<void>{
    if(!('caches' in window)){
      alert("Votre navigateur ne prend pas en charge le stockage hors-ligne.");
      return
    }
    try{
      const cache = await caches.open(this.CACHE_NAME)
      await cache.add(preche.audioUrl)
       const currentList = this.downloadedBehavioSubject.value
       if(!currentList.some(p=>p.id===preche.id)){
        const updated = [...currentList,preche];
        localStorage.setItem(this.STORAGE_KEY,JSON.stringify(updated));
        this.downloadedBehavioSubject.next(updated)
       }
    }catch(error){
      console.log('Erreur lors du téléchargement :', error);
    }
    
  }

  // Supprimer du cache et du localStorage
  async removeDownload(preche:Preche):Promise<void>{
    if('caches' in window){
      const cache = await caches.open(this.CACHE_NAME);
      await cache.delete(preche.audioUrl);
    }
    // on met à jour le local sttorage et le cache
    const updated = this.downloadedBehavioSubject.value.filter(p=>p.id!= preche.id)
    localStorage.setItem(this.STORAGE_KEY,JSON.stringify(updated));
    this.downloadedBehavioSubject.next(updated);
  }

  isDownloaded(preche:Preche):boolean{
    return this.downloadedBehavioSubject.value.some(p=>p.id===preche.id);
  }


}
