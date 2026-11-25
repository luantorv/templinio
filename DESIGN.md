# Templinio — Design System

> Relojería analógica · instrumentación digital · cartografía celeste

**Versión:** 1.0 — Especificación portable, independiente de framework.  
**Alcance:** aplicaciones web, paneles de control, sitios, herramientas de escritorio y otras interfaces gráficas.  
**Temas:** Midnight (oscuro), Ivory (claro), Meridian (variante cálida opcional).

---

## 0. Cómo utilizar este documento

Este documento define un lenguaje visual, no una aplicación concreta. Debe poder copiarse a la raíz de cualquier proyecto y servir como referencia para personas y agentes de desarrollo.

- Implementar primero los tokens semánticos, la tipografía y los componentes base. Después incorporar los motivos SVG apropiados para el proyecto.
- Conservar la identidad del sistema sin imponer una estructura de navegación, un dominio, un producto, una tecnología ni funcionalidades inexistentes.
- Utilizar las herramientas y componentes accesibles que ya existan en el proyecto. Adaptar su presentación antes de reemplazarlos.
- Los valores de color, dimensiones y movimiento aquí descritos son valores iniciales; ajustar a la escala y necesidades del producto sin perder la jerarquía.
- Las convenciones **DEBE**, **DEBERÍA** y **PUEDE** indican requisito, preferencia y opción respectivamente.
- Si un patrón ornamental perjudica una tarea, la tarea tiene prioridad. La decoración puede desaparecer sin que se pierda información.

## 1. Dirección artística

### 1.1. Concepto

Templinio imagina una interfaz como un instrumento de precisión: una máquina capaz de medir, ordenar y revelar información. Sus mecanismos recuerdan tanto a un reloj antiguo como a un dispositivo electrónico contemporáneo.

La estética debe expresar precisión, curiosidad, calma, sofisticación y una complejidad que se vuelve inteligible mediante geometría.

**Una esfera analógica para una máquina digital.**

### 1.2. Referencias visuales

La síntesis parte de cinco referencias de relojería, circuitería y astronomía:

| Referencia | Elementos que se recuperan | Aplicación en interfaces |
| --- | --- | --- |
| Carta celeste azul, plata y oro | Arcos orbitales, estrellas, constelaciones, simetría radial | Fondos, mapas de relaciones, visualizaciones, trazado de conexiones |
| Circuitos sobre fondo negro | Pistas ortogonales, nodos, pulsos, módulos, señales cromáticas | Estados, conexiones entre componentes, microinteracciones |
| Relojes monocromos fragmentados | Esferas recortadas, numeración romana, textura discreta, espacio negativo | Cabeceras, fondos marginales, composición editorial |
| Engranajes borgoña y oro | Capas concéntricas, latón, cobre, geometría dentada | Identidad cálida, ilustraciones, motivos de transición |
| Reloj dorado sobre negro | Esfera incompleta, agujas ornamentales, brújula, discontinuidades | Motivo principal, hero, indicadores circulares y elementos de marca |

No reproducir literalmente las composiciones ni utilizar sus imágenes como fondos obligatorios. Construir motivos propios a partir de sus principios formales.

### 1.3. Qué es y qué no es

| Es | No es |
| --- | --- |
| Futurismo instrumental | Neón omnipresente o cyberpunk saturado |
| Relojería de precisión | Steampunk recargado, remaches y texturas de cuero |
| Geometría astronómica | Una temática obligatoriamente astrológica |
| Detalle localizado | Ornamentación uniforme en todas las superficies |
| Interfaces sobrias, con momentos expresivos | Skeuomorfismo literal de una máquina física |

## 2. Gramática visual

El sistema se construye con tres familias geométricas compatibles.

| Familia | Primitivas | Papel |
| --- | --- | --- |
| Radial | Esferas, arcos, anillos, marcas, agujas, engranajes | Identidad, foco, medición, progreso |
| Ortogonal | Pistas, líneas a 90°, terminales, matrices, módulos | Estructura, interacción, conexiones |
| Orbital | Elipses, trayectorias, líneas punteadas, cruces, estrellas | Contexto, relaciones, profundidad |

Unir las familias mediante nodos circulares: una órbita o anillo puede terminar en una pista ortogonal; una pista puede dividirse en terminales; una escala puede estar atravesada por una línea de referencia. Emplear un pequeño nodo en cada unión significativa, no en todos los vértices.

### 2.1. Jerarquía ornamental

Como guía compositiva (no como métrica rígida), utilizar una distribución **70 / 20 / 10** del peso visual: 70% contenido y superficies tranquilas, 20% estructura visible, 10% ornamentación expresiva y acentos. En una pantalla de trabajo densa reducir todavía más el último grupo.

