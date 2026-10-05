import { Component, input } from '@angular/core';
import { City } from '../../models/city';

@Component({
  selector: 'app-city-card',
  imports: [],
  templateUrl: './city-card.html',
  styleUrl: './city-card.css',
})

export class CityCard {
  // Input obligatorio: el padre debe pasar [city]="...". En plantilla se lee con city().
  city = input.required<City>();
}
