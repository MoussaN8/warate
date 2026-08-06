import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from "@angular/router";
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink,RouterLinkActive,NgClass
    
  ],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css',
})
export class BottomNavComponent {
  activeTab: string = 'accueil';

  setTab(tab: string): void {
    this.activeTab = tab;
  }
}
