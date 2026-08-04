import { Component, inject, model, OnInit } from '@angular/core';
import { Preche } from '../model/preche.model';
import { PrecheService } from '../services/preche';
import { AudioService } from '../services/audio';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search-component',
  imports: [FormsModule],
  templateUrl: './search-component.html',
  styleUrl: './search-component.css',
})
export class SearchComponent implements OnInit {
  private precheService = inject(PrecheService);
  public audioService = inject(AudioService);

  // Données
  allPreches: Preche[] = []; // Source originale (non modifiée)
  filteredPreches: Preche[] = []; // Résultats filtrés affichés à l'écran

  oustazs: string[] = ['tous'];

  // Filtres
  searchQuery: string = '';
  selectedOustaz: string = '';

  isLoading: boolean = true;

  ngOnInit(): void {
    // 1. Un seul abonnement Firestore pour récupérer tous les prêches
    this.precheService.getPreches().subscribe({
      next: (data) => {
        this.allPreches = data;
        this.oustazs = ['Tous', ...new Set(data.map((preche) => preche.oustaz))];
        this.applyFilter(); // Filtrage initial
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des prêches :', err);
        this.isLoading = false;
      },
    });
  }

  // 2. Application dynamique des filtres en mémoire
  applyFilter(): void {
    const query = this.searchQuery.trim().toLowerCase();

    this.filteredPreches = this.allPreches.filter((preche) => {
      // Filtre texte (Titre OU Oustaz OU Thème)
      const matchesQuery =
        !query ||
        preche.titre.toLowerCase().includes(query) ||
        preche.oustaz.toLowerCase().includes(query);

      // Filtre par oustaz sélectionné
      const matchesOustaz = !this.selectedOustaz || preche.oustaz === this.selectedOustaz;

      return matchesQuery && matchesOustaz;
    });
  }

  // 3. Gestionnaires d'événements

  selectOustaz(oustaz: string): void {
    this.selectedOustaz = oustaz === 'Tous' ? '' : oustaz;
    this.applyFilter();
  }

  playPreche(preche: Preche): void {
    this.audioService.playPreche(preche);
  }
}
