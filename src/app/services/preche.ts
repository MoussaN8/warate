import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Preche } from '../model/preche.model';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PrecheService {
  // j'injecte fireStore pour pouvoir communiquer avec la BD
  private firestore =inject(Firestore)

  // je fais une requête pour pouvoir récupérer les preches
  getPreches():Observable<Preche[]>{
    //on récupére la collection des preches puis l'id de chaque collection car par défaut firebase ne les envoie pas
    const precheRef = collection(this.firestore,'preches');
    return collectionData(precheRef,{idField:'id'}) as Observable<Preche[]>;

  }

}