| Nivel | Uso | Motivos |
| --- | --- | --- |
| 0 — Quiet | Formularios, tablas densas, texto largo | Ninguno; solo bordes y separadores |
| 1 — Instrument | Cards, navegación, botones, paneles | Marcas breves, terminales, separadores, arcos pequeños |
| 2 — Mechanism | KPI, gráficos, selección destacada | Anillos, escalas, pistas, conexiones |
| 3 — Observatory | Hero, portada, onboarding, estado vacío | Esferas grandes, engranajes, órbitas, capas asimétricas |

No aplicar nivel 3 a cada card. Cada vista debería tener un punto focal dominante como máximo.

### 2.2. Composición

- Combinar una cuadrícula recta para el contenido con geometría radial en zonas de énfasis.
- Preferir esferas desplazadas del centro, parcialmente recortadas por el contenedor, o con segmentos ausentes. Mantener los centros y ejes de los motivos comprensibles.
- Aprovechar el espacio negativo: un círculo incompleto puede sugerir una pieza mayor sin dibujarla entera.
- Mantener líneas de lectura rectas. No obligar a leer textos curvos ni seguir una órbita para navegar.
- Usar asimetría controlada en hero y portadas; conservar alineaciones estables en pantallas operativas.

## 3. Color

### 3.1. Paleta semántica

Todos los colores que consume un componente DEBEN ser tokens semánticos. Evitar hexadecimales dispersos por el código de la interfaz.

| Token | Midnight | Ivory | Meridian (opcional) | Función |
| --- | --- | --- | --- | --- |
| `canvas` | `#090C13` | `#F3EFE5` | `#211416` | Fondo general |
| `surface` | `#111925` | `#FCFAF5` | `#301E20` | Paneles, cards |
| `surface-raised` | `#192333` | `#FFFFFF` | `#3D2728` | Popovers, hover, capas |
| `border` | `#28364A` | `#CEC8BB` | `#65413D` | Divisiones decorativas |
| `outline` | `#60758E` | `#817C70` | `#A4786A` | Límites funcionales |
| `text` | `#E2E8EF` | `#242C37` | `#F2E5D1` | Texto principal |
| `text-muted` | `#9AAABD` | `#5E6570` | `#C5AFA3` | Metadatos, texto secundario |
| `accent` | `#D8BE7E` | `#856325` | `#E3C482` | Latón, identidad, acción primaria |
| `on-accent` | `#141109` | `#FFFFFF` | `#211416` | Texto sobre acción primaria |
| `signal` | `#67D6CE` | `#176B68` | `#79C9BD` | Foco, interacción técnica, conexiones activas |
| `orbit` | `#6995DC` | `#355E9B` | `#91AFDF` | Información, series, rutas |
| `pulse` | `#C66080` | `#A13D60` | `#E08DA7` | Serie secundaria, énfasis puntual |
| `copper` | `#B7785F` | `#8A4B36` | `#D08A67` | Mecánica ornamental |
| `success` | `#79CFA1` | `#246A46` | `#8DD6A6` | Éxito |
| `warning` | `#E3B86B` | `#80520D` | `#E8B36A` | Advertencia |
| `danger` | `#F08D95` | `#A52D3A` | `#F19A9A` | Error, acción destructiva |

**Midnight**: fondo negro azulado, metal dorado y líneas frías. Tema principal de referencia.  
**Ivory**: papel claro y tinta oscura, con apariencia de plano científico. No es simplemente una inversión de Midnight.  
**Meridian**: borgoña profundo, latón y cobre; conserva las señales tecnológicas frías. Variante optativa, no un tercer tema obligatorio.

### 3.2. Uso cromático

- El dorado identifica el mecanismo principal, las acciones primarias y los puntos focales; no debe cubrir todas las superficies.
- Signal es el color de la conexión activa y el anillo de foco. Orbit representa información, conexiones auxiliares y capas de referencia.
- Pulse es un acento expresivo y una posible serie de datos, no una sustitución del color de error.
- Los colores de estado se acompañan con texto, forma o icono; no depender exclusivamente del color.
- Los bordes decorativos pueden ser sutiles; los bordes que permitan identificar un control DEBEN alcanzar el contraste no textual necesario. Usar `outline` o un token ajustado cuando corresponda.
- Usar degradados, si son necesarios, solo para iluminación radial de baja intensidad. Evitar fondos arcoíris, cristal esmerilado indiscriminado y glow en texto.
- Los acentos sobre superficies elevadas, en tamaños pequeños o con opacidad deben verificarse en contexto; no asumir que toda combinación de tokens es accesible. En particular, `pulse`, `orbit` y `copper` no son colores de texto general.

### 3.3. Implementación CSS de referencia

Los siguientes tokens son una base copiable; el proyecto puede trasladarlos a Tailwind, Sass, QSS, un tema nativo u otro sistema.

