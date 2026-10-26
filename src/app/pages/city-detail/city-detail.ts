import { Component, computed, inject, input } from '@angular/core';
import { CityCard } from '../../components/city-card/city-card';
import { CityService } from '../../service/city-service';

@Component({
  selector: 'app-city-detail',
  imports: [CityCard],
  templateUrl: './city-detail.html',
  styleUrl: './city-detail.css',
})
export class CityDetail {
  private readonly cityService = inject(CityService);
  
  readonly id = input.required<string>();
  readonly city = computed(() => this.cityService.getCity(this.id()));  
}
