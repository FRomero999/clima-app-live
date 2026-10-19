import { Component } from '@angular/core';
import { CityList } from '../../components/city-list/city-list';

@Component({
  selector: 'app-home',
  imports: [CityList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
