import { Component, inject } from '@angular/core';
import { CityCard } from '../city-card/city-card';
import { CityService } from '../../service/city-service';

@Component({
  selector: 'app-city-list',
  imports: [CityCard],
  templateUrl: './city-list.html',
  styleUrl: './city-list.css',
})
export class CityList {
  private readonly cityService = inject(CityService);
  readonly cities = this.cityService.cities;
}
