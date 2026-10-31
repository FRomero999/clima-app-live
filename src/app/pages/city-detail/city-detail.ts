import { Component, computed, inject, input } from '@angular/core';
import { CityCard } from '../../components/city-card/city-card';
import { CityService } from '../../service/city-service';
import { WeatherService } from '../../service/weather-service';

@Component({
  selector: 'app-city-detail',
  imports: [CityCard],
  templateUrl: './city-detail.html',
  styleUrl: './city-detail.css',
})
export class CityDetail {
  private readonly cityService = inject(CityService);
  private readonly weatherService = inject(WeatherService);

  readonly id = input.required<string>();
  readonly city = computed(() => this.cityService.getCity(this.id()));

  // Temperatura dummy de la ciudad actual; si no existe, devolvemos null.
  readonly temperature = computed(() => {
    const currentCity = this.city();

    // Evita llamar al servicio si el id no corresponde a ninguna ciudad.
    return currentCity ? this.weatherService.getWeather(currentCity) : null;
  });
}