```css
:root, [data-theme="midnight"] {
  color-scheme: dark;
  --canvas: #090c13;
  --surface: #111925;
  --surface-raised: #192333;
  --border: #28364a;
  --outline: #60758e;
  --text: #e2e8ef;
  --text-muted: #9aaabd;
  --accent: #d8be7e;
  --on-accent: #141109;
  --signal: #67d6ce;
  --orbit: #6995dc;
  --pulse: #c66080;
  --copper: #b7785f;
  --success: #79cfa1;
  --warning: #e3b86b;
  --danger: #f08d95;
}
[data-theme="ivory"] {
  color-scheme: light;
  --canvas: #f3efe5;
  --surface: #fcfaf5;
  --surface-raised: #ffffff;
  --border: #cec8bb;
  --outline: #817c70;
  --text: #242c37;
  --text-muted: #5e6570;
  --accent: #856325;
  --on-accent: #ffffff;
  --signal: #176b68;
  --orbit: #355e9b;
  --pulse: #a13d60;
  --copper: #8a4b36;
  --success: #246a46;
  --warning: #80520d;
  --danger: #a52d3a;
}
[data-theme="meridian"] {
  color-scheme: dark;
  --canvas: #211416;
  --surface: #301e20;
  --surface-raised: #3d2728;
  --border: #65413d;
  --outline: #a4786a;
  --text: #f2e5d1;
  --text-muted: #c5afa3;
  --accent: #e3c482;
  --on-accent: #211416;
  --signal: #79c9bd;
  --orbit: #91afdf;
  --pulse: #e08da7;
  --copper: #d08a67;
  --success: #8dd6a6;
  --warning: #e8b36a;
  --danger: #f19a9a;
}
:root {
  --font-ui: 'IBM Plex Sans', system-ui, sans-serif;
  --font-display: 'Cinzel', Georgia, serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --line-thin: 1px;
  --line-strong: 2px;
  --motion-fast: 120ms;
  --motion-normal: 220ms;
  --motion-slow: 480ms;
  --ease-mechanical: cubic-bezier(.2,.7,.2,1);
}
```

Seleccionar el tema inicial según la preferencia de sistema si el producto no define otro criterio. Permitir una selección explícita persistente cuando tenga sentido. Si no hay JavaScript, mantener un tema funcional de respaldo.

## 4. Tipografía

| Rol | Familia recomendada | Uso |
| --- | --- | --- |
| Display | Cinzel / Georgia | Identidad, portada, títulos expresivos, numeración romana |
| UI | IBM Plex Sans / system-ui | Navegación, botones, formularios, textos, tablas |
| Monospace | IBM Plex Mono / monospace | Valores técnicos, mediciones, coordenadas, registros, timestamps |

Las familias son sugerencias; no son dependencias obligatorias. Preferir fuentes locales o alojadas por el proyecto, con fallbacks adecuados. No enviar toda la aplicación a una tipografía ornamental.

| Nivel | Tamaño orientativo | Peso | Interlineado |
| --- | --- | --- | --- |
| Display | 40–72 px, fluido | 400–600 | 1.1 |
| H1 | 30–40 px | 500–600 | 1.2 |
| H2 | 22–28 px | 500–600 | 1.3 |
| H3 | 17–20 px | 500–600 | 1.4 |
| Body | 15–16 px | 400 | 1.55–1.7 |
| UI | 14–16 px | 400–500 | 1.4 |
| Caption | 12–13 px | 400–500 | 1.45 |

- Display puede alternar entre la serif y la sans según el contexto; en un dashboard preferir sans.
- Usar números tabulares (`font-variant-numeric: tabular-nums`) para métricas y datos que cambian.
- Espaciado de letras de `.06em–.12em` en etiquetas técnicas breves en mayúsculas; texto largo en caja normal.
- Los números romanos pueden identificar secciones de una presentación o adornar escalas. No reemplazan numeración operativa, horas accesibles ni cantidades.
- El texto DEBE seguir siendo legible al ampliar la interfaz al 200%.

## 5. Layout, superficies y densidad

- Cuadrícula de 4 px; espaciados preferentes: 4, 8, 12, 16, 24, 32, 48 y 64 px.
- Contenedores con bordes de 1 px; esquinas de 2–8 px. Reservar círculos y cápsulas para elementos de significado radial o estados compactos.
- Sombras escasas y difusas. La profundidad se obtiene principalmente por cambios de superficie, líneas superpuestas y opacidad.
- Una esquina truncada a 45° puede identificar un panel especial; realizarla como decoración independiente, nunca recortando su área interactiva o anillo de foco.
- Separadores con un terminal, doble marca o corte pequeño en un extremo. No es necesario decorar ambos extremos.
- Ancho de lectura habitual: 60–75 caracteres. Los dashboards y herramientas de datos pueden utilizar todo el ancho disponible.
- Responsive por espacio disponible: hasta ~640 px apilar paneles; ~640–1024 px ajustar navegación y reducir motivos; más de ~1024 px desplegar composición amplia. Son puntos de partida, no restricciones.
- En móvil, preservar los datos antes que la ilustración; los SVG ornamentales pueden ocultarse, reducirse o recortarse sin alterar el orden del DOM.

### 5.1. Capas

1. **Canvas:** color base, eventualmente una cuadrícula u órbita tenue.
2. **Estructura:** paneles, divisiones y conexiones de fondo.
3. **Contenido:** controles, datos y texto.
4. **Instrumentación:** indicadores y microdetalles asociados con funciones reales.
5. **Overlay:** menús, diálogos, tooltips y anillos de foco sin interferencia ornamental.

Los motivos decorativos van detrás del contenido, con `pointer-events: none`. Los controles deben quedar por encima y no depender de que un fondo se cargue.

## 6. Biblioteca de motivos SVG

Los motivos son componentes reutilizables, no imágenes de pantalla completa. Deben poder combinarse, escalarse y colorearse desde los tokens del tema. Diseñar sobre coordenadas de `viewBox`, evitar acoplar la geometría al tamaño CSS.

| Motivo | Geometría | Uso |
| --- | --- | --- |
| `ClockDial` | Anillos, marcas de escala, números romanos opcionales | Hero, relojes, KPI, instrumentación |
| `BrokenDial` | Segmentos de esfera con huecos | Fondos marginales, portadas, estados vacíos |
| `Needle` | Aguja fina, pivote circular, contrapeso opcional | Indicador, cursor angular, puntero |
| `Gear` | Corona dentada, radios, buje | Identidad mecánica, transiciones puntuales |
| `CircuitTrace` | Segmentos ortogonales con codos a 90°/45° y terminales | Conexiones, bordes activos, diagramas |
| `Node` | Círculo, doble anillo o terminal cuadrado | Intersección, actividad, punto de datos |
| `Orbit` | Elipse o arco continuo/punteado | Capas, contexto, navegación conceptual |
| `Constellation` | Nodos con uniones discontinuas | Relaciones, fondo sutil, mapa de entidades |
| `Reticle` | Cruces, marcas angulares, coordenadas | Selección, foco gráfico, anotaciones |
| `SignalRail` | Pista y pequeños segmentos discretos | Actividad, progreso real, microdetalle |

### 6.1. Contrato visual y técnico

- `viewBox` de 240 × 240 para piezas radiales de referencia; usar otros cuando la composición lo requiera.
- Trazos visuales típicos: 0.75–1.5 px para estructura, 1.5–2 px para énfasis; usar `vector-effect="non-scaling-stroke"` solo donde convenga mantener grosor constante al escalar.
- Marcas de esfera: 60 divisiones opcionales, cada quinta más larga; anillos en capas con separación regular.
- Radial: ángulo 0° arriba y sentido horario positivo. Incluir el centro como parámetro en componentes generativos.
- Pistas: preferir segmentos horizontales y verticales, con diagonales de 45° ocasionales. Añadir nodos en uniones relevantes.
- Los dientes de un engranaje deben ser regulares si se usan como símbolo mecánico; fragmentarlos únicamente con intención ornamental.
- Utilizar `currentColor` para motivos monocromáticos y variables CSS para componentes multicapa. Si un SVG se carga como `<img>`, no asumir que hereda las variables CSS del documento: usar inline SVG, máscaras monocromáticas o archivos por tema.
- Los IDs de gradientes, máscaras y `clipPath` deben ser únicos por instancia.
- Usar `aria-hidden="true"`, `focusable="false"` y `pointer-events: none` en motivos decorativos. Para gráficos informativos, ofrecer nombre accesible, valor y equivalente textual.
- Mantener pequeñas las cantidades de nodos y filtros. No generar cientos de elementos nuevos en cada frame.
- Un SVG ornamental nunca debe fingir telemetría, progreso, horas actuales ni estados reales.

### 6.2. Ejemplo — BrokenDial

Ejemplo original y autocontenido como SVG inline. Las marcas se generan con `stroke-dasharray`; el arco y los radios representan un mecanismo fragmentado. No pretende mostrar la hora real.

