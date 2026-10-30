# Clima-App

App Angular 21 para listar ciudades. Usa datos mock persistidos en `localStorage`: no hay API real.

## Comandos
- `npm install` — Node 24; `packageManager` declara `npm@12.0.2`.
- `npm start` — dev server en http://localhost:4200.
- `npm run build` — build de producción. Es la única verificación de tipos y plantillas (no hay scripts de lint ni typecheck).
- `npm test` — Vitest con jsdom; no necesita navegador.
- Un solo spec: `npx ng test --include src/app/service/city-service.spec.ts --watch=false`.
- Filtrar por nombre: `npx ng test --filter CityService --watch=false`.
- No hay target e2e configurado; `ng e2e` no funciona.

## Arquitectura
- Bootstrap: `src/main.ts` → `App` (`src/app/app.ts`). `App` pinta `Header`, `<router-outlet>` y `Footer`.
- Rutas en `src/app/app.routes.ts`, todas con `loadComponent` (lazy): `/`, `/acerca-de`, `/ciudad/nueva`, `/ciudad/:id`, `**`.
- `provideRouter(..., withComponentInputBinding())` en `app.config.ts`: el parámetro `:id` llega como `input.required<string>()` en `CityDetail`, no vía `ActivatedRoute`.
- Estado global: `CityService` (`providedIn: 'root'`) con `signal<City[]>`. Los cambios se hacen con `update()` devolviendo arrays nuevos; un `effect()` en el constructor guarda el array en `localStorage`.
- `pages/` contiene componentes enrutados; `components/` contiene piezas reutilizables.
- `components/city-new-ngmodel/` es un duplicado NO enrutado del formulario. El formulario real es `pages/city-new/`.
- `components/city-new-signal-form/` usa Signal Forms (`@angular/forms/signals`) y aún no tiene ruta.
- Los formularios usan `FormsModule`/`NgForm`; el alta pasa por `CityService.addCityInput()`, que genera `id`, `savedAt` y `favorite`.
- El botón "Quitar" de `city-card` no está conectado; `removeCity()` y `updateCity()` existen pero no se usan.

## Estilo
- Componentes standalone (sin NgModules); `inject()`, `input()`, `signal()`, `computed()` y control flow `@if`/`@for`.
- Plantillas y estilos en archivos externos (`templateUrl`, `styleUrl`).
- Tailwind v4: `@import 'tailwindcss'` en `src/styles.css` + `.postcssrc.json`. No hay `tailwind.config`; usa clases utilitarias en las plantillas.
- Prettier: 100 columnas y comillas simples. No hay script `format`: `npx prettier --write <archivo>`.
- Variables y código en inglés; textos de UI en español.

## Reglas del proyecto (educativo)
- Explica el código antes de implementarlo.
- Incluye comentarios siempre; esta regla prevalece sobre el estilo por defecto del agente.
- Usa Angular moderno siempre (signals, etc.).

## Tests
- Specs con Vitest (`describe`/`it`/`expect` globales) y `TestBed`.
- `src/app/app.spec.ts` espera el texto antiguo `Hello, clima-app-live`; la plantilla actual no lo renderiza, así que ese spec falla hasta actualizarlo.
