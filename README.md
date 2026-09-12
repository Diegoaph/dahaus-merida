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

## Menús (PDF)

Los menús los diseña el cliente y viven en `public/` (4 archivos, reemplazables con el
mismo nombre y ruta, sin tocar código):

- `menu-hamburguesas.pdf` — hamburguesas crispy, clásicas, doppelt y especiales.
- `menu-platos.pdf` — parrillas, cortes de res y platos fuertes.
- `menu-bebidas.pdf` — cócteles, cervezas, batidos y más.
- `menu-simplex.pdf` — oferta "Simplex", solo lunes a viernes hasta las 7:00 PM.

Cada menú tiene su página con favicon y título propios (`menu-*.html` en `public/`) que
embebe el PDF en un iframe. Así la pestaña siempre muestra el favicon de Dahaus y un
título limpio en el navegador, aunque el archivo se reemplace. Si un PDF nuevo trae
metadato con basura (común en exports de diseño), corregir el title:
`exiftool -Title="Menú de Hamburguesas · Dahaus Mérida" public/menu-hamburguesas.pdf`.

## SEO generado en build

El plugin `seo/build-seo.ts` hace tres cosas en cada build:

1. Inyecta en `index.html` los datos estructurados (Organization + un bloque `Restaurant`
   por sede con horarios reales y `servesCuisine`). Horarios alineados con el Google
   Business Profile.
2. Genera `sitemap.xml` (página principal + los 4 menús).
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