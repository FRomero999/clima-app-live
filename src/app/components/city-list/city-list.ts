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
  // inject() pide el singleton de CityService (equivalente moderno al constructor).
  private readonly cityService = inject(CityService);
  // Se pasa el signal, no cities(): así la plantilla sigue reaccionando a los cambios.
  readonly cities = this.cityService.cities;
}
