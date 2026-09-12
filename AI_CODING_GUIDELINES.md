# Lineamientos para agentes de IA (DAHAUS)

Este documento debe leerse antes de tocar el proyecto. Define el sistema de diseño, la
arquitectura y las reglas que mantienen el landing premium, consistente y desplegable.

## Descripción general

- Landing de una página (SPA) de DAHAUS Mérida: hamburguesas premium junto a las canchas
  de padel, con delivery por WhatsApp como objetivo comercial.
- Stack: React 19 + Vite + CSS Modules (SCSS) + Firebase Hosting. Sin backend. SEO
  embebido en build.
- Prohibido: Tailwind CSS, Next.js, frameworks CSS adicionales, rutas multi-página.

## Orden de secciones (no cambiar sin avisar)

1. Navbar sticky
2. Hero (full-bleed, CTAs Ver menú / Pide por WhatsApp)
3. Banda padel (fondo padel-green)
4. Sedes (Garana, Metroatletik + teaser de Deck)
5. Menú (PDF)
6. Delivery (banda carbon-ink)
7. Eventos
8. Footer + FAB de WhatsApp (siempre visible)

## Tokens (fuente única: `src/styles/_variables.scss`)

| Tokens CSS | Valor | Rol |
|---|---|---|
| `--color-carbon-ink` | `#1c1a17` | Texto, bordes, trazos |
| `--color-canvas-sand` | `#f0e9db` | Superficie base |
| `--color-cement` | `#dbd6cb` | Superficie secundaria |
| `--color-woodstone` | `#6b4f33` | Acento decorativo de baja frecuencia |
| `--color-mustard-amber` | `#ffc107` | CTA y foco visible |
| `--color-padel-green` | `#8fa83c` | Bandas editoriales, nunca botones |

Reglas de color:

- Texto y bordes SIEMPRE en carbon-ink salvo sobre bandas oscuras (usar canvas-sand).
- Ámbar solo en CTAs y foco. Padel-green solo como banda full-bleed o acento grande.
- Nunca ambos colores vivos en la misma sección.

## Tipografía

- **Bangers**: solo titulares (hero y encabezados de sección), mayúsculas, 72 a 120 px en
  el hero (usar `clamp`). Nunca en párrafos ni botones.
- **Lato**: todo lo funcional (nav, botones, cuerpo, captions). Etiquetas de apoyo en
  Lato 700, mayúsculas, tracking amplio (usar el mixin `eyebrow`).
- Prohibido: serif display nuevo.

## Estilos (CSS Modules + SCSS)

- Un `*.module.scss` por componente, importando `@use '../../styles/variables' as *;` y
  `_mixins` cuando aplique.
- Mixins disponibles (no duplicarlos): `button-reset`, `cta-pill`, `cta-amber`,
  `cta-outline`, `container`, `section-space`, `eyebrow`, `section-heading`, `body-copy`,
  `focus-ring`, `focus-ring-dark`, `transition-base`.
- Cero sombras. La profundidad sale de bandas full-bleed y radios: imágenes 20px,
  controles 10px, pills 9999px.
- Mobile-first: estilizar para móvil y ampliar con `min-width`.

## Configuración

- Valores mutables viven en `.env` (ver `.env.example`). Nunca quemar número de WhatsApp,
  URLs de Instagram/mapas ni rutas de menú en componentes: pasan por `src/config.ts`.
- `.env` está en `.gitignore`. Los cambios se reflejan re-ejecutando `npm run build`.

## SEO (no opcional)

- `index.html` ya tiene canonical, OG/Twitter y fuentes. No duplicar meta estática.
- Los JSON-LD (`Restaurant` por sede), `sitemap.xml` y `llms.txt` los genera el plugin
  `seo/build-seo.ts` dentro del build. Si cambian horarios o sedes, editar el plugin (o el
  `.env` cuando aplique), no el HTML.
- Imágenes con `alt` descriptivo y `loading="lazy"` cuando no son el hero. El hero va con
  carga eager vía CSS.

## Horarios

- **Garana**: todos los días 12:00 a 23:30.
- **Metroatletik**: jueves a martes 16:30 a 23:30. Gestiona el delivery.
- **Delivery WhatsApp**: jueves a martes 16:30 a 22:30.
- **Deck (Ejido)**: cerrada, en remodelación. Solo teaser "Próximamente".

El badge "Abierto hoy" se calcula en vivo para zona `America/Caracas` en
`src/hooks/useOpenNow.ts`.

## Accesibilidad y calidad (gate)

- `npm run build` debe pasar (TS estricto + Sass sin warnings). `npm run lint` limpio.
- Contraste AA sobre bandas de color, foco visible en ámbar, navegación completa por
  teclado, `prefers-reduced-motion` respetado.
- Copy sin em-dash, sin flechas decorativas y sin clichés de marketing
  ("apasionados", "calidad garantizada", jerga técnica).
- Sin animaciones de reveal/scroll. A lo sumo micro-transiciones de hover y el pulse del
  FAB.

## Despliegue

`npm run build` + `firebase deploy --only hosting`. Las imágenes originales viven en
`public/.originals` (se commitean pero no se publican). El menú se actualiza
sustituyendo `public/menu.pdf` sin tocar código.