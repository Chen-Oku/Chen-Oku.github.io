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

## 11) Regla de mantenimiento de esta guia

De ahora en adelante:

- Si un cambio impacta estructura, layout, responsive, componentes globales o flujo de contenido,
  se debe actualizar este documento en la misma iteracion.