```html
<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg"
     aria-hidden="true" focusable="false" class="motif motif-dial"
     style="width:100%;height:auto;pointer-events:none">
  <g fill="none" stroke="var(--accent, #D8BE7E)">
    <circle cx="120" cy="120" r="108" opacity=".22" stroke-width="1"/>
    <circle cx="120" cy="120" r="99" pathLength="360"
            stroke-dasharray="136 20 76 128" stroke-width="1.5"
            transform="rotate(-90 120 120)"/>
    <circle cx="120" cy="120" r="90" pathLength="60"
            stroke-dasharray=".13 .87" stroke-width="4" opacity=".65"/>
    <circle cx="120" cy="120" r="86" pathLength="12"
            stroke-dasharray=".065 .935" stroke-width="10"/>
    <circle cx="120" cy="120" r="72" stroke-width=".75" opacity=".55"/>
    <path d="M120 6 V18 M120 222 V234 M6 120 H18 M222 120 H234"
          stroke-width="1.4"/>
  </g>
  <g fill="var(--accent, #D8BE7E)" font-family="Georgia,serif"
     font-size="14" text-anchor="middle" dominant-baseline="middle">
    <text x="120" y="61">XII</text><text x="179" y="120">III</text>
    <text x="120" y="179">VI</text><text x="61" y="120">IX</text>
  </g>
  <g stroke="var(--orbit, #6995DC)" fill="none" opacity=".55">
    <ellipse cx="120" cy="120" rx="116" ry="40"
             transform="rotate(-32 120 120)" stroke-width=".8"/>
    <path d="M27 68 L210 172" stroke-dasharray="2 4"/>
  </g>
  <g fill="var(--accent, #D8BE7E)">
    <path d="M116 125 L120 48 L124 125 Z" transform="rotate(55 120 120)"/>
    <path d="M117 124 L120 77 L123 124 Z" transform="rotate(-58 120 120)"/>
  </g>
  <path d="M120 136 V39" stroke="var(--signal, #67D6CE)"
        transform="rotate(142 120 120)" stroke-width="1"/>
  <circle cx="120" cy="120" r="6" fill="var(--surface, #111925)"
          stroke="var(--accent, #D8BE7E)" stroke-width="1.5"/>
</svg>
```

### 6.3. Ejemplo — CircuitTrace

```html
<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg"
     aria-hidden="true" focusable="false" style="pointer-events:none">
  <g fill="none" stroke="var(--orbit, #6995DC)" stroke-width="1" opacity=".7">
    <path d="M4 18 H65 L81 34 H144 V76 H230 L246 60 H314"/>
    <path d="M4 82 H100 V55 H178 L194 39 H260 V14 H314"/>
  </g>
  <g fill="none" stroke="var(--signal, #67D6CE)" stroke-width="1.5">
    <path d="M32 18 H65 L81 34 H144"/>
    <path d="M230 76 L246 60 H282" stroke-dasharray="3 5"/>
  </g>
  <g fill="var(--surface, #111925)" stroke="var(--signal, #67D6CE)">
    <circle cx="32" cy="18" r="3"/><circle cx="144" cy="34" r="4"/>
    <circle cx="282" cy="60" r="3"/>
  </g>
  <g fill="var(--pulse, #C66080)">
    <rect x="97" y="52" width="6" height="6"/>
    <rect x="257" y="11" width="6" height="6"/>
  </g>
</svg>
```

### 6.4. Ejemplo — Gear

Generar la silueta a partir de parámetros, en lugar de dibujar manualmente cada diente. Función JavaScript pura, sin dependencias. Produce un contorno ornamental y no un perfil mecánico de involuta apto para fabricación.

```js
function gearPath(teeth = 18, root = 36, tip = 43, cx = 50, cy = 50) {
  if (!Number.isInteger(teeth) || teeth < 3 || teeth > 120 ||
      ![root, tip, cx, cy].every(Number.isFinite) || root <= 0 || tip <= root) {
    throw new RangeError('Invalid gear geometry');
  }
  const points = [];
  for (let i = 0; i < teeth; i++) {
    for (const [offset, radius] of [[0, root], [.2, tip], [.65, tip], [.85, root]]) {
      const a = (i + offset) * 2 * Math.PI / teeth - Math.PI / 2;
      points.push(`${(cx + radius * Math.cos(a)).toFixed(3)},${(cy + radius * Math.sin(a)).toFixed(3)}`);
    }
  }
  return `M${points.join(' L')} Z`;
}
```

Insertar el resultado en el atributo `d` de un `<path>` SVG con `viewBox="0 0 100 100"` para los parámetros por defecto. Añadir anillos internos, un buje y radios con `<circle>` y `<path>`. Para geometrías personalizadas, ajustar el viewBox al radio y centro. No simular engrane físico a partir de esta función.

### 6.5. Geometría de agujas y escalas reales

Cuando el motivo sea un indicador funcional, vincular la geometría al dato, no a un valor inventado.

```js
function gaugeAngle(value, min, max, start = -135, sweep = 270) {
  if (![value, min, max, start, sweep].every(Number.isFinite) || max <= min) return null;
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return start + ratio * sweep;
}
```

