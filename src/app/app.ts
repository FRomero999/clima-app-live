import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { CityList } from './components/city-list/city-list';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CityList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  title = signal<string>('clima-app-live');
}
