import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PrecheService } from '../services/preche';
import { Observable, BehaviorSubject } from 'rxjs';
import { Preche } from '../model/preche.model';
import { ChipModule } from 'primeng/chip';
import { BottomNavComponent } from "../components/bottom-nav/bottom-nav";
import { Navbar } from "../navbar/navbar";
import { AsyncPipe, NgClass } from '@angular/common';
import { AudioService } from '../services/audio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ChipModule, BottomNavComponent, Navbar, AsyncPipe, NgClass, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  precheService = inject(PrecheService);
  audioService = inject(AudioService);
  private cdr = inject(ChangeDetectorRef);
  heroPreche?: Preche;

  // Données
  allPreches: Preche[] = [];
  filteredPreches: Preche[] = [];
  oustazs: string[] = ['Tous'];

  // Filtres
  searchQuery: string = '';
  selectedOustaz: string = '';
  isLoading: boolean = true;

  ngOnInit(): void {
    this.precheService.getPreches().subscribe({
      next: (data) => {
        this.allPreches = data;

        // Générer la liste d'Oustazs sans doublons et filtrer les valeurs indéfinies
        const uniqueOustazs = Array.from(new Set(data.map((p) => p.oustaz).filter(Boolean)));
        this.oustazs = ['Tous', ...uniqueOustazs];

        // Calcul du heroPreche (Prêche de la semaine)
        if (data && data.length > 0) {
          const dureeRotationJour = 30;
          const millisecondeparJour = 1000 * 60 * 60 * 24;
          const indexActuel = Math.floor(Date.now() / (millisecondeparJour * dureeRotationJour));
          const selectedIndex = indexActuel % data.length;
          this.heroPreche = data[selectedIndex];
        }

        this.applyFilter();
        this.isLoading = false;

        // 3. Forcer la mise à jour du composant dès que les données sont là !
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des prêches :', err);
        this.isLoading = false;
      },
    });
  }

  toggleHeroPlay(preche: Preche): void {
    this.audioService.playPreche(preche);
  }

  isCurrentPlaying(precheId?: string): boolean {
    const current = this.audioService.getCurrentpreche();
    return current?.id === precheId;
  }

  applyFilter(): void {
    const query = this.searchQuery.trim().toLowerCase();

    this.filteredPreches = this.allPreches.filter((preche) => {
      const matchesQuery =
        !query ||
        preche.titre.toLowerCase().includes(query) ||
        preche.oustaz.toLowerCase().includes(query);

      const matchesOustaz = !this.selectedOustaz || preche.oustaz === this.selectedOustaz;

      return matchesQuery && matchesOustaz;
    });
  }

  selectOustaz(oustaz: string): void {
    this.selectedOustaz = oustaz === 'Tous' ? '' : oustaz;
    this.applyFilter();
  }
}