Rotar una aguja inicialmente vertical con `transform="rotate(angle cx cy)"`. Mantener el valor numérico y unidad visibles. Si el dato está fuera del rango, indicar esa condición en texto; si falta, mostrar «Sin datos», no cero. Para un reloj real, calcular horas/minutos/segundos desde el tiempo actual y especificar zona horaria cuando sea relevante. No emitir cada segundo como anuncio de lector de pantalla.

## 7. Componentes de interfaz

| Componente | Apariencia | Comportamiento |
| --- | --- | --- |
| Botón primario | Fondo `accent`, texto `on-accent`, esquinas 4 px | Hover con variación de luminosidad verificada; focus visible |
| Botón secundario | Superficie o transparente, borde `outline`, texto `text` | Pista o marca lateral al activarse, sin desplazar contenido |
| Botón terciario | Texto e icono, fondo transparente | Subrayado o superficie suave al hover |
| Botón destructivo | Texto y borde `danger` o relleno con contraste verificado | Confirmación cuando la acción sea irreversible |
| Card | Superficie, borde fino, 16–24 px de padding | Motivo opcional localizado en una esquina, no sobre texto |
| Panel destacado | Card + arco parcial o escala | Solo uno dominante por vista, cuando corresponda |
| Input / select | Superficie, contorno funcional, etiqueta visible | Focus `signal`, error `danger` y explicación textual |
| Tabs | Línea base y marca de selección | Indicador breve, no solo cambio cromático; teclado según patrón |
| Badge de estado | Punto/forma + texto legible | Semántica de estado real, no telemetría decorativa |
| Modal | Superficie elevada y borde funcional | Foco inicial, cierre, retorno del foco; fondo sin movimiento |
| Tooltip | Superficie elevada, texto normal | No colocar información esencial solo en hover |
| Tabla | Filas limpias, separadores finos, números tabulares | Orden y selección explícitos, sin decoración repetitiva |
| Gauge / progreso | Arco, marcas, aguja o segmento | Valor, unidad, rango y etiqueta visibles; alternativa accesible |
| Estado vacío | Ilustración radial o circuito interrumpido | Texto claro y siguiente acción si existe |

### 7.1. Estados e interacción

- Default: bordes y textos legibles; sin movimiento continuo.
- Hover: realce de borde o superficie, opcionalmente una pista de 12–24 px que se ilumina.
- Focus-visible: contorno de al menos 2 px en `signal` con separación de 3 px; si no contrasta contra el entorno, ajustar su color o agregar un contorno de respaldo.
- Active/selected: marcador sólido (línea, punto o muesca), además de color y semántica ARIA cuando proceda.
- Disabled: estado no interactivo y visual diferenciado; no confundir con un botón secundario.
- Loading: anillo segmentado para carga indeterminada; progreso cuantitativo solo si es medible. Ofrecer texto de estado.
- Error: mensaje próximo al control, con sugerencia de resolución cuando exista.

### 7.2. Patrones especiales

**Instrument Panel:** sección operativa con identificador técnico opcional, título claro, contenido y una pequeña escala o terminal alineado con su estructura. No añadir etiquetas arbitrarias que parezcan códigos de diagnóstico reales.

**Metric Dial:** valor dominante, unidad explícita y arco de progreso cuando sea pertinente. Si el dato no tiene un rango útil, presentar una cifra simple sin aguja.

**Circuit Divider:** separador horizontal que se interrumpe en un nodo o se desvía unos píxeles; útil entre secciones, no entre todas las filas de una tabla.

**Chronicle / Timeline:** eje vertical, nodos para eventos y etiquetas cronológicas. Usar órbitas o esferas únicamente como acento de grupos importantes. Mantener el orden de lectura natural.

**Mechanism Hero:** esfera incompleta grande, un circuito que sale de su perímetro y atraviesa la composición hasta un nodo secundario. El título y CTA ocupan una región sin líneas de alto contraste. En pantallas estrechas, separar o retirar la ilustración.

### 7.3. CSS de componentes base

```css
body {
  margin: 0;
  background: var(--canvas);
  color: var(--text);
  font: 400 1rem/1.6 var(--font-ui);
}
.panel {
  position: relative;
  isolation: isolate;
  padding: var(--space-5);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
.panel > .motif {
  position: absolute;
  inset-inline-end: 0;
  inset-block-start: 0;
  width: min(42%, 200px);
  opacity: .10;
  z-index: -1;
  pointer-events: none;
}
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 44px;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--outline);
  border-radius: var(--radius-md);
  background: var(--surface);
  color: var(--text);
  font: 500 .9375rem/1.4 var(--font-ui);
  cursor: pointer;
  transition: background-color var(--motion-fast), border-color var(--motion-fast);
}
.button:hover:not(:disabled) { background: var(--surface-raised); border-color: var(--signal); }
.button--primary, .button--primary:hover:not(:disabled) {
  background: var(--accent);
  color: var(--on-accent);
  border-color: var(--accent);
}
.button--primary:hover:not(:disabled) { text-decoration: underline; text-underline-offset: .2em; }
:where(button, a, input, select, textarea, [tabindex]):focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 3px;
}
.button:disabled { opacity: .55; cursor: not-allowed; }
.metric-value { font-variant-numeric: tabular-nums; }
```

