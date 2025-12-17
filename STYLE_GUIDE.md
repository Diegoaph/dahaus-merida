# Guía de Estilos (.module.scss) — Tema rústico sofisticado

Este documento define el sistema de diseño y los estilos base del sitio. Todo estilo debe implementarse usando SCSS Modules (.module.scss) y respetar el esquema de colores, tipografías y efectos interactivos descritos.

## Principios
- Mobile-first y totalmente responsivo.
- Navbar fija, visible siempre: logo a la izquierda; menú hamburguesa a la derecha en móvil/tablet. Desaparece el hamburguesa en desktop y se muestran links clásicos.
- Footer al final del contenido (no fijado al viewport).
- Navegación intra-página por anclas y scroll suave.
- Sin Tailwind ni Next.js. Usar módulos SCSS.

## Tipografías
- Base: "Lato" o "Poppins" (moderna, geométrica).
- Encabezados:  "Playfair Display" (rústico con clase).
- Carga de fuentes: realizar en el global.scss (mínimo) o HTML, y luego referenciar variables en módulos.

## Tokens de color y temas
Los tokens están definidos en src/styles/_variables.scss y se exponen como CSS variables para soportar tema claro y oscuro.

Tema Claro
- background: #F3F3F3 (cemento mate claro)
- primary-text: #000000 (negro brillante)
- secondary-text: #4A4A4A
- highlight: #FFC107 (amarillo cálido)
- button-bg: #121212 (negro brillante)
- button-text: #FFFFFF
- button-hover-bg: #FFC107
- button-active-bg: #FFB300
- link-color: #FFC107

Tema Oscuro
- background: #1B1B1B (gris profundo con matiz azulado)
- primary-text: #EAEAEA (blanco humo)
- secondary-text: #8C8C8C
- highlight: #FFC107
- button-bg: #FFC107
- button-text: #000000
- button-hover-bg: #E5A083 (rosa desaturado)
- button-active-bg: #E6A000
- link-color: #FFFFFF

Estado inactivo
- disabled: #B0B0B0 con opacidad reducida.

## Texturas visuales
- Fondo general: patrón sutil de cemento en el tema claro (evitar peso visual). En oscuro, mantener liso con leve ruido.
- Divisores o bloques: textura de madera suave.
- Cabezal/branding: detalles de metal negro brillante en acentos.

Las texturas deben aplicarse con baja opacidad y tamaño adecuado para no saturar el diseño.

## Efectos y transiciones
- Hover: transición suave de 200ms para enlaces y botones.
- Active: ligera sombra y cambio de color según tema.
- Menús: deslizamiento hacia abajo (slide-down) en desplegables.
- Header sticky: cambia opacidad en scroll (transparente al inicio; gris mate #292929 al bajar).
- Respeto a reduced motion: desactivar/limitar animaciones si el usuario lo solicita.

## Mixins y utilidades
Están definidos en src/styles/_mixins.scss:
- theme-root(light|dark): inyecta variables CSS para cada tema.
- transition-base: aplica transición estándar de 200ms.
- btn-base: estilos base de botón con variantes y estados.
- link-base: estilos de enlace con subrayado y efectos.
- texture-bg(type): aplica textura sutil (cemento|madera|metal) con filtros.
- sticky-header: estilos para navbar fija con transición de opacidad.

## Uso en módulos SCSS
Ejemplo Button.module.scss
```
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.button {
  @include btn-base;
}
.button--primary {
  background-color: var(--button-bg);
  color: var(--button-text);
}
.button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

Ejemplo Link.module.scss
```
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.link {
  @include link-base;
}
```

Ejemplo Navbar.module.scss
```
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.navbar {
  @include sticky-header;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo { /* izquierda */ }
.menu { /* derecha */ }

/* Breakpoints */
@media (min-width: 1024px) {
  .hamburger { display: none; }
  .links { display: flex; gap: 1rem; }
}
```

## Scroll suave y estados activos
- Usar scroll-behavior: smooth; a nivel del contenedor principal.
- Resaltar sección activa con border-left o background sutil usando highlight.

## Accesibilidad
- Botón hamburguesa con aria-controls y aria-expanded.
- Foco visible en enlaces y botones.
- Contraste suficiente entre texto y fondo.

## Implementación del tema
- En el contenedor raíz (ej. <body> o #root) aplicar .theme--light o .theme--dark.
- _variables.scss exporta CSS variables dentro de esos scopes. Los módulos consumen var(--token).

## Recomendaciones de rendimiento
- Optimizar imágenes y texturas (peso y formato).
- Usar object-fit y tamaños fluidos.
- Evitar sombras y filtros costosos en exceso.

## Entregables
- Todos los componentes deben tener su .module.scss.
- Importar @use de variables y mixins.
- Validar comportamiento en mobile, tablet y desktop.
- Sin Tailwind ni Next.js.
