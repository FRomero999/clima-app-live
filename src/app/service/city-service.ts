import { Injectable, effect, signal } from '@angular/core';
import { City } from '../models/city';
import { CityInput } from '../models/cityInput';

const mockCities: City[] = [
  { id: '1', name: 'Madrid', country: 'ES',  description: 'La capital', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Madrid_-_Plaza_Mayor_2012.jpg', savedAt: new Date(), favorite: true },
  { id: '2', name: 'Bilbao', country: 'ES', description: 'Norte lluvioso', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bilbao_05_2012_Guggenheim_Aerial_Panorama_2007.jpg', savedAt: new Date(), favorite: false },
  { id: '3', name: 'Valencia', country: 'ES', description: 'Ciudad del mar', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Valencia,_Ciudad_de_las_Ciencias_y_de_las_Artes.jpg', savedAt: new Date(), favorite: false },
];

const STORAGE_KEY = 'clima-app.cities';

// Lee las ciudades guardadas. Si no hay nada en localStorage, devuelve los mocks.
// JSON no conserva tipos: savedAt se guarda como string ISO y aquí lo reconstruimos como Date.
function loadCities(): City[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return mockCities;
  }

  return (JSON.parse(stored) as City[]).map((city) => ({
    ...city,
    savedAt: new Date(city.savedAt),
  }));
}

// Un único servicio compartido en toda la app (no hace falta declararlo en providers).
@Injectable({
  providedIn: 'root',
})

export class CityService {

  // Fuente de verdad reactiva: si cambia, los componentes que leen cities() se actualizan solos.
  readonly cities = signal<City[]>(loadCities());

  constructor() {
    // effect() se ejecuta al menos una vez al crear el servicio y se vuelve a ejecutar
    // cada vez que cambia algún signal que se lea dentro. Aquí leemos this.cities(),
    // así que Angular registra esa dependencia y repite el effect cuando el array cambia.
    // La primera ejecución guarda el estado inicial (los mocks si no había nada guardado);
    // las siguientes guardan el resultado de cada add/remove/update.
    // Es un efecto secundario: la fuente de verdad sigue siendo el signal, no localStorage.
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cities()));
    });
  }

  // Añade una ciudad ya construida; el effect se encarga de persistir el array resultante.
  addCity(city: City) {
    // update() recibe el valor actual y debe devolver un array NUEVO (inmutabilidad).
    this.cities.update(cities => [...cities, city]);
  }

  // Crea una City completa a partir de los datos del formulario: genera id, savedAt y favorite.
  // Devuelve la ciudad creada para que el formulario pueda navegar a su detalle.
  addCityInput(city: CityInput) {
    const newCity: City = {
      ...city,
      id: crypto.randomUUID(),
      savedAt: new Date(),
      favorite: false,
    };
    
    this.cities.update(cities => [...cities, newCity]);
    return newCity;
  }
  
  // Elimina la ciudad cuyo id coincide y deja que el effect guarde el nuevo array.
  removeCity(id: string) {
    this.cities.update(cities => cities.filter(city => city.id !== id));
  }
  
  // Sustituye la ciudad con el mismo id por la versión actualizada.
  updateCity(city: City) {
    this.cities.update(cities => cities.map(c => c.id === city.id ? city : c));
  }

  // Busca una ciudad por id. Devuelve una "foto" del array actual, no un signal.
  getCity(id: string) {
    // cities() lee el valor actual del signal (no es un array “vivo”, es una foto en este instante).
    return this.cities().find(city => city.id === id);
  }
  
  
}
