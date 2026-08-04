import { Component, inject } from '@angular/core';
import { DownloadService } from '../services/download-service';
import { AsyncPipe, NgClass } from '@angular/common';
import { AudioService } from '../services/audio';
import { Preche } from '../model/preche.model';
import { BottomNavComponent } from "../components/bottom-nav/bottom-nav";

@Component({
  selector: 'app-hors-ligne',
  imports: [AsyncPipe, NgClass, BottomNavComponent],
  templateUrl: './hors-ligne.html',
  styleUrl: './hors-ligne.css',
})
export class HorsLigne {
  downloadService = inject(DownloadService)
  audioService=inject(AudioService)

  isCurrentPlaying(precheId: string): boolean {
    const current = this.audioService.getCurrentpreche();
    return current?.id === precheId;
  }

  async removeDownload(event: Event, preche: Preche): Promise<void> {
    event.stopPropagation();
    await this.downloadService.removeDownload(preche);
  }
}
