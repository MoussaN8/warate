import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MiniPlayerComponent } from "./components/mini-player/mini-player";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MiniPlayerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('warate');
}
