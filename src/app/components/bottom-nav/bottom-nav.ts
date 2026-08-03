import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-nav',
  imports: [],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css',
})
export class BottomNavComponent {
  activeTab: string = 'accueil';

  setTab(tab: string): void {
    this.activeTab = tab;
  }
}
