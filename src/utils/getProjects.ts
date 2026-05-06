const allMarkdownModules = import.meta.glob<{
  frontmatter: {
    title?: string;
    description?: string;
    date?: string;
    status?: string;
    image?: string;
    slug?: string;
    demoUrl?: string;
    repoUrl?: string;
    tags?: string[];
    video?: string;
    category?: string;
  };
  default: any;
}>("../content/projects/*.md", { eager: true });

export interface Project {
  title: string;
  description: string;
  date: string;
  status: string;
  image: string;
  slug: string;
  demoUrl?: string;
  repoUrl?: string;
  tags: string[];
  category?: string;
  video?: string;
  href: string;
}

export function getAllProjects(): Project[] {
  const projects: Project[] = [];

  for (const filePath in allMarkdownModules) {
    const module = allMarkdownModules[filePath];
    if (!module) continue;

    const frontmatter = module.frontmatter || {};
    const pathMatch = filePath.match(/\/([^/]+)\.md$/);
    const fileName = pathMatch ? pathMatch[1] : "";
    const slug = frontmatter.slug || fileName;

    if (!slug) continue;

    projects.push({
      title: frontmatter.title || "",
      description: frontmatter.description || "",
      date: frontmatter.date || "",
      status: frontmatter.status || "In progress",
      image: frontmatter.image || "/assets/images/projects/project1.jpg",
      slug,
      demoUrl: frontmatter.demoUrl,
      repoUrl: frontmatter.repoUrl,
      category: frontmatter.category,
      tags: frontmatter.tags || [],
      video: frontmatter.video,
      href: `/projects/${slug}`,
    });
  }

  projects.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return projects;
}

export function getProjectBySlug(slug: string): {
  frontmatter: {
    title?: string;
    description?: string;
    date?: string;
    status?: string;
    image?: string;
    slug?: string;
    demoUrl?: string;
    category?: string;
    repoUrl?: string;
    tags?: string[];
    video?: string;
  };
  Content: any;
  slug: string;
} | null {
  for (const filePath in allMarkdownModules) {
    const module = allMarkdownModules[filePath];
    if (!module) continue;

    const frontmatter = module.frontmatter || {};
    const pathMatch = filePath.match(/\/([^/]+)\.md$/);
    const fileName = pathMatch ? pathMatch[1] : "";
    const fileSlug = frontmatter.slug || fileName;

    if (fileSlug === slug) {
      return { frontmatter, Content: module.default, slug: fileSlug };
    }
  }

  return null;
}

export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((project) => project.slug);
}
