import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { City } from './models/city';
import { CityCard } from './components/city-card/city-card';


const mockCities: City[] = [
  { id: '1', name: 'Madrid', country: 'ES',  description: 'La capital', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Madrid_-_Plaza_Mayor_2012.jpg', savedAt: new Date(), favorite: true },
  { id: '2', name: 'Bilbao', country: 'ES', description: 'Norte lluvioso', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bilbao_05_2012_Guggenheim_Aerial_Panorama_2007.jpg', savedAt: new Date(), favorite: false },
  { id: '3', name: 'Valencia', country: 'ES', description: 'Ciudad del mar', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Valencia,_Ciudad_de_las_Ciencias_y_de_las_Artes.jpg', savedAt: new Date(), favorite: false },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CityCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal<string>('clima-app-live');

  readonly cities = signal<City[]>(mockCities);

}
