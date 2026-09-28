import { Component, input } from '@angular/core';
import { City } from '../../models/city';

@Component({
  selector: 'app-city-card',
  imports: [],
  templateUrl: './city-card.html',
  styleUrl: './city-card.css',
})

export class CityCard {
  city = input.required<City>();

}
