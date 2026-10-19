import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  // RouterLink permite navegar entre rutas sin recargar la página.
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Input opcional: si el padre no pasa [title], se usa este valor por defecto.
  title = input<String>("Titulo por defecto");
}
