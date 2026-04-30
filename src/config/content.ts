export const siteConfig = {
  name: "Chen Oku's Portfolio",
  title: "Chen Oku's Portfolio",
  description: "A showcase of my work and thoughts",
  social: {
    github: "https://github.com/Chen-Oku",
    behance: "https://www.behance.net/Chenoku",
    linkedin: "https://www.linkedin.com/in/mvsierra",
    email: "mailto:chenoku@gmail.com",
  },
  socialLinks: [
    {
      id: "behance",
      label: "Behance",
      href: "https://www.behance.net/Chenoku",
      icon: "behance",
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/Chen-Oku",
      icon: "github",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mvsierra",
      icon: "linkedin",
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:chenoku@gmail.com",
      icon: "email",
    },
  ],
};

export const homeContent = {
  title: "Hello, I'm Miguel Velandia (Chen Oku)",
  descriptionParagraphs: [
    "I design and build interactive experiences through Unity, UI/UX systems, gameplay development, and real-time 3D environments.",
  ],
  buttons: {
    about: {
      text: "View About",
      href: "/about/",
    },
    posts: {
      text: "View Projects",
      href: "/projects/",
    },
  },
  images: {
    light: "https://multiplepage-portfolio.edgeone.app/assets/images/tech-background-light.svg",
    dark: "/assets/images/tech-background-dark.svg",
  },
};

export const aboutContent = {
  meta: {
    title: "About - Chen Oku's Portfolio",
    description: "Learn more about my background, skills, and experience",
  },
  title: "About Me",
  descriptionParagraphs: [
    "I’m an Industrial Designer, Unity Developer, and 3D Artist with over 9 years of experience creating visual and interactive solutions across product design, architectural visualization, and real-time digital experiences.",
    "My work is centered around understanding how people interact with products, spaces, and interfaces, designing solutions that improve usability, communication, and player experience.",
    "This naturally led me into game development, where I combine design thinking, technical implementation, and real-time 3D workflows inside Unity.",
    "I enjoy working as the bridge between creative vision and technical execution, building gameplay systems, UI interactions, and immersive environments that feel both functional and engaging.",
  ],
  skills: [
    "Unity",
    "Unreal Engine",
    "C#",
    "Shader Graph",
    "VFX Graph",
    "Real-Time Lighting",
    "UI/UX Design",
    "Figma",
    "Adobe XD",
    "Gameplay Systems",
    "Technical Art",
    "3D Modeling",
    "ArchViz",
    "Product Rendering",
    "Interactive Design",
  ],
  image: {
    src: "/assets/images/about/Miguel.jpg",
    alt: "Profile",
  },
  experience: {
    title: "Experience",
    items: [
      {
        period: "2018 – Present",
        position: "Product Designer | Visualization Specialist",
        company: "Freelance & Commercial Projects",
        description: "Created product visualization, rendering, and interior design solutions for commercial and residential projects, combining technical precision with strong visual communication and client-centered design.",
      },
      {
        period: "2024 – Present",
        position: "Unity Developer | Technical Artist",
        company: "Indie Game Developer",
        description:
          "Developed gameplay systems, player interactions, UI implementation workflows, and optimized real-time environments for Unity-based projects. Collaborated with designers and developers to improve usability, gameplay clarity, and technical performance.",
      },
      {
        period: "2021 – 2026",
        position: "Senior 3D Artist | ArchViz Specialist",
        company: "Grupo Advanced Education",
        description:
          "Designed immersive learning environments and interactive visual systems focused on usability, spatial clarity, and user experience. Developed visual communication strategies, lighting systems, and presentation workflows that improved client understanding and decision-making.",
      },
    ],
  },
  connect: {
    title: "Let's Connect",
    introParagraph:
      "I’m always open to new opportunities in game development, UI/UX design, and real-time interactive projects.",
    linksParagraph: {
      beforeLinks:
        "Whether you'd like to collaborate, discuss a role, or simply connect, feel free to reach out via ",
      betweenLinks: " or ",
      afterLinks: ".",
    },
    outroParagraph: "I look forward to connecting with you!",
    linkedIn: {
      text: "LinkedIn",
      href: "https://www.linkedin.com/in/mvsierra",
    },
    email: {
      text: "email",
      href: "mailto:364786053@qq.com",
    },
  },
};

export const postsContent = {
  meta: {
    title: "Blog Posts - Your Portfolio",
    description: "Read my latest blog posts and articles",
  },
  title: "Blog Posts",
};

export const projectsContent = {
  meta: {
    title: "Projects - Your Portfolio",
    description: "Showcase of my best work and projects",
  },
  title: "Our Projects",
  descriptionParagraphs: [
    "Here you can showcase your best work.",
    "Each project should include a brief description, the technologies used, and any notable achievements.",
    "This helps potential clients or employers understand your capabilities.",
  ],
  github: {
    username: "Chen-Oku",
    featuredRepos: ["Checkpoint4", "FrankenHand"],
    maxRepos: 8,
    repoOverrides: {
      Checkpoint4: {
        title: "Checkpoint4 - Power-Ups VFX",
        description:
          "Unity third-person prototype with interactive power-ups, custom shaders, and VFX systems.",
        language: "C# / ShaderLab / HLSL",
      },
      FrankenHand: {
        description:
          "Gameplay and technical-art experiments focused on interaction and visual feedback.",
      },
    },
  },
};