El CSS es una referencia visual mínima, no sustituye los patrones accesibles de navegación, diálogos, formularios o controles del producto.

## 8. Visualización de datos

- Priorizar gráficos cartesianos para tendencias y comparaciones. La estética radial no justifica elegir un radar o gauge si una barra o línea comunica mejor.
- Usar cuadrículas finas, ejes legibles, marcas discretas y valores con unidades. Evitar distorsiones geométricas.
- Series iniciales: `orbit`, `signal`, `accent`, `pulse`, `copper`. Añadir patrones, marcadores o etiquetas cuando se deban distinguir series cercanas o sin color.
- Conexiones y topologías: pistas ortogonales para flujos estructurados, constelaciones para relaciones no jerárquicas. Las animaciones indican actividad únicamente si representan actividad real.
- Anillos concéntricos para progreso, capacidad o mediciones cíclicas; no mezclar escalas incompatibles sin identificarlas.
- Tooltip accesible mediante teclado y táctil cuando sea posible; proporcionar resumen o tabla equivalente para gráficos importantes.

## 9. Movimiento e interacción

El movimiento debe recordar a una máquina calibrada: preciso, progresivo, con inicio y final definidos. Evitar rebotes exagerados y parpadeos. La pantalla en reposo debe resultar tranquila.

| Tipo | Duración | Ejemplo |
| --- | --- | --- |
| Micro | 100–150 ms | Encendido de nodo, hover, foco |
| Control | 180–260 ms | Selección, cambios de panel, apertura |
| Mecanismo | 350–550 ms | Ajuste de aguja, aparición de arco |
| Secuencia | 500–800 ms | Ilustración inicial de portada, una sola vez |

### 9.1. Repertorio

- **Calibration:** un arco se completa o una aguja se desplaza hasta el nuevo valor, sin oscilación artificial.
- **Signal routing:** un segmento breve recorre una pista existente, como confirmación de una acción o actividad real.
- **Mechanical reveal:** dos segmentos de esfera se alinean al aparecer una sección destacada.
- **Orbital drift:** movimiento ambiental muy lento, únicamente si es optativo, pausable y no distrae. Por defecto está desactivado.
- **Index tick:** una marca cambia de posición al seleccionar un ítem o pasar de etapa; no obliga a animar toda la pantalla.

### 9.2. CSS de referencia

```css
@keyframes calibrate {
  from { transform: rotate(var(--angle-from, -135deg)); }
  to { transform: rotate(var(--angle-to, 0deg)); }
}
.needle {
  transform-box: view-box;
  transform-origin: 50% 50%; /* SVG cuadrado con pivote centrado */
  transform: rotate(var(--angle-to, 0deg));
  transition: transform var(--motion-slow) var(--ease-mechanical);
}
.needle--calibrating {
  animation: calibrate var(--motion-slow) var(--ease-mechanical) both;
}
@media (prefers-reduced-motion: reduce) {
  .needle, .needle--calibrating {
    animation: none;
    transition: none;
    transform: rotate(var(--angle-to, 0deg));
  }
  .ambient-motion, .signal-motion, .mechanical-reveal {
    animation: none !important;
    transition: none !important;
  }
  .button { transition: none; }
}
```

- Respetar `prefers-reduced-motion`, y ofrecer un control propio si el producto incluye movimiento ambiental. El estado final DEBE permanecer visible al desactivar animaciones.
- No usar flashes, strobing ni pulsos de alto contraste. Evitar decoraciones que cambien luminosidad repetidamente.
- Si hay movimiento automático no esencial de más de cinco segundos junto con el contenido, ofrecer pausa, detención u ocultamiento.
- Preferir `transform` y `opacity` sobre cambios de layout por frame. No crear bucles de animación para una pantalla inactiva.

## 10. Iconografía y microdetalles

- Iconos funcionales de línea, con grosor coherente de 1.5–2 px, 16/20/24 px según el control. Usar una única familia (Lucide, Phosphor en peso regular u otra equivalente).
- Reservar iconos ornamentales como brújulas, esferas, estrellas geométricas y engranajes para identidad y visualizaciones.
- Un engranaje como botón de ajustes sigue necesitando etiqueta accesible. Un reloj no debe reemplazar automáticamente un icono de historial, calendario o alarma si crea ambigüedad.
- Usar grupos cortos de marcas graduadas, pequeños terminales, cruces y matrices de puntos para enriquecer márgenes.
- No añadir coordenadas, números de serie, logs ni indicadores de señal inventados que puedan confundirse con datos del producto.

