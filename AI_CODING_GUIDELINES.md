# Lineamientos para agentes de IA (Proyecto React SPA)

Este documento debe ser leído por cualquier agente de codificación con IA antes de realizar cambios. Define los requisitos y restricciones del proyecto para mantener coherencia técnica y de diseño.

## Descripción general
- Proyecto: Aplicación web React de una sola página (SPA) con desplazamiento vertical largo.
- Estructura: Varias secciones informativas, incluyendo una hero section superior.
- Navegación: Navbar fija siempre visible en la parte superior.
- Pie de página: Footer al final del contenido, siempre ubicado hasta abajo.
- Diseño: Mobile-first y totalmente responsiva.
- Prohibiciones: NO usar Tailwind CSS ni Next.js bajo ninguna circunstancia.
- Estilos: SÍ usar módulos SCSS (CSS Modules con .module.scss).

## Arquitectura y tecnologías
- Framework: React (CRA/Vite/webpack), sin Next.js.
- Estado: Preferir estado local y hooks integrados (useState, useEffect). Introducir librerías de estado global solo si es imprescindible.
- Ruteo: No usar react-router para múltiples páginas. Toda la navegación es intra-página mediante anclas/scroll.
- Estilos: Módulos SCSS por componente. No estilos globales salvo variables/mixins compartidos.
- Accesibilidad: Cumplir prácticas básicas (roles ARIA, etiquetas, contraste, focos visibles, navegación por teclado).

## Layout y comportamiento requerido
- Navbar fija (sticky/fixed) en la parte superior, siempre visible.
  - Izquierda: Logo del comercio.
  - Derecha: Menú hamburguesa o de tres puntos en móviles/tablet. Al expandirse, muestra entradas que navegan a cada sección de la página y puede incluir entradas adicionales de funcionalidad.
  - En pantallas más grandes que tablet, el menú hamburguesa DESAPARECE y se muestran botones de navegación clásicos (links) de la navbar.
- Hero section en la parte superior con llamado a la acción y contenido destacado.
- Varias secciones informativas consecutivas verticalmente (ej.: características, servicios, testimonios, contacto, etc.).
- Footer siempre al final del contenido (no fixed al viewport). Debe quedar visible tras llegar al final del scroll.
- Mobile-first: Diseñar y estilizar primero para móvil, luego ampliar con media queries para tablet y desktop.
- Navegación intra-página: Scroll suave hacia secciones, con IDs únicos por sección.

## Responsividad
- Puntos de quiebre sugeridos:
  - Móvil: 0–767px
  - Tablet: 768–1023px
  - Desktop: ≥1024px
- El menú hamburguesa debe estar activo hasta 1023px y ocultarse en ≥1024px, mostrando navegación clásica.
- Imágenes y contenedores fluidos (max-width, width: 100%, object-fit donde aplique).

## Estructura de archivos sugerida
- src/
  - components/
    - Navbar/
      - Navbar.jsx
      - Navbar.module.scss
    - Hero/
      - Hero.jsx
      - Hero.module.scss
    - Section/
      - Section.jsx
      - Section.module.scss
    - Footer/
      - Footer.jsx
      - Footer.module.scss
  - styles/
    - _variables.scss
    - _mixins.scss
    - global.scss (mínimo y solo resets/vars)
  - App.jsx
  - App.module.scss
  - main.jsx (o index.jsx)

Nota: Mantener estilos encapsulados por componente usando .module.scss. global.scss debe ser mínimo (reset/normalización y fuentes).

## Reglas de estilos (SCSS Modules)
- No usar Tailwind CSS.
- No introducir frameworks CSS adicionales sin aprobación.
- Usar BEM adaptado dentro del scope del módulo si ayuda a claridad.
- Variables y mixins en styles/_variables.scss y styles/_mixins.scss.
- Media queries mobile-first (min-width).

## Accesibilidad y UX
- Navbar accesible: botón hamburguesa con aria-controls, aria-expanded y etiqueta accesible.
- Menú navegable por teclado: foco visible y orden lógico.
- Anclas: cada sección debe tener un heading y un ID único.
- Contraste adecuado y tamaños de toque suficientes en móvil.
- Scroll suave sin bloquear la accesibilidad (prefiera CSS scroll-behavior: smooth; y considerar users que prefieren reduced motion).

## Funcionalidad del menú
- Entradas mínimas: navegar a Hero y a cada sección informativa.
- Se permiten entradas adicionales con otras funcionalidades (ej.: abrir modal de contacto, cambiar idioma, etc.).
- En desktop, mostrar botones/links visibles en la navbar en lugar del menú hamburguesa.

## Performance
- Evitar dependencias innecesarias.
- Imágenes optimizadas y carga adecuada (lazy donde corresponda, sin romper LCP del hero).
- Evitar re-renderizados: memorizar handlers, dividir componentes si es necesario.

## Buenas prácticas de código
- Componentes funcionales y hooks.
- Tipado opcional con PropTypes o TypeScript si el proyecto lo incluye (no obligatorio).
- Nombres claros y autoexplicativos.
- No introducir lógica de negocio compleja sin discusión previa.

## Ejemplo de anclas y scroll
- IDs de sección: "#hero", "#features", "#services", "#testimonials", "#contact".
- Implementar scroll suave y resaltar sección activa si es pertinente.

## Restricciones y no permitidos
- NO usar Next.js.
- NO usar Tailwind CSS.
- NO convertir la app en multi-página.
- NO fijar el footer al viewport; debe ir al final del contenido.

## Requisitos de entrega para cualquier cambio
- Respetar este documento.
- Cambios mínimos y justificados.
- Mantener compatibilidad responsiva.
- Validar que navbar y footer cumplan su comportamiento en todos los breakpoints.

## Notas adicionales
- Si se requiere añadir librerías, justificar su uso en el PR/comentario.
- Preferir funcionalidades nativas de React/DOM antes de introducir dependencias.
