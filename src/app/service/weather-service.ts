import { Injectable } from '@angular/core';
import { City } from '../models/city';

// Servicio dummy de meteorología: por ahora solo expone la temperatura.
@Injectable({ providedIn: 'root' })
export class WeatherService {
  // Recibe la ciudad para dejar preparada la firma, aunque el dato siga siendo dummy.
  getWeather(city: City): number {
    // La ciudad todavía no se usa: siempre devolvemos la misma temperatura en grados Celsius.
    return 22;
  }
}
