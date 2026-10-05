import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';


@Component({
  selector: 'app-root',
  // RouterOutlet pinta la ruta activa; Header y Footer se quedan fijos alrededor.
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  title = signal<string>('clima-app-live');
}
