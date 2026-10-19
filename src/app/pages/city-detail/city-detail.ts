import { Component, input } from '@angular/core';

@Component({
  selector: 'app-city-detail',
  imports: [],
  templateUrl: './city-detail.html',
  styleUrl: './city-detail.css',
})
export class CityDetail {
  readonly id = input.required<string>();
  
}
