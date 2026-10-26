import { Component, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from '../../service/city-service';
import { CityInput } from '../../models/cityInput';

@Component({
  selector: 'app-city-new-ngmodel',
  imports: [FormsModule],
  templateUrl: './city-new-ngmodel.html',
  styleUrl: './city-new-ngmodel.css',
})
export class CityNewNgmodel {

  private readonly cityService = inject(CityService);
  private readonly router = inject(Router);

  // El modelo es un objeto normal, tipado con el mismo tipo que usa el servicio
  readonly city: CityInput = { name: '', country: '', description: '', image: '' };

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    // El componente no guarda: delega en el servicio
    const created = this.cityService.addCityInput(this.city);
    this.router.navigate(['/ciudad', created.id]);
  }

}
