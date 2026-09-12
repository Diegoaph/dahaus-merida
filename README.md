# DAHAUS Mérida

Landing premium de una sola página: hamburguesas premium junto a las canchas de padel de
Mérida. React 19 + Vite + CSS Modules (SCSS) + Firebase Hosting.

## Stack y arquitectura

- **React 19 + Vite**, SPA estática sin backend. El SEO crítico se embeve en el build
  (nada se genera en el navegador).
- **CSS Modules con SCSS**. Design tokens en `src/styles/_variables.scss`. Sin frameworks CSS.
- **Firebase Hosting** sirve la carpeta `dist`.

```
src/
  config.ts                 Configuración build-time tipada (desde .env)
  components/               Navbar, Hero, PadelBand, Locations, Menu, Delivery, Events, Footer, Whatsapp, OpeningBadge, MapEmbed
  hooks/useOpenNow.ts       Horarios reales por sede (zona America/Caracas)
  styles/                   _variables (tokens), _mixins, global
seo/build-seo.ts            Plugin Vite: JSON-LD por sede, sitemap.xml y llms.txt
```

## Puesta en marcha

```bash
npm install
cp .env.example .env      # ajustar valores si cambian
npm run dev               # desarrollo
npm run build             # build de producción (gate del proyecto)
npm run preview           # servir el build localmente
```

## Configuración build-time (.env)

Todo lo que puede cambiar sin tocar código vive en `.env` (ver `.env.example`):

- Número y mensajes de WhatsApp (pedido / evento).
- Instagram, dominio, rutas del menú.
- Crédito de desarrollo (nombre y URL del estudio).
- Enlaces de mapas (cortos para botones y de embebido para iframes).

## Menú (PDF)

Hay dos menús, ambos generados por el script `scripts/generate-menu.py` (reportlab)
a partir de los datos en `menu-assets/`:

- `public/menu.pdf` — menú completo, todas las sedes (`menu-assets/dahaus.json`).
- `public/menu-simplex.pdf` — oferta "Simplex", solo lunes a viernes hasta las 7:00 PM
  (`menu-assets/simplex.json`).

Para actualizarlos:

```bash
python3 scripts/generate-menu.py
exiftool -Title="Menú Dahaus Mérida" -Author="Dahaus Mérida" public/menu.pdf
exiftool -Title="Menú Simplex · Lunes a Viernes hasta 7:00 PM" -Author="Dahaus Mérida" public/menu-simplex.pdf
```

Las fuentes de los menús viven en `menu-assets/fonts/` (Bangers + Lato, licencia OFL).
El script está fuera del gate de build: `npm run build` no regenera PDFs; los archivos
generados se commitean.

Los botones de menú abren páginas estáticas con favicon y título propios:
`public/menu.html` embebe `menu.pdf` y `public/menu-simplex.html` embebe
`menu-simplex.pdf`. Así la pestaña siempre muestra el favicon de Dahaus y un título
limpio en el navegador, aunque el PDF se reemplace.

## SEO generado en build

El plugin `seo/build-seo.ts` hace tres cosas en cada build:

1. Inyecta en `index.html` los datos estructurados (Organization + un bloque `Restaurant`
   por sede con horarios reales y `servesCuisine`). Horarios alineados con el Google
   Business Profile.
2. Genera `sitemap.xml` (página principal + `menu.pdf` + `menu-simplex.pdf`).
3. Genera `llms.txt` (H1, resumen y links clave).

El robots.txt es estático en `public/` y permite explícitamente GPTBot, ClaudeBot,
PerplexityBot y otros crawlers de IA.

## Despliegue

```bash
npm run build
firebase deploy --only hosting
```

El hosting ignora la carpeta `.originals` (originales de imagen que viven en el repo pero
no se publican). La identidad del proyecto Firebase está en `.firebaserc`.

## Reglas del proyecto

- `npm run build` es el gate: debe pasar sin errores ni warnings de Sass/TS.
- Sin em-dash ni flechas decorativas en el copy. Sin animaciones de reveal/scroll.
  A lo sumo micro-transiciones de hover y el pulse del FAB de WhatsApp.
- Contraste AA, foco visible ámbar, navegación por teclado y `prefers-reduced-motion`
  respetados. Documentación extendida en `AI_CODING_GUIDELINES.md` y `STYLE_GUIDE.md`.

## Crédito

Desarrollo web: [DesarrollosDigitalPower.com](https://desarrollosdigitalpower.com).