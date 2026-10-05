import { Injectable, signal } from '@angular/core';
import { City } from '../models/city';

const mockCities: City[] = [
  { id: '1', name: 'Madrid', country: 'ES',  description: 'La capital', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Madrid_-_Plaza_Mayor_2012.jpg', savedAt: new Date(), favorite: true },
  { id: '2', name: 'Bilbao', country: 'ES', description: 'Norte lluvioso', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bilbao_05_2012_Guggenheim_Aerial_Panorama_2007.jpg', savedAt: new Date(), favorite: false },
  { id: '3', name: 'Valencia', country: 'ES', description: 'Ciudad del mar', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Valencia,_Ciudad_de_las_Ciencias_y_de_las_Artes.jpg', savedAt: new Date(), favorite: false },
];


@Injectable({
  providedIn: 'root',
})

export class CityService {

  readonly cities = signal<City[]>(mockCities);

  addCity(city: City) {
    this.cities.update(cities => [...cities, city]);
  }

  removeCity(id: string) {
    this.cities.update(cities => cities.filter(city => city.id !== id));
  }
  
  updateCity(city: City) {
    this.cities.update(cities => cities.map(c => c.id === city.id ? city : c));
  }

  getCity(id: string) {
    return this.cities().find(city => city.id === id);
  }
  
  
}
