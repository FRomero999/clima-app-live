import { Component, inject } from '@angular/core';
import { CityCard } from '../city-card/city-card';
import { CityService } from '../../service/city-service';
import { City } from '../../models/city';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-city-list',
  imports: [CityCard, RouterLink],
  templateUrl: './city-list.html',
  styleUrl: './city-list.css',
})
export class CityList {
  // inject() pide el singleton de CityService (equivalente moderno al constructor).
  private readonly cityService = inject(CityService);
  // Se pasa el signal, no cities(): así la plantilla sigue reaccionando a los cambios.
  readonly cities = this.cityService.cities;

  // Recibe la ciudad que CityCard quiere quitar y pide confirmación antes de borrarla.
  removeCity(city: City): void {
    // confirm() devuelve true si el usuario acepta; si cancela, no se toca el servicio.
    if (confirm(`¿Seguro que quieres eliminar ${city.name}?`)) {
      // El servicio actualiza el signal; el effect se encarga de guardarlo en localStorage.
      this.cityService.removeCity(city.id);
    }
  }
}
