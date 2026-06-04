import {
  FiAward,
  FiClock,
  FiCode,
  FiCpu,
  FiFilm,
  FiFolder,
  FiGithub,
  FiGlobe,
  FiInstagram,
  FiLayout,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiShield,
} from "react-icons/fi";
import type {
  PortfolioContent,
  ProjectIconKey,
  ProjectItem,
  ProjectRecord,
  SocialLink,
  SocialLinkRecord,
  SocialPlatform,
  StatIconKey,
  StatItem,
  StatRecord,
} from "@/types/portfolio";

export const defaultPortfolioContent: PortfolioContent = {
  brand: {
    name: "Jeevanantham",
    fullName: "Jeevanantham B",
    heroName: "Jeevanantham",
    tagline:
      "Aspiring Software Engineer | AI & Data Science Enthusiast | Python Developer",
    greeting: "Hi there! 👋",
    description:
      "I build thoughtful digital experiences and intelligent solutions with Python, AI, data science, and modern web technologies.",
    email: "jeevbalakrishnan19@gmail.com",
    phone: "+91 00000 00000",
    location: "Tamil Nadu, India",
    college: "CARE College of Engineering",
    year: "3rd Year",
    aboutIntro:
      "I’m a passionate student developer focused on transforming ideas into elegant digital products. From AI-powered systems to polished front-end interfaces, I enjoy building experiences that feel both smart and visually refined.",
    footerBlurb:
      "Crafted with React, TypeScript, Tailwind CSS, and Framer Motion to present a premium developer portfolio experience.",
    availability: "Open to internships, collaborations, and project opportunities.",
    contactHeadline: "Best way to contact me",
    contactDescription:
      "For internship opportunities, collaborations, or project discussions, email is the fastest way to reach me. You can also leave a direct message through the contact form below.",
    heroStatus: "Building with focus",
  },
  socialLinks: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/",
      platform: "github",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/",
      platform: "linkedin",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/",
      platform: "instagram",
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:jeevbalakrishnan19@gmail.com",
      platform: "email",
    },
  ],
  projects: [
    {
      id: "ai-vault",
      title: "Personal AI Vault",
      description:
        "A privacy-focused digital vault for storing personal knowledge, notes, and structured AI-assisted workflows in one secure interface.",
      stack: ["Python", "Tkinter", "JSON"],
      github: "https://github.com/",
      demo: "#contact",
      iconKey: "shield",
      coverClass:
        "from-sky-500/40 via-blue-500/15 to-slate-950/90 before:bg-sky-400/40",
      glowClass: "bg-sky-400/25",
    },
    {
      id: "attendance",
      title: "Face Detection Attendance System",
      description:
        "An automated attendance solution using face recognition to identify students, reduce manual effort, and improve tracking accuracy.",
      stack: ["Python", "OpenCV", "MySQL"],
      github: "https://github.com/",
      demo: "#contact",
      iconKey: "cpu",
      coverClass:
        "from-violet-500/35 via-indigo-500/15 to-slate-950/90 before:bg-violet-400/40",
      glowClass: "bg-violet-400/25",
    },
    {
      id: "movie-recommendation",
      title: "Movie Recommendation System",
      description:
        "A recommendation engine that suggests movies based on user preferences, similarity models, and data-driven personalization logic.",
      stack: ["Python", "Pandas", "Scikit-learn"],
      github: "https://github.com/",
      demo: "#contact",
      iconKey: "film",
      coverClass:
        "from-fuchsia-500/35 via-purple-500/15 to-slate-950/90 before:bg-fuchsia-400/40",
      glowClass: "bg-fuchsia-400/25",
    },
    {
      id: "portfolio-site",
      title: "Portfolio Website",
      description:
        "A polished developer portfolio crafted with React, TypeScript, Framer Motion, and glassmorphism UI for a premium personal brand.",
      stack: ["React", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/",
      demo: "#home",
      iconKey: "layout",
      coverClass:
        "from-cyan-500/30 via-blue-500/15 to-slate-950/90 before:bg-cyan-400/40",
      glowClass: "bg-cyan-400/25",
    },
  ],
  stats: [
    {
      id: "projects",
      label: "Projects",
      value: 5,
      suffix: "+",
      iconKey: "folder",
    },
    {
      id: "years",
      label: "Learning Years",
      value: 2,
      suffix: "+",
      iconKey: "code",
    },
    {
      id: "certifications",
      label: "Certifications",
      value: 3,
      suffix: "+",
      iconKey: "award",
    },
    {
      id: "hours",
      label: "Coding Hours",
      value: 1000,
      suffix: "+",
      iconKey: "clock",
    },
  ],
};

const socialIconMap: Record<SocialPlatform, SocialLink["icon"]> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  email: FiMail,
  website: FiGlobe,
  phone: FiPhone,
};

const projectIconMap: Record<ProjectIconKey, ProjectItem["icon"]> = {
  shield: FiShield,
  cpu: FiCpu,
  film: FiFilm,
  layout: FiLayout,
};

const statIconMap: Record<StatIconKey, StatItem["icon"]> = {
  folder: FiFolder,
  code: FiCode,
  award: FiAward,
  clock: FiClock,
};

export function resolveSocialLinks(links: SocialLinkRecord[]): SocialLink[] {
  return links.map((link) => ({
    ...link,
    icon: socialIconMap[link.platform] ?? FiGlobe,
  }));
}

export function resolveProjects(projects: ProjectRecord[]): ProjectItem[] {
  return projects.map((project) => ({
    ...project,
    icon: projectIconMap[project.iconKey] ?? FiLayout,
  }));
}

export function resolveStats(stats: StatRecord[]): StatItem[] {
  return stats.map((item) => ({
    ...item,
    icon: statIconMap[item.iconKey] ?? FiCode,
  }));
}

export function getHeroQuickStats(stats: StatRecord[]) {
  return resolveStats(stats).slice(0, 3);
}

export function createNormalizedContent(
  input?: Partial<PortfolioContent> | null,
): PortfolioContent {
  return {
    brand: {
      ...defaultPortfolioContent.brand,
      ...(input?.brand ?? {}),
    },
    socialLinks:
      input?.socialLinks?.length
        ? input.socialLinks.map((link, index) => ({
            id: link.id || `social-${index + 1}`,
            label: link.label || `Link ${index + 1}`,
            href: link.href || "#",
            platform: link.platform || "website",
          }))
        : defaultPortfolioContent.socialLinks,
    projects:
      input?.projects?.length
        ? input.projects.map((project, index) => ({
            ...defaultPortfolioContent.projects[index % defaultPortfolioContent.projects.length],
            ...project,
            id: project.id || `project-${index + 1}`,
            stack: Array.isArray(project.stack) ? project.stack : [],
          }))
        : defaultPortfolioContent.projects,
    stats:
      input?.stats?.length
        ? input.stats.map((stat, index) => ({
            ...defaultPortfolioContent.stats[index % defaultPortfolioContent.stats.length],
            ...stat,
            id: stat.id || `stat-${index + 1}`,
            value: Number.isFinite(stat.value) ? stat.value : 0,
          }))
        : defaultPortfolioContent.stats,
  };
}
