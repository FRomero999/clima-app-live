# Clima-App

Aplicación educativa hecha con **Angular 21** para listar ciudades y ver información meteorológica básica. No usa una API real: las ciudades se guardan en `localStorage` y el tiempo es un dato dummy.

El objetivo del proyecto es que el alumno pueda localizar y comparar varias formas de trabajar con Angular moderno: componentes standalone, signals, inputs/outputs, rutas lazy, formularios con `ngModel` y formularios con Signal Forms.

## Stack

- Angular 21.2
- TypeScript 5.9 en modo `strict`
- Tailwind CSS v4
- Vitest + jsdom para tests unitarios
- Prettier: 100 columnas y comillas simples

## Puesta en marcha

```bash
npm install
npm start
```

La app queda disponible en `http://localhost:4200`.

Otros comandos:

```bash
npm run build
npm test
```

`npm run build` es la única verificación de tipos y plantillas: no hay scripts de lint ni de typecheck. No hay target e2e configurado, así que `ng e2e` no funciona.

## Estructura del proyecto

```text
src/
  main.ts
  styles.css
  app/
    app.ts / app.html / app.css
    app.config.ts
    app.routes.ts
    models/
      city.ts
      cityInput.ts
    service/
      city-service.ts
      weather-service.ts
    pages/
      home/
      about/
      city-new/
      city-detail/
    components/
      header/
      footer/
      city-list/
      city-card/
      city-new-ngmodel/
      city-new-signal-form/
```

### Punto de entrada

- `src/main.ts`: arranca la aplicación con `bootstrapApplication(App, appConfig)`.
- `src/app/app.ts`: componente raíz. Pinta `Header`, `<router-outlet>` y `Footer`.
- `src/app/app.config.ts`: configuración global. Registra `provideRouter` y `withComponentInputBinding`.
- `src/app/app.routes.ts`: rutas de la aplicación, todas con `loadComponent` (lazy loading).

### Páginas

| Página | Ruta | Archivo | Qué hace |
| --- | --- | --- | --- |
| `Home` | `/` | `pages/home/` | Muestra el listado de ciudades mediante `CityList`. |
| `About` | `/acerca-de` | `pages/about/` | Página informativa estática. |
| `CityNew` | `/ciudad/nueva` | `pages/city-new/` | Muestra dos formularios de alta: uno con `ngModel` y otro con Signal Forms. |
| `CityDetail` | `/ciudad/:id` | `pages/city-detail/` | Busca la ciudad por id, muestra su tarjeta y la temperatura dummy. |

La ruta `**` redirige a `/`, y está colocada al final para actuar como comodín.

### Componentes

| Componente | Archivo | Responsabilidad |
| --- | --- | --- |
| `Header` | `components/header/` | Cabecera y navegación con `RouterLink`. Recibe `title` como `input()`. |
| `Footer` | `components/footer/` | Pie de página estático. |
| `CityList` | `components/city-list/` | Lee el signal de ciudades, recorre el array con `@for` y gestiona el borrado. |
| `CityCard` | `components/city-card/` | Tarjeta de una ciudad. Recibe `city` como `input()` y emite `(remove)` al pulsar "Quitar". |
| `CityNewNgmodel` | `components/city-new-ngmodel/` | Formulario de alta con `FormsModule`, `NgForm` y `[(ngModel)]`. |
| `CityNewSignalForm` | `components/city-new-signal-form/` | Formulario de alta con Signal Forms: `form()`, `FormField`, `FormRoot`, `required` y `minLength`. |

La página `city-new` renderiza las dos variantes del formulario para que se puedan comparar. `CityNewNgmodel` no es una página: es un componente reutilizable usado por `CityNew`.

`CityCard` también se usa en `CityDetail`. Allí no hay ningún listener para `(remove)`, así que el botón "Quitar" no tiene efecto en esa pantalla; el borrado solo está conectado en `CityList`.

### Servicios

| Servicio | Archivo | Responsabilidad |
| --- | --- | --- |
| `CityService` | `service/city-service.ts` | Fuente de verdad de las ciudades. Expone el signal `cities`, carga datos mock o de `localStorage`, añade, elimina, actualiza y busca ciudades. |
| `WeatherService` | `service/weather-service.ts` | Servicio dummy de meteorología. `getWeather(city)` devuelve siempre `22` °C. |

`CityService` está declarado con `providedIn: 'root'`, así que Angular crea una única instancia compartida. Sus métodos principales son:

- `addCity(city)`: añade una ciudad ya construida.
- `addCityInput(cityInput)`: crea una `City` completa con `id`, `savedAt` y `favorite`.
- `removeCity(id)`: elimina la ciudad por id.
- `updateCity(city)`: sustituye una ciudad por su versión actualizada.
- `getCity(id)`: devuelve una ciudad o `undefined`.

Actualmente `addCityInput` se usa desde los formularios, `removeCity` desde `CityList` y `getCity` desde `CityDetail`. `addCity` y `updateCity` existen pero no están conectados a la interfaz.

`WeatherService` todavía no consulta ninguna API: siempre devuelve la misma temperatura. Se usa en `CityDetail` para mostrar `Temperatura actual: 22 °C`.

### Modelos

- `models/city.ts`: interfaz `City` con `id`, `name`, `country`, `description`, `image`, `savedAt` y `favorite`.
- `models/cityInput.ts`: interfaz `CityInput` con los campos que rellena el formulario. No incluye `id`, `savedAt` ni `favorite` porque los genera el servicio.

## Flujo de datos

