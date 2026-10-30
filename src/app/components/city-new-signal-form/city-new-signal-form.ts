import { Component, inject, signal } from '@angular/core';
import { FormField, FormRoot, form, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { CityInput } from '../../models/cityInput';
import { CityService } from '../../service/city-service';

@Component({
  selector: 'app-city-new-signal-form',
  // FormField conecta cada input con su campo; FormRoot gestiona el submit del formulario.
  imports: [FormField, FormRoot],
  templateUrl: './city-new-signal-form.html',
  styleUrl: './city-new-signal-form.css',
})
export class CityNewSignalForm {
  private readonly cityService = inject(CityService);
  private readonly router = inject(Router);

  // El modelo es un signal: cualquier cambio en el formulario actualiza este valor.
  readonly city = signal<CityInput>({ name: '', country: '', description: '', image: '' });

  // form() crea el árbol de campos y registra las reglas de validación.
  readonly cityForm = form(
    this.city,
    (path) => {
      required(path.name, { message: 'El nombre es obligatorio.' });
      minLength(path.name, 2, { message: 'Mínimo 2 caracteres.' });
      required(path.country, { message: 'El país es obligatorio.' });
    },
    {
      submission: {
        // FormRoot ejecuta esta acción solo cuando el formulario es válido.
        action: async (field) => {
          const created = this.cityService.addCityInput(field().value());
          await this.router.navigate(['/ciudad', created.id]);
        },
      },
    },
  );
}
