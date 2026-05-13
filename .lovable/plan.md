# Rediseño Cooperativa — Plan

## Punto de partida (lo que encontré en el repo)

Tu repo `cooperativawebsite` ya tiene:

- **Brief y propósito claros** (`PRODUCT.md`): el sitio es el "argumento de cierre" para brand managers de marcas como Hugo Boss, JBL, Sephora, Jack Daniel's. Tono editorial, autoridad sin pedantería.
- **Sistema de diseño completo** (`DESIGN.md` + `DESIGN.json`): paleta Shadow Gray `#212029` + Tropical Teal `#4FA9A7` + White, tipografías **Instrument Serif** (display) y **Syne** (UI), esquinas sharp (radius 0), alternancia rítmica dark/light, regla de escasez de teal.
- **7 secciones** ya implementadas en `index.html` (~37 KB) con GSAP:
  1. **Hero**
  2. **Clientes** (marquee + contador de marcas)
  3. **Servicios** (3 servicios)
  4. **Casos de éxito** (5 casos en scroll horizontal pinned con GSAP + tarjeta CTA)
  5. **Cultura — "La Mesa"** (SVG ilustrado animado del equipo)
  6. **Newsletter**
  7. **CTA final**
- **Subpáginas**: `la_mesa_cooperativa.html` y 3 newsletters (enero, febrero, marzo).
- **Assets**: logo, fotos en `Material/` (Hero, Clientes, Casos, Servicios, Equipo).
- Stack actual: HTML estático + `style.css` (49 KB) + `main.js` con GSAP, parches sucesivos (`patch.js`, `patch2.js`, `replaceMain.js`, `updateFooter.js`) — señal clara de deuda técnica.

## Aclaración importante antes de construir

Elegiste estilo **"vibrante y experiencial"**, pero tu propio `DESIGN.md` define una identidad **editorial oscura con teal restringido** (anti-saturación, anti-gradiente, sharp edges). Son direcciones opuestas.

Mi recomendación: **mantener el sistema editorial dark/teal existente** — está bien pensado, alineado al perfil de tus clientes (Hugo Boss, Sephora) y diferencia a Cooperativa de las agencias BTL "vibrantes" que listas como anti-referencia. La energía "experiencial" se transmite con motion (GSAP), fotografía de proyectos y ritmo dark/light, no con paleta saturada.

Si prefieres pivotar a vibrante, dímelo y replanteamos tokens.

## Qué voy a construir (asumiendo que mantenemos la identidad existente)

### 1. Migración de stack
- Portar a **TanStack Start + React + Tailwind v4** (lo que ya corre en este proyecto Lovable).
- Eliminar la deuda de los `patch*.js` consolidando todo en componentes React limpios.
- GSAP + ScrollTrigger para las animaciones que ya existen (scroll horizontal de casos, fade-ins, marquee de clientes, contador, La Mesa SVG).

### 2. Sistema de diseño 1:1 con `DESIGN.json`
- Cargar **Instrument Serif** y **Syne** desde Google Fonts.
- Tokens en `src/styles.css` (oklch) reflejando exactamente Shadow Gray, Tropical Teal, escala de opacidades blancas, spacing, sharp radius.
- Componentes base: `Section`, `Eyebrow`, `Headline` (con soporte `<em>` italic teal), `ButtonOutline`, `ButtonSolid`.

### 3. Rutas
- `/` — Home con las 7 secciones (Hero → Clientes → Servicios → Casos → Cultura → Newsletter → CTA).
- `/la-mesa` — página completa del equipo.
- `/newsletters/enero`, `/febrero`, `/marzo` — los 3 newsletters existentes.

### 4. Mejoras concretas sobre el sitio actual
- **Performance**: lazy loading de imágenes pesadas en `Material/`, conversión a `<img loading="lazy">` y formato responsive.
- **SEO por ruta**: `head()` único por ruta (title, description, og:image con la imagen hero del caso/sección).
- **Accesibilidad**: respetar `prefers-reduced-motion` en todas las animaciones GSAP, focus visible, alt text en assets.
- **Componentes reutilizables**: `CaseCard`, `ServiceItem`, `ClientLogo`, `MesaChair` — fin de los strings HTML repetidos.
- **Mantenibilidad**: contenido (casos, servicios, clientes, miembros del equipo) en arrays tipados, no hardcoded en JSX.
- **Móvil**: revisar layout del scroll horizontal de casos (en móvil suele romperse el pinned scroll); fallback a stack vertical bajo 768px.

### 5. Assets
- Importar `Material/` al proyecto Lovable (logo, fotos de casos, fotos de equipo, SVG de La Mesa) para que viajen con el build.

## Lo que NO voy a tocar en esta primera entrega
- No agrego secciones nuevas (Servicios queda con 3, Casos con 5, etc.) — usamos lo existente como pediste.
- No cambio copy ni casos.
- No conecto backend (formulario newsletter / CTA quedan como `mailto:` o stub hasta que decidas si quieres Lovable Cloud para captura de leads).

## Detalles técnicos

```text
src/
  routes/
    __root.tsx              (fonts + meta globales)
    index.tsx               (Home)
    la-mesa.tsx
    newsletters.$slug.tsx
  components/
    sections/
      Hero.tsx
      Clients.tsx           (marquee + counter)
      Services.tsx
      Cases.tsx             (GSAP horizontal scroll + ScrollTrigger pin)
      Culture.tsx           (SVG La Mesa con interactividad)
      Newsletter.tsx
      CTA.tsx
    primitives/
      Eyebrow.tsx
      Headline.tsx          (parsea <em> → italic teal)
      ButtonOutline.tsx
      ButtonSolid.tsx
    layout/
      Navbar.tsx
      Footer.tsx
      Cursor.tsx            (custom cursor existente)
  data/
    cases.ts                (5 casos tipados)
    services.ts
    clients.ts
    team.ts                 (sillas de La Mesa)
  styles.css                (tokens del DESIGN.json, oklch)
  assets/                   (Material/ portado)
```

Dependencias a instalar: `gsap` (con ScrollTrigger).

## Pregunta abierta antes de implementar

¿Confirmas que mantenemos la identidad editorial dark/teal del `DESIGN.md` actual? Si sí, le doy build directo. Si quieres pivotar a vibrante saturado, lo decimos antes de empezar para no construir dos veces.