## 11. Accesibilidad y rendimiento

Objetivo: WCAG 2.2 AA cuando sea aplicable, con comprobación en el producto final.

- Contraste de texto normal ≥ 4.5:1, texto grande ≥ 3:1 y componentes/indicadores gráficos necesarios ≥ 3:1 frente a colores adyacentes.
- Etiquetas visibles y navegación por teclado. El foco no debe quedar recortado, oculto por decoración ni tapado por overlays.
- Objetivos interactivos de 44 × 44 px recomendados; como mínimo cumplir el requisito de tamaño aplicable de WCAG 2.2 AA, incluidas sus excepciones.
- No comunicar información mediante color, posición angular o animación exclusivamente.
- SVG decorativos fuera del árbol de accesibilidad; información gráfica con equivalente en texto.
- Las texturas se mantienen bajo contenido o desaparecen cuando interfieren en el contraste. Evitar ruido de alta frecuencia, sobre todo en áreas de lectura.
- Comprobar temas claro/oscuro, ampliación de texto, pantallas pequeñas, teclado y modo de contraste forzado. En `forced-colors`, permitir los colores de sistema en los controles.
- Mantener imágenes y SVG ligeros, sin dependencias externas obligatorias. Evitar filtros costosos y sombras animadas; probar con un equipo modesto.
- Las variaciones decorativas nunca deben modificar la semántica ni el orden de lectura.

## 12. Adaptación según proyecto

| Contexto | Intensidad | Adaptación |
| --- | --- | --- |
| Dashboard o herramienta técnica | 0–2 | Circuits, escalas, datos, tipografía sans/mono; fondo tranquilo |
| Landing page o portfolio | 1–3 | Esfera fragmentada, título display, órbitas de fondo, composición asimétrica |
| App de productividad | 0–1 | Marcas mínimas, timeline, progreso y navegación discreta |
| Visualizador científico | 1–2 | Retículas, ejes, escalas precisas, coordenadas reales |
| App narrativa, artística o temática | 1–3 | Numeración romana, órbitas, mecanismos, variantes cálidas |
| TUI, si procede | 0–1 | Tokens cromáticos equivalentes, líneas de caja y números tabulares; no depender de SVG |

La elección del nivel ornamental depende de la tarea y no de cuán atractivo resulte el SVG aislado.

### 12.1. Organización sugerida (no obligatoria)

```text
DESIGN.md
src/
  design/
    tokens.css
    themes.css
    motion.css
  components/
    ui/
    motifs/
      ClockDial
      BrokenDial
      Needle
      Gear
      CircuitTrace
      Orbit
      Node
      Reticle
```

Adaptar nombres y estructura al repositorio existente. No crear archivos o dependencias innecesarias solo para igualar este árbol. Separar primitivas geométricas puras de componentes semánticos (por ejemplo, un Dial de un indicador de uso de CPU).

## 13. Guía rápida para agentes y desarrolladores

Al diseñar una pantalla nueva:

1. Identificar tarea principal, jerarquía de información y estados reales.
2. Construir layout y componentes accesibles con los tokens semánticos.
3. Elegir un motivo dominante y su nivel ornamental (0–3).
4. Usar una sola familia geométrica secundaria para conectar o complementar el motivo.
5. Implementar detalles SVG independientes del contenido, con parámetros reutilizables.
6. Añadir movimiento únicamente si aporta feedback o una presentación breve y controlada.
7. Verificar ambos temas, resolución móvil, foco, contraste y movimiento reducido.
8. Eliminar cualquier ornamento que dificulte leer, navegar o interpretar datos.

### Checklist de aceptación visual

- [ ] La interfaz funciona y resulta comprensible incluso sin SVG ni animaciones.
- [ ] Se reconoce la estética de relojería e instrumentación sin depender de imágenes rasterizadas.
- [ ] Los motivos radiales y ortogonales comparten el mismo lenguaje de trazos y nodos.
- [ ] Los datos dominan sobre la decoración; existe espacio negativo.
- [ ] Los colores de identidad y estado conservan su significado en cada tema.
- [ ] Los componentes usan tokens, no colores hardcodeados fuera de sus definiciones o fallbacks.
- [ ] El movimiento respeta las preferencias del usuario y no simula información inexistente.
- [ ] Los SVG se escalan, no bloquean interacciones y tienen semántica correcta.
- [ ] Se ha comprobado el contraste real de los componentes y sus estados.
- [ ] La estética se adapta al proyecto sin imponer nombres, arquitectura o funcionalidades.

---

**Principio final:** La interfaz debe sentirse como un instrumento diseñado por alguien que entiende sus mecanismos, no como una colección de engranajes pegados a una aplicación convencional.
