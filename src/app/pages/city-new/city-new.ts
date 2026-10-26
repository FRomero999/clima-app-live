import { Component, inject } from '@angular/core';
import { CityService } from '../../service/city-service';
import { CityInput } from '../../models/cityInput';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-new',
  imports: [FormsModule],
  templateUrl: './city-new.html',
  styleUrl: './city-new.css',
})
export class CityNew {
   private readonly cityService = inject(CityService);
   private readonly router = inject(Router);

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
