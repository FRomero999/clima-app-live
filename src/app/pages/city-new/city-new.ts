import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CityNewNgmodel } from '../../components/city-new-ngmodel/city-new-ngmodel';
import { CityNewSignalForm } from '../../components/city-new-signal-form/city-new-signal-form';

@Component({
  selector: 'app-city-new',
  imports: [FormsModule, CityNewNgmodel, CityNewSignalForm],
  templateUrl: './city-new.html',
  styleUrl: './city-new.css',
})
export class CityNew {
}
