import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Input opcional: si el padre no pasa [title], se usa este valor por defecto.
  title = input<String>("Titulo por defecto");
}
