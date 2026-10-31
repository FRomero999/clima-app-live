import { TestBed } from '@angular/core/testing';

import { City } from '../models/city';
import { WeatherService } from './weather-service';

describe('WeatherService', () => {
  let service: WeatherService;

  // Ciudad mínima para comprobar que el método acepta el parámetro requerido.
  const dummyCity: City = {
    id: '1',
    name: 'Madrid',
    country: 'España',
    description: 'Ciudad dummy',
    image: '',
    savedAt: new Date(),
    favorite: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the dummy temperature for the requested city', () => {
    // Dummy: siempre debe devolver el mismo valor, independientemente de la ciudad.
    expect(service.getWeather(dummyCity)).toBe(22);
  });
});