1. `CityService` se crea una sola vez y carga las ciudades desde `localStorage`.
2. Si no hay datos guardados, usa `mockCities`.
3. `Home` renderiza `CityList`, que lee `cityService.cities` y pinta una `CityCard` por ciudad.
4. Al pulsar "Quitar", `CityCard` emite `(remove)` con la ciudad. `CityList` pide confirmación con `confirm()` y llama a `CityService.removeCity()`.
5. `CityService` actualiza el signal con un array nuevo. El `effect()` del servicio guarda el resultado en `localStorage`.
6. Al crear una ciudad desde un formulario, `CityService.addCityInput()` genera los campos que faltan y el formulario navega al detalle.
7. `CityDetail` recibe el `:id` como `input.required<string>()` gracias a `withComponentInputBinding()`, busca la ciudad con `computed()` y pide la temperatura a `WeatherService`.

La clave usada en `localStorage` es `clima-app.cities`. Al leerla, `savedAt` se convierte de string ISO a `Date`, porque JSON no conserva tipos.

## Características de Angular

| Característica | Dónde localizarla | Para qué se usa |
| --- | --- | --- |
| Componentes standalone | Todos los componentes, por ejemplo `app.ts` | Cada componente declara sus `imports`; no hay `NgModule`. |
| `bootstrapApplication` | `src/main.ts` | Arranca la aplicación sin módulo raíz. |
| `ApplicationConfig` | `app.config.ts` | Agrupa los providers globales. |
| `provideBrowserGlobalErrorListeners` | `app.config.ts` | Registra listeners globales de errores del navegador. |
| `provideRouter` | `app.config.ts` | Conecta el array de rutas con el Router. |
| `loadComponent` (lazy loading) | `app.routes.ts` | Carga cada página solo cuando se visita su ruta. |
| `withComponentInputBinding` | `app.config.ts` y `city-detail.ts` | Hace que el parámetro `:id` llegue como `input.required<string>()`. |
| `RouterOutlet` | `app.html` | Pinta el componente de la ruta activa. |
| `RouterLink` | `header.html`, `city-list.html` | Navega entre rutas sin recargar la página. |
| `signal()` | `app.ts`, `city-service.ts`, `city-new-signal-form.ts` | Guarda estado reactivo: título, lista de ciudades y modelo del formulario. |
| `computed()` | `city-detail.ts` | Deriva la ciudad actual y su temperatura a partir de otros signals. |
| `input()` | `header.ts`, `city-card.ts`, `city-detail.ts` | Declara entradas de componentes. `city` e `id` son obligatorios. |
| `output()` | `city-card.ts` | Emite `(remove)` para avisar al padre sin acoplarse al servicio. |
| `inject()` | `city-list.ts`, `city-detail.ts`, formularios | Obtiene servicios y Router sin usar constructor. |
| `effect()` | `city-service.ts` | Ejecuta un efecto secundario: guardar el signal en `localStorage`. |
| `update()` de signals | `city-service.ts` | Actualiza arrays devolviendo arrays nuevos (inmutabilidad). |
| Control flow `@if` / `@else` | `city-detail.html`, formularios, `city-list.html` | Muestra u oculta bloques según condiciones. |
| Control flow `@for` con `track` | `city-list.html`, `city-new-signal-form.html` | Recorre ciudades y errores de validación. |
| Bloque `@empty` | `city-list.html` | Muestra un mensaje cuando no hay ciudades. |
| Signal Forms | `city-new-signal-form.ts` y `.html` | Crea el formulario con `form()`, lo conecta con `[formRoot]` y `[formField]` y valida con `required`/`minLength`. |
| Formularios template-driven | `city-new-ngmodel.ts` y `.html` | Usa `FormsModule`, `NgForm`, `[(ngModel)]` y `#campo="ngModel"`. |
| Servicios `providedIn: 'root'` | `city-service.ts`, `weather-service.ts` | Singleton inyectable en toda la app sin declararlo en `providers`. |
| Tailwind CSS v4 | `src/styles.css`, `.postcssrc.json` y plantillas | Aplica estilos con clases utilitarias; no hay `tailwind.config`. |
| Vitest + jsdom | `*.spec.ts`, `package.json` | Ejecuta tests unitarios sin navegador. |
| TypeScript `strict` | `tsconfig.json` | Activa comprobaciones estrictas de tipos. |
| `crypto.randomUUID()` | `city-service.ts` | Genera ids únicos para las ciudades nuevas. |

## Estilos

Tailwind se importa globalmente en `src/styles.css`:

```css
@import 'tailwindcss';
```

PostCSS lo procesa mediante `.postcssrc.json` y el plugin `@tailwindcss/postcss`. Los estilos se aplican directamente con clases en las plantillas.

## Tests

Los specs usan Vitest con `describe`, `it` y `expect` globales, y `TestBed` de Angular.

```bash
npm test
```

Para ejecutar un solo spec:

```bash
npx ng test --include src/app/service/city-service.spec.ts --watch=false
```

Nota: `src/app/app.spec.ts` todavía espera el texto antiguo `Hello, clima-app-live`; ese test puede fallar hasta que se actualice a la plantilla actual.

## Resumen para el alumno

Si quieres repasar Angular, empieza por este orden:

1. `src/main.ts` y `app.config.ts` para ver el arranque standalone.
2. `app.routes.ts` para entender las rutas lazy.
3. `city-service.ts` para signals, `update()` y `effect()`.
4. `city-list.ts` y `city-card.ts` para `inject()`, `input()` y `output()`.
5. `city-detail.ts` para `withComponentInputBinding()` y `computed()`.
6. Los dos formularios de `city-new` para comparar `ngModel` con Signal Forms.
