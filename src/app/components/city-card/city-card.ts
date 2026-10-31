import { Component, input, output } from '@angular/core';
import { City } from '../../models/city';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-city-card',
  imports: [RouterLink],
  templateUrl: './city-card.html',
  styleUrl: './city-card.css',
})

export class CityCard {
  // Input obligatorio: el padre debe pasar [city]="...". En plantilla se lee con city().
  city = input.required<City>();

  // Output que avisa al padre de que el usuario quiere quitar esta ciudad.
  // CityCard no borra directamente: solo emite el evento y el padre decide qué hacer.
  readonly remove = output<City>();

  // Maneja el clic del botón "Quitar" y emite la ciudad pulsada.
  requestRemove(event: MouseEvent): void {
    // Evita que el clic active el routerLink del <a> que envuelve la tarjeta.
    event.preventDefault();
    event.stopPropagation();

    // El padre (CityList) recibe la ciudad y se encarga de confirmar y borrar.
    this.remove.emit(this.city());
  }
}
