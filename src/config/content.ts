export const siteConfig = {
  name: "Chen Oku's Portfolio",
  title: "Chen Oku's Portfolio",
  description: "A showcase of my work and thoughts",
  social: {
    github: "https://github.com/tomcomtang/astro-multiplepage-portfolio",
    twitter: "https://x.com/astrodotbuild",
    email: "mailto:364786053@qq.com",
  },
};

export const homeContent = {
  title: "Hello, I'm Miguel Velandia (Chen Oku)",
  description:
    "I design and build interactive experiences through Unity, UI/UX systems, gameplay development, and real-time 3D environments.",
  buttons: {
    about: {
      text: "View About",
      href: "/about/",
    },
    posts: {
      text: "Read Posts",
      href: "/posts/",
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
  description:
  "I’m an Industrial Designer, Unity Developer, and 3D Artist with over 9 years of experience creating visual and interactive solutions across product design, architectural visualization, and real-time digital experiences. My work is centered around understanding how people interact with products, spaces, and interfaces, designing solutions that improve usability, communication, and player experience. This naturally led me into game development, where I combine design thinking, technical implementation, and real-time 3D workflows inside Unity. I enjoy working as the bridge between creative vision and technical execution, building gameplay systems, UI interactions, and immersive environments that feel both functional and engaging.",
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
    src: "/assets/images/about/coder.jpg",
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
    description:
      "Feel free to reach out if you want to collaborate or just say hi! You can find us on social media or drop us an",
    email: {
      text: "email",
      href: "mailto:364786053@qq.com",
    },
  },
};

export const projectsContent = {
  meta: {
    title: "Projects - Your Portfolio",
    description: "Showcase of my best work and projects",
  },
  title: "Our Projects",
  description:
    "Here you can showcase your best work. Each project should include a brief description, the technologies used, and any notable achievements. This helps potential clients or employers understand your capabilities.",
  projects: [
    {
      title: "Project One",
      description:
        "A brief description of your first project. Explain what it does and what technologies you used.",
      image: "/assets/images/projects/project1.jpg",
      href: "#",
    },
    {
      title: "Project Two",
      description:
        "Describe your second project here. Highlight the key features and your role in development.",
      image: "/assets/images/projects/project2.jpg",
      href: "#",
    },
    {
      title: "Project Three",
      description:
        "Share details about your third project. What problems did it solve? What was the outcome?",
      image: "/assets/images/projects/project3.png",
      href: "#",
    },
  ],
};

