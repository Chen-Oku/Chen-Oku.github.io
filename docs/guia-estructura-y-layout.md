# Guia del proyecto: contenido y ubicacion visual

Este documento explica, de forma practica, donde se controla:

- Textos, enlaces, imagenes y datos.
- Ubicacion visual de elementos (margenes, paddings, tamanos, alineacion).
- Iconos y componentes reutilizables.

> Este archivo esta en `docs/`, fuera de `src/pages/`, por lo que **no se renderiza como pagina** en Astro y no aparece en tu portafolio publicado.

---

## 1) Regla principal del proyecto

En este proyecto hay dos capas:

- **Contenido (que se muestra):** textos, links, rutas de imagenes, metadatos.
- **Presentacion/Layout (como se ve y donde va):** clases Tailwind y algunos estilos CSS en cada pagina `.astro`.

En corto:

- Si quieres cambiar **que dice** algo -> edita `src/config/content.ts` o `src/content/*.md`.
- Si quieres cambiar **donde se ubica** o **como se ve** -> edita clases en `src/pages/*.astro` o componentes en `src/components/*.astro`.

---

## 2) Donde se controla la ubicacion (margenes, posiciones, tamanos)

### A. Paginas `.astro` (layout principal por seccion)

Archivos clave:

- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/posts.astro`
- `src/pages/posts/[slug].astro`
- `src/pages/projects.astro`
- `src/pages/projects/[slug].astro`

Aqui veras clases de Tailwind como:

- `mx-auto` -> centra horizontalmente.
- `mt-24`, `mb-12`, `px-7` -> margenes/padding.
- `w-[896px]`, `max-w-4xl`, `w-full` -> ancho.
- `flex`, `grid`, `items-center`, `justify-between`, `gap-8` -> distribucion.
- `absolute`, `relative`, `inset-0`, `z-10`, `z-20` -> posicion en capas.

Estas clases son la fuente principal de "donde va cada cosa".

### B. Bloques `<style>` dentro de paginas

En varias paginas hay estilos internos para:

- Fondo tipo patron (`dot-hexagon-light` / `dot-hexagon-dark`).
- Reglas base de `html`, `body`, `main`.
- Ajustes de overflow y estructura vertical.

Si algo no se puede resolver solo con clases Tailwind, se ajusta aqui.

### C. Componentes compartidos

- `src/components/Navigation.astro`
- `src/components/Footer.astro`

Controlan barra superior y pie de pagina en todas las vistas.
Si cambias espaciados aqui, impactas varias paginas al mismo tiempo.

---

## 3) Donde se controla el contenido (textos, imagenes, links)

### A. Config central: `src/config/content.ts`

Este archivo es tu panel de contenido global:

- `siteConfig` -> titulo general, redes sociales.
- `homeContent` -> textos y botones de inicio, imagen principal.
- `aboutContent` -> bio, skills, experiencia, imagen de perfil.
- `postsContent` / `projectsContent` -> titulos y textos de esas secciones.

Tambien hay configuracion de GitHub para la seccion de repos en proyectos:

- usuario
- repos destacados
- overrides (titulo/descripcion/lenguaje por repo)

### B. Contenido de posts/proyectos en Markdown

- Posts: `src/content/posts/*.md`
- Proyectos: `src/content/projects/*.md`

En cada archivo `.md`, el bloque frontmatter (`---`) define:

- `title`, `description`, `date`
- `image` (ruta de portada)
- `slug` (URL)
- otros campos como `readTime`, `status`, `tags`, `repoUrl`, etc.

El cuerpo Markdown es el contenido del articulo/proyecto.

---

## 4) Flujo de datos (de donde sale lo que ves)

### Posts

- `src/utils/getPosts.ts` carga todos los `.md` de `src/content/posts/` con `import.meta.glob`.
- Genera objetos `Post` (titulo, descripcion, imagen, fecha, slug, href).
- `src/pages/posts.astro` los renderiza en listado.
- `src/pages/posts/[slug].astro` renderiza el detalle.

### Projects

- `src/utils/getProjects.ts` hace lo mismo para `src/content/projects/`.
- `src/pages/projects.astro` renderiza cards de proyectos + repos de GitHub.
- `src/pages/projects/[slug].astro` renderiza detalle de cada proyecto.

### Repos GitHub

- `src/utils/getGithubRepos.ts` consulta la API de GitHub.
- Se mezcla con `repoOverrides` de `src/config/content.ts`.

---

## 5) Iconos: donde estan y como editarlos

- En `src/components/Footer.astro` los iconos de redes son SVG inline.
- En `src/components/Navigation.astro` estan los iconos de tema (sol/luna) en SVG.
- En cards o botones tambien hay SVG inline en las paginas `.astro`.

Si quieres cambiar un icono:

1. Busca el `<svg>` en el archivo correspondiente.
2. Reemplaza su `path` o cambia clases (`w-5 h-5`, color, hover, etc.).

---

## 6) Guia rapida: "quiero cambiar X, donde voy?"

- **Texto de Home/About/Meta/Redes:** `src/config/content.ts`
- **Imagen de portada en card post/proyecto:** frontmatter `image` en `src/content/.../*.md`
- **Orden o lectura de posts/proyectos:** `src/utils/getPosts.ts` / `src/utils/getProjects.ts`
- **Espaciado/alineacion de una pagina:** `src/pages/*.astro` (clases Tailwind)
- **Navbar/Footer global:** `src/components/Navigation.astro` / `src/components/Footer.astro`
- **Dark mode por clase:** `tailwind.config.js` (`darkMode: 'class'`) + scripts de tema en paginas

---

## 7) Por que este documento no aparece en la build

Astro crea rutas publicas desde `src/pages/`.
Como esta guia vive en `docs/guia-estructura-y-layout.md`, no se convierte en pagina del sitio.

---

## 8) Recomendacion para mantenimiento facil

Si luego quieres escalar y editar mas rapido:

- Mantener casi todo el texto editable en `src/config/content.ts` y `src/content/*.md`.
- Reducir logica repetida de layout moviendo wrappers comunes a un `Layout.astro`.
- Unificar estilos repetidos de fondo/tema en un solo archivo o layout base.

---

## 9) Criterios responsive aplicados (actualizado)

Se aplicaron ajustes para mejorar adaptabilidad en movil/tablet/escritorio:

- `src/components/Navigation.astro`
  - Menu desktop visible desde `md`.
  - Menu movil desplegable con boton hamburguesa.
  - Toggle de tema separado para desktop y movil.
- `src/pages/index.astro`
  - Hero pasa de 2 columnas a apilado en pantallas pequenas.
  - Botones permiten wrap.
  - Bloque de imagen usa ancho fluido en movil.
- `src/pages/about.astro`
  - Contenedor principal cambia de ancho fijo a `w-full + max-w`.
  - Imagen de perfil usa `max-w` + `aspect-square`.
  - Bloques de Experience/Connect se apilan mejor en pantallas intermedias y pequenas.
- `src/pages/posts.astro`
  - Cards de posts pasan de fila a columna en movil.
  - Padding adaptable por breakpoint.
  - Paginacion con `flex-wrap`.
- `src/pages/posts/[slug].astro`
  - Contenedor fluido con padding responsive.
  - Metadatos del header hacen wrap.
- `src/pages/projects.astro` y `src/pages/projects/[slug].astro`
  - Contenedores con ancho fluido.
  - Padding y bloques de texto adaptables.
  - Botones y metadata con wrap cuando falta ancho.

---

## 10) Como agregar imagenes, videos y codigo en posts/proyectos

### A. Imagenes en el contenido Markdown

Para agregar imagenes dentro del cuerpo de un post o proyecto, usa la sintaxis estandar de Markdown:

```markdown
![Descripcion de la imagen](/assets/images/projects/YourProject/image.jpg)
```

**Importante:**
- La ruta debe comenzar con `/` (ruta absoluta desde `public/`)
- Respeta la sensibilidad a mayusculas/minusculas en nombres de carpetas
- Coloca tus imagenes en `public/assets/images/projects/` o `public/assets/images/posts/`

### B. Videos

Hay dos formas de agregar videos:

**1. Video en el header (frontmatter):**
Agrega el campo `video` en el frontmatter del archivo `.md`:

```yaml
---
title: "Mi Proyecto"
video: "/assets/videos/YourProject/demo.mp4"
---
```

El video aparecera automaticamente debajo de la imagen de portada en la pagina de detalle.

**2. Video en el contenido:**
Usa el tag HTML5 `<video>` directamente en el Markdown:

```html
<video src="/assets/videos/YourProject/demo.mp4" controls>
  Tu navegador no soporta videos.
</video>
```

**Estructura de carpetas para videos:**
- Proyectos: `public/assets/videos/YourProject/`
- Posts: `public/assets/videos/YourPost/`

### C. Bloques de codigo

Para agregar segmentos de codigo, usa la sintaxis estandar de Markdown con triple backticks:

```markdown
```csharp
void Start() {
    Debug.Log("Hola Mundo");
}
```
```

Los bloques de codigo tienen estilos automaticos:
- Fondo oscuro para bloques multilinea
- Colores diferenciados para codigo inline (modo claro/oscuro)
- Bordes redondeados y scroll horizontal cuando es necesario

### D. Captions (pies de foto) para imagenes, videos y GIFs

Para agregar captions o descripciones debajo de imagenes, videos o GIFs, usa los tags HTML5 `<figure>` y `<figcaption>`:

**Para imagenes:**
```html
<figure>
  <img src="/assets/images/projects/YourProject/image.jpg" alt="Descripcion para accesibilidad">
  <figcaption>Descripcion o pie de foto de la imagen</figcaption>
</figure>
```

**Nota importante:** El atributo `alt` en el tag `<img>` es equivalente al texto en `![Texto](ruta)` de Markdown. Debe siempre incluirse para:
- Accesibilidad (lectores de pantalla)
- Respaldo si el HTML no se renderiza correctamente
- SEO y descripción del contenido

**Para videos:**
```html
<figure>
  <video src="/assets/videos/YourProject/demo.mp4" controls>
    Tu navegador no soporta videos.
  </video>
  <figcaption>Descripcion del video o contexto</figcaption>
</figure>
```

**Para GIFs (tratados como imagenes):**
```html
<figure>
  <img src="/assets/images/projects/YourProject/animation.gif" alt="Animacion">
  <figcaption>Descripcion de la animacion o GIF</figcaption>
</figure>
```

**Estilos aplicados automaticamente:**
- El caption aparece centrado debajo del media
- Texto en italico y color gris (mas claro en modo oscuro)
- Margen apropiado entre el media y el caption
- El media se centra automaticamente

### E. Crear nuevos proyectos/posts

**Para proyectos:**
1. Copia cualquier archivo de `src/content/projects/*.md`
2. Cambia el `slug` en el frontmatter (debe ser unico)
3. Actualiza los campos: `title`, `description`, `date`, `status`, `image`, `tags`
4. Opcional: agrega `video`, `demoUrl`, `repoUrl`
5. Escribe el contenido en Markdown con imagenes, videos y codigo

**Para posts:**
1. Copia cualquier archivo de `src/content/posts/*.md`
2. Cambia el `slug` en el frontmatter (debe ser unico)
3. Actualiza los campos: `title`, `description`, `date`, `readTime`, `image`
4. Opcional: agrega `video`
5. Escribe el contenido en Markdown

**Regla critica:** Cada proyecto/post debe tener un `slug` unico. Si duplicas un archivo sin cambiar el slug, ambos mostraran el mismo contenido.

To create a new project:

1. **Copy this file** to create a new `.md` file in `src/content/projects/`
2. **Update the frontmatter** with your project details:
   - `title`: Project name
   - `description`: Short description
   - `date`: Publication date (YYYY-MM-DD)
   - `status`: "Completed", "In progress", etc.
   - `image`: Path to cover image (e.g., `/assets/images/projects/YourProject/image.png`)
   - `slug`: Unique URL identifier (must be unique per project)
   - `demoUrl`: Optional live demo link
   - `repoUrl`: Optional repository link
   - `tags`: Array of tags
   - `video`: Optional path to video file (e.g., `/assets/videos/YourProject/demo.mp4`)

3. **Add images** to your content using standard Markdown syntax:
   ```markdown
   ![Alt text](/assets/images/projects/YourProject/image.jpg)
   ```

4. **Add videos** in frontmatter (for header video) or embed in content:
   - Frontmatter: `video: "/assets/videos/YourProject/demo.mp4"`
   - Content: Use HTML video tag if needed

5. **Add code snippets** using standard Markdown code blocks:
   ```markdown
   ```csharp
   void Start() {
       Debug.Log("Hello World");
   }
   ```
   ```

6. **Place your assets** in the public folder:
   - Images: `public/assets/images/projects/YourProject/`
   - Videos: `public/assets/videos/YourProject/`

### Creating New Posts

The same structure applies to posts in `src/content/posts/`:
- Copy any existing post file
- Update frontmatter (posts use `readTime` instead of `status`)
- Add images, videos, and code blocks the same way
- Place assets in `public/assets/images/posts/` and `public/assets/videos/posts/`

**Important**: Each project/post must have a unique `slug` value to avoid conflicts.

---

## 11) Uso del componente `<Image />` de Astro (Optimización de imágenes)

### ¿Por qué usar `<Image />` en lugar de `<img>`?

Astro proporciona el componente `<Image />` para optimización automática de imágenes:

- **Conversión automática a WebP** (formato moderno más ligero)
- **Generación de múltiples tamaños** responsive
- **Lazy loading** por defecto
- **Mejor rendimiento** y SEO

### Estructura de carpetas para imágenes optimizadas

**Antes (método antiguo):**
- Imágenes en `public/assets/images/`
- Rutas absolutas como `/assets/images/projects/image.jpg`

**Ahora (método optimizado):**
- Imágenes en `src/assets/images/` 
- Importación directa en archivos MDX

### Cómo implementar `<Image />` en archivos MDX

**1. Convierte tu archivo `.md` a `.mdx`:**
```bash
# Renombra el archivo
mv src/content/projects/YourProject.md src/content/projects/YourProject.mdx
```

**2. Agrega las importaciones al principio del archivo:**
```mdx
import { Image } from 'astro:assets';
import projectImage from '../assets/images/projects/YourProject/image.jpg';
import anotherImage from '../assets/images/projects/YourProject/another.jpg';
```

**3. Reemplaza las etiquetas `<img>` por `<Image />`:**
```mdx
<!-- Antes -->
<img src="/assets/images/projects/YourProject/image.jpg" alt="Descripción" class="w-full" />

<!-- Ahora -->
<Image 
  src={projectImage} 
  alt="Descripción" 
  class="w-full" 
  width={800} 
  height={600} 
/>
```

**4. Para imágenes con zoom (recomendado):**
```mdx
import ImageZoom from '../components/ImageZoom.astro';

<ImageZoom 
  src={projectImage} 
  alt="Descripción" 
  class="w-full rounded-lg shadow-lg" 
/>
```

### Ventajas de este método

- **Rendimiento:** Imágenes hasta 80% más ligeras con WebP
- **SEO:** Mejores tiempos de carga
- **Responsive:** Tamaños automáticos según dispositivo
- **Accesibilidad:** Lazy loading y atributos optimizados

---

## 12) Estructura Grid para imágenes múltiples

### Para mostrar imágenes lado a lado

Usa el sistema de grid de Tailwind CSS para organizar múltiples imágenes:

```mdx
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <figure class="m-0">
    <ImageZoom src={image1} alt="Descripción 1" class="rounded-lg shadow-md w-full h-auto object-cover aspect-video" />
    <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Pie de foto 1</figcaption>
  </figure>
  <figure class="m-0">
    <ImageZoom src={image2} alt="Descripción 2" class="rounded-lg shadow-md w-full h-auto object-cover aspect-video" />
    <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Pie de foto 2</figcaption>
  </figure>
</div>
```

### Opciones de grid comunes

**2 columnas (móvil 1, escritorio 2):**
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
```

**3 columnas (móvil 1, tablet 2, escritorio 3):**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

**4 columnas (móvil 2, escritorio 4):**
```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
```

**Auto-fit (adaptable según ancho disponible):**
```html
<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
```

### Clases útiles para imágenes en grid

- `object-cover`: Mantiene proporción cubriendo el contenedor
- `object-contain`: Mantiene proporción sin recortar
- `aspect-video`: Relación 16:9
- `aspect-square`: Relación 1:1
- `w-full h-auto`: Ancho completo, altura automática

---

## 13) Funcionalidad de Zoom (Lightbox)

### Cómo funciona el zoom automático

Todas las imágenes usando el componente `ImageZoom` tienen zoom automático:

- **Click en imagen:** Abre modal con versión ampliada
- **Click fuera o Escape:** Cierra el modal
- **Responsive:** Se adapta al tamaño de pantalla
- **Animaciones:** Transiciones suaves al abrir/cerrar

### Implementación

**1. Importa el componente:**
```mdx
import ImageZoom from '../components/ImageZoom.astro';
```

**2. Úsalo en lugar de `<img>` o `<Image />`:**
```mdx
<ImageZoom 
  src={yourImage} 
  alt="Descripción" 
  class="w-full rounded-lg shadow-lg" 
/>
```

### Estilos aplicados automáticamente

- **Cursor:** `cursor: zoom-in` en hover
- **Efecto hover:** Ligera escala (`scale(1.05)`)

---

## 14) Estructura unificada para imágenes en proyectos

### Plantilla estándar para imágenes individuales

Para mantener consistencia visual y funcional en todos los proyectos, usa esta estructura para **todas las imágenes del cuerpo del proyecto** (excepto la imagen de portada del frontmatter):

```html
<figure class="my-8">
  <img src="/assets/images/projects/YourProject/image.jpg" alt="Descripción detallada y accesible de lo que muestra la imagen" class="w-full rounded-lg shadow-lg">
  <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Título descriptivo de la imagen en formato de pie de foto.</figcaption>
</figure>
```

### Componentes de la estructura

**1. Contenedor `<figure>`:**
- `class="my-8"`: Margen vertical consistente (3rem arriba y abajo)

**2. Imagen `<img>`:**
- `src`: Ruta absoluta desde `/assets/images/projects/`
- `alt`: Descripción detallada para accesibilidad y SEO
- `class="w-full rounded-lg shadow-lg"`: 
  - `w-full`: Ancho completo del contenedor
  - `rounded-lg`: Bordes redondeados consistentes
  - `shadow-lg`: Sombra sutil para profundidad

**3. Caption `<figcaption>`:**
- `class="text-sm text-center mt-2 text-gray-500 italic"`:
  - `text-sm`: Tamaño de fuente pequeño
  - `text-center`: Centrado horizontal
  - `mt-2`: Margen superior pequeño
  - `text-gray-500`: Color gris suave
  - `italic`: Texto en cursiva

### Ejemplos de uso

**Imagen simple:**
```html
<figure class="my-8">
  <img src="/assets/images/projects/FrankenHand/FrankenHand3.jpg" alt="FrankenHand gameplay screenshot showing the 2D hand character in a 3D gothic environment" class="w-full rounded-lg shadow-lg">
  <figcaption class="text-sm text-center mt-2 text-gray-500 italic">FrankenHand in action: 2D protagonist navigating through 3D gothic environments.</figcaption>
</figure>
```

**GIF/Animación:**
```html
<figure class="my-8">
  <img src="/assets/images/projects/FrankenHand/HiddingHand.gif" alt="Dynamic outline system demonstration showing the hand character becoming visible and invisible with the custom shader" class="w-full rounded-lg shadow-lg">
  <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Dynamic Outline System: Real-time depth adjustments for 2D character visibility.</figcaption>
</figure>
```

### Imágenes en grid (múltiples imágenes)

Para mostrar múltiples imágenes lado a lado, usa el grid envolviendo las figuras individuales:

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <figure class="m-0">
    <img src="/assets/images/projects/FrankenHand/FrankenHand4.jpg" alt="Descripción imagen 1" class="rounded-lg shadow-md w-full h-auto object-cover aspect-video">
    <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Pie de foto 1</figcaption>
  </figure>
  <figure class="m-0">
    <img src="/assets/images/projects/FrankenHand/FrankenHand5.jpg" alt="Descripción imagen 2" class="rounded-lg shadow-md w-full h-auto object-cover aspect-video">
    <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Pie de foto 2</figcaption>
  </figure>
</div>
```

**Diferencias clave en grid:**
- `<figure>` usa `class="m-0"` para eliminar márgenes individuales
- `<img>` usa `shadow-md` en lugar de `shadow-lg` (sombra más sutil)
- Se agregan `object-cover aspect-video` para mantener proporciones consistentes

### Reglas de aplicación

1. **Imágenes de portada**: No usan `<figure>` ni `<figcaption>` (definidas en frontmatter)
2. **Imágenes del cuerpo**: Siempre usan la estructura unificada
3. **Grids**: Usan clases específicas para optimización visual
4. **Consistencia**: Mantén el mismo estilo en todos los proyectos

### Beneficios

- **Consistencia visual**: Todas las imágenes tienen el mismo aspecto
- **Accesibilidad**: Alt text descriptivo y estructura semántica
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Mantenimiento**: Fácil de actualizar y mantener

---

## 15) Botón "Back to Top" (Volver arriba)

### Descripción del componente

Se ha implementado un botón flotante "Back to Top" para mejorar la navegación en páginas largas como proyectos y posts individuales.

### Características

- **Posición fija**: Bottom-right corner (`bottom-8 right-8`)
- **Aparición inteligente**: Solo visible después de hacer scroll 300px
- **Animación suave**: Scroll animado con easing ease-out (500ms)
- **Efectos hover**: Scale y color transitions
- **Accesibilidad**: Aria labels y tooltips
- **Responsive**: Visible en todos los dispositivos

### Implementación técnica

**Componente**: `src/components/BackToTop.astro`

**Funcionamiento**:
```javascript
// Aparece después de 300px de scroll
const scrollThreshold = 300;

// Animación smooth scroll con easing
function scrollToTop() {
  const duration = 500;
  const easeOut = 1 - Math.pow(1 - progress, 3);
}
```

**Estilos principales**:
```css
fixed bottom-8 right-8 z-50 p-3 
bg-neutral-800 dark:bg-neutral-700 
text-white rounded-full shadow-lg 
hover:bg-neutral-700 dark:hover:bg-neutral-600 
transition-all duration-300 
opacity-0 invisible hover:scale-110
```

### Uso en páginas

El componente se importa y se agrega al final del `<body>`:

```astro
---
import BackToTop from "../../components/BackToTop.astro";
---

<html>
  <!-- ... contenido ... -->
  <body>
    <!-- ... contenido ... -->
    <Footer />
    <BackToTop />
  </body>
</html>
```

### Páginas con el botón implementado

- ✅ `src/pages/projects/[slug].astro` - Detalles de proyectos
- ✅ `src/pages/posts/[slug].astro` - Detalles de posts

### Comportamiento esperado

1. **Estado inicial**: Invisible (`opacity-0 invisible`)
2. **Scroll > 300px**: Aparece con fade-in (`opacity-100 visible`)
3. **Click**: Scroll suave hacia arriba con animación
4. **Hover**: Efecto scale (+10%) y cambio de color

### Personalización

Para ajustar el comportamiento:

- **Scroll threshold**: Modificar `scrollThreshold` en el script
- **Posición**: Cambiar clases `bottom-*` y `right-*`
- **Animación**: Ajustar `duration` en `scrollToTop()`
- **Colores**: Modificar clases `bg-*` y `hover:bg-*`

---

## 16) Sistema de filtros en la página de Proyectos

### Descripción general

La página de proyectos (`src/pages/projects.astro`) cuenta con un sistema de filtrado doble:

1. **Filtros por categoría**: Botones principales para filtrar por tipo de proyecto (All, Personal, GameDev)
2. **Filtros por tags**: Chips seleccionables para filtrar por roles o tecnologías (Technical Art, Team Lead, UI/UX, etc.)

### Cómo funciona el sistema

**1. Categorías (Nivel principal)**
- Los botones de categoría están ubicados debajo de la descripción de la sección
- "All" muestra todos los proyectos sin importar la categoría
- Las categorías específicas (Personal, GameDev) filtran por el campo `category` del frontmatter
- Solo se puede seleccionar una categoría a la vez

**2. Tags (Nivel secundario)**
- Los tags se muestran como chips redondeados debajo de los botones de categoría
- Se pueden seleccionar múltiples tags simultáneamente
- Los proyectos deben tener TODOS los tags seleccionados para mostrarse (lógica AND)
- Botón "Clear Tags" para limpiar la selección de tags

**3. Combinación de filtros**
- Los filtros de categoría y tags trabajan juntos
- Un proyecto debe coincidir con la categoría seleccionada Y con todos los tags seleccionados
- Si no hay tags seleccionados, solo se filtra por categoría

### Cómo agregar categorías y tags a proyectos

**1. Agregar categoría al frontmatter:**
```yaml
---
title: "Mi Proyecto"
description: "Descripción del proyecto"
category: "GameDev"  # O "Personal", o cualquier otra categoría
tags:
  - Unity
  - Technical Art
  - Team Lead
---
```

**2. Valores de categoría válidos:**
- `GameDev`: Proyectos de desarrollo de juegos
- `Personal`: Proyectos personales
- Cualquier otro valor que definas (se mostrará automáticamente en los botones)

**3. Tags recomendados por rol:**
- `Technical Art`: Proyectos donde fuiste Technical Artist
- `Team Lead`: Proyectos donde fuiste líder de equipo
- `Game Dev`: Desarrollo general de juegos
- `UI/UX`: Diseño y desarrollo de interfaces
- `C#`: Programación en C#
- `Unity`: Desarrollo en Unity
- `Shader Graph`: Trabajo con shaders visuales
- `VFX`: Efectos visuales y partículas

### Estructura técnica

**1. En `src/utils/getProjects.ts`:**
- El campo `category` se agrega a la interfaz `Project`
- Se extrae del frontmatter y se incluye en el objeto del proyecto

**2. En `src/pages/projects.astro`:**
- Se extraen categorías únicas: `const allCategories = ["All", ...Array.from(new Set(allProjects.map(p => p.category).filter(Boolean)))]`
- Se extraen tags únicos: `const allTags = Array.from(new Set(allProjects.flatMap(p => p.tags || []))).sort()`
- Los botones de categoría se generan dinámicamente con el atributo `data-category-filter`
- Los chips de tags se generan dinámicamente con el atributo `data-tag-filter`
- Cada tarjeta de proyecto tiene atributos `data-category` y `data-tags` para el filtrado

**3. Lógica JavaScript de filtrado:**
```javascript
// Estado actual
let currentCategory = "All";
let currentTags = new Set<string>();

// Función principal de filtrado
function filterProjects() {
  projectCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category") || "Uncategorized";
    const cardTags = (card.getAttribute("data-tags") || "").split(",").map(t => t.trim()).filter(t => t);

    const categoryMatch = currentCategory === "All" || cardCategory === currentCategory;
    const tagsMatch = currentTags.size === 0 || [...currentTags].every((tag: string) => cardTags.includes(tag));

    if (categoryMatch && tagsMatch) {
      htmlCard.style.display = "flex";
      htmlCard.style.opacity = "1";
    } else {
      htmlCard.style.display = "none";
      htmlCard.style.opacity = "0";
    }
  });
}
```

### Visualización de tags en las tarjetas

Las tarjetas de proyecto muestran hasta 4 tags:
- Los tags se muestran como chips pequeños debajo de la descripción
- Si hay más de 4 tags, se muestra un contador (ej: "+2")
- Los tags tienen estilo consistente con el diseño del sitio

### Estilos de los filtros

**Botones de categoría:**
- Estado activo: Fondo oscuro (`bg-neutral-900` en claro, `bg-neutral-100` en oscuro)
- Estado inactivo: Fondo claro con borde (`bg-white` o `dark:bg-neutral-800`)
- Transiciones suaves de 200ms

**Chips de tags:**
- Forma redondeada (`rounded-full`)
- Tamaño pequeño (`text-xs`)
- Estado seleccionado: Fondo oscuro igual que botones de categoría
- Estado no seleccionado: Fondo claro con borde

### Cómo extender el sistema

**Agregar nuevas categorías:**
1. Simplemente agrega el valor de `category` al frontmatter de un proyecto
2. El botón se generará automáticamente en la página

**Agregar nuevos tags:**
1. Agrega el tag al array `tags` en el frontmatter
2. El chip se generará automáticamente

**Personalizar estilos:**
- Edita las clases Tailwind en los botones y chips en `src/pages/projects.astro`
- Los patrones de color siguen el esquema neutral del sitio

### Comportamiento responsivo

- Los botones de categoría y chips de tags usan `flex-wrap` para adaptarse a pantallas pequeñas
- En móviles, los filtros se apilan verticalmente según el espacio disponible
- Las tarjetas de proyecto mantienen su grid responsive (1 columna en móvil, 2 en tablet, 3 en desktop)

---

## 17) Regla de mantenimiento de esta guía

De ahora en adelante:

- Si un cambio impacta estructura, layout, responsive, componentes globales o flujo de contenido,
  se debe actualizar este documento en la misma iteración.
