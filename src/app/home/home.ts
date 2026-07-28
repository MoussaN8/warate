import { Component, inject } from '@angular/core';
import { PrecheService } from '../services/preche';
import { Observable } from 'rxjs';
import { Preche } from '../model/preche.model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // j'injecte le service 
  precheService = inject(PrecheService)
  preches$!: Observable<Preche[]>

  ngOnInit(): void {
    this.preches$ = this.precheService.getPreches();
    
  }
}
