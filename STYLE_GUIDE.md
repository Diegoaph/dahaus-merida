# Guía de estilo DAHAUS (SCSS Modules)

Premium urbano con rudeza con estilo. La web debe verse como el lugar: hierro negro,
beige, cemento, madera, cielo abierto y cancha. Sin sombras, con bandas full-bleed y
radios grandes.

## Principios

- Mobile-first, totalmente responsivo.
- Una página larga (landing). Sin rutas internas.
- Cero sombras: la profundidad se logra con bandas de color a sangre completa y radios
  generosos (imágenes 20px, botones/inputs 10px, pills 9999px).
- Fotografía al aire libre como protagonista. El hero es full-bleed sin radio; las tarjetas
  de sedes sí usan radio.
- Sin em-dash, sin flechas decorativas. Texto claro, directo, sin jerga.

## Paleta

| Token | Valor | Uso |
|---|---|---|
| carbon-ink | `#1c1a17` | Texto, enlaces, bordes, trazos de iconos. Nunca negro neutro |
| canvas-sand | `#f0e9db` | Superficie base (lonas beige) |
| cement | `#dbd6cb` | Superficie secundaria (el cemento) |
| woodstone | `#6b4f33` | Madera, acento de baja frecuencia (tarimas, marcos) |
| mustard-amber | `#ffc107` | CTA y foco visible |
| padel-green | `#8fa83c` | Bandas decorativas y acentos editoriales de cancha |

Regla de oro: texto y bordes siempre en carbon-ink; los vivos solo como banda full-bleed o
acento grande, nunca como cromado de UI.

## Composición y ritmo

- Espaciado base 12 a 24px; 64 a 100px entre secciones editoriales
  (`clamp(4rem, 8vw, 6.25rem)`).
- Bandas alternadas de fondo para crear profundidad:
  sand (hero real foto) → padel-green → sand → cement → carbon-ink → sand → carbon-ink.
- Un solo acento cromático por sección: ámbar para CTAs, verde solo en la banda padel.

## Tipografía

- Bangers: hero 64 a 120px, títulos de sección 44 a 72px (`clamp`), mayúsculas.
  Única voz display. Tracking ligeramente negativo en títulos grandes.
- Lato 400/500/700: nav, botones, cuerpo, captions, inputs.
- Etiquetas de apoyo: Lato 700, mayúsculas y tracking 0.18em (mixin `eyebrow`), p. ej.
  "ABIERTO HOY", "EN REMODELACIÓN", "DELIVERY".

## Botones y CTAs

- CTA principal: ámbar con texto carbon-ink y borde carbon (`cta-amber`).
- CTA secundario: contorno carbon sobre superficie clara (`cta-outline`).
- Sobre bandas oscuras (hero, delivery): ghost con borde sand.
- Todos los CTAs de acción van a WhatsApp (wa.me) con el prefill de `.env`.

## Enlaces, estados y foco

- Hover: micro-transición de 180ms (color/background). El CTA ámbar oscurece levemente.
- Foco visible: anillo ámbar (sobre superficies ámbar, doble anillo carbon + ámbar).
- `prefers-reduced-motion`: fuera animaciones y transiciones.

## Interacción permitida

- Micro-transiciones de hover y botones.
- Pulse del FAB de WhatsApp (solo con `prefers-reduced-motion: no-preference`).
- Nada de reveal/scroll animations, parallax ni marquees.

## Errores comunes

- Usar verde o ámbar como color de enlaces o decoración de UI.
- Bangers en párrafos, botones o captions.
- Sombra en tarjetas (usar banda de cement distinta de fondo).
- Em-dashes o flechas en el copy.
- Quemar valores de `.env` dentro de los componentes.