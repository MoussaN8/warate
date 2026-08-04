import { Component, inject } from '@angular/core';
import { AudioService } from '../../services/audio';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FavorisService } from '../../services/favoris';
import { DownloadService } from '../../services/download-service';
@Component({
  selector: 'app-mini-player',
  imports: [AsyncPipe],
  templateUrl: './mini-player.html',
  styleUrl: './mini-player.css',
})
export class MiniPlayerComponent {
  public audioService = inject(AudioService);
  public favorisService = inject(FavorisService)
  public downloadService = inject(DownloadService)
  isFavorite: boolean = false;

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    
  }

  //on formate le temps
  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
