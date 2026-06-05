import {
  FiAward,
  FiClock,
  FiCode,
  FiCpu,
  FiDatabase,
  FiFilm,
  FiFolder,
  FiGitBranch,
  FiGithub,
  FiGlobe,
  FiInstagram,
  FiLayout,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiShield,
  FiZap,
} from "react-icons/fi";
import {
  SiCss,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type {
  PortfolioContent,
  ProjectIconKey,
  ProjectItem,
  ProjectRecord,
  SkillIconKey,
  SkillItem,
  SkillRecord,
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
  profileImage: "/images/jeevanantham-profile.png",
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
  skills: [
    {
      id: "python",
      name: "Python",
      iconKey: "python",
      accentClass: "from-yellow-400/20 via-blue-500/15 to-transparent text-yellow-300",
    },
    {
      id: "javascript",
      name: "JavaScript",
      iconKey: "javascript",
      accentClass: "from-yellow-300/20 via-amber-400/10 to-transparent text-yellow-200",
    },
    {
      id: "typescript",
      name: "TypeScript",
      iconKey: "typescript",
      accentClass: "from-blue-400/20 via-sky-500/10 to-transparent text-sky-200",
    },
    {
      id: "react",
      name: "React",
      iconKey: "react",
      accentClass: "from-cyan-400/20 via-blue-500/10 to-transparent text-cyan-200",
    },
    {
      id: "tailwind",
      name: "Tailwind",
      iconKey: "tailwind",
      accentClass: "from-cyan-300/20 via-sky-400/10 to-transparent text-cyan-200",
    },
    {
      id: "sql",
      name: "SQL",
      iconKey: "sql",
      accentClass: "from-orange-300/20 via-amber-500/10 to-transparent text-orange-200",
    },
    {
      id: "html",
      name: "HTML5",
      iconKey: "html",
      accentClass: "from-orange-400/20 via-rose-500/10 to-transparent text-orange-200",
    },
    {
      id: "css",
      name: "CSS3",
      iconKey: "css",
      accentClass: "from-blue-400/20 via-indigo-500/10 to-transparent text-blue-200",
    },
    {
      id: "git",
      name: "Git",
      iconKey: "git",
      accentClass: "from-orange-400/20 via-red-500/10 to-transparent text-orange-200",
    },
    {
      id: "pandas",
      name: "Pandas",
      iconKey: "pandas",
      accentClass: "from-fuchsia-400/20 via-purple-500/10 to-transparent text-fuchsia-200",
    },
    {
      id: "numpy",
      name: "NumPy",
      iconKey: "numpy",
      accentClass: "from-cyan-400/20 via-blue-500/10 to-transparent text-cyan-200",
    },
    {
      id: "scikit",
      name: "Scikit-learn",
      iconKey: "scikit",
      accentClass: "from-orange-400/20 via-yellow-500/10 to-transparent text-amber-200",
    },
  ],
  certifications: [
    {
      id: "cert-python",
      title: "Python for Data Science",
      issuer: "Coursera",
      date: "2024",
      credentialUrl: "https://coursera.org/",
      description:
        "Foundational certification covering Python programming applied to data analysis, visualization, and ML workflows.",
      image: "",
    },
    {
      id: "cert-ml",
      title: "Machine Learning Fundamentals",
      issuer: "Google Skillshop",
      date: "2024",
      credentialUrl: "https://skillshop.withgoogle.com/",
      description:
        "Hands-on certification covering supervised, unsupervised learning, model evaluation, and applied ML techniques.",
      image: "",
    },
    {
      id: "cert-web",
      title: "Modern Web Development",
      issuer: "freeCodeCamp",
      date: "2023",
      credentialUrl: "https://freecodecamp.org/",
      description:
        "Comprehensive certification covering React, JavaScript, responsive design, and modern frontend tooling.",
      image: "",
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

const skillIconMap: Record<SkillIconKey, IconType> = {
  python: SiPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  tailwind: SiTailwindcss,
  sql: FiDatabase,
  html: SiHtml5,
  css: SiCss,
  git: FiGitBranch,
  pandas: SiPandas,
  numpy: SiNumpy,
  scikit: SiScikitlearn,
  java: FiCode,
  node: SiNodedotjs,
  ml: FiZap,
  code: FiCode,
};

export const skillIconOptions: { key: SkillIconKey; label: string }[] = [
  { key: "python", label: "Python" },
  { key: "javascript", label: "JavaScript" },
  { key: "typescript", label: "TypeScript" },
  { key: "react", label: "React" },
  { key: "tailwind", label: "Tailwind" },
  { key: "sql", label: "SQL" },
  { key: "html", label: "HTML" },
  { key: "css", label: "CSS" },
  { key: "git", label: "Git" },
  { key: "pandas", label: "Pandas" },
  { key: "numpy", label: "NumPy" },
  { key: "scikit", label: "Scikit-learn" },
  { key: "java", label: "Java" },
  { key: "node", label: "Node.js" },
  { key: "ml", label: "Machine Learning" },
  { key: "code", label: "Generic Code" },
];

export const skillAccentPresets = [
  "from-blue-400/20 via-sky-500/10 to-transparent text-sky-200",
  "from-cyan-400/20 via-blue-500/10 to-transparent text-cyan-200",
  "from-yellow-400/20 via-amber-500/10 to-transparent text-yellow-200",
  "from-fuchsia-400/20 via-purple-500/10 to-transparent text-fuchsia-200",
  "from-orange-400/20 via-red-500/10 to-transparent text-orange-200",
  "from-emerald-400/20 via-green-500/10 to-transparent text-emerald-200",
  "from-rose-400/20 via-pink-500/10 to-transparent text-rose-200",
  "from-indigo-400/20 via-blue-500/10 to-transparent text-indigo-200",
];

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

export function resolveSkills(skills: SkillRecord[]): SkillItem[] {
  return skills.map((skill) => ({
    ...skill,
    icon: skillIconMap[skill.iconKey] ?? FiCode,
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
    profileImage: input?.profileImage || defaultPortfolioContent.profileImage,
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
    skills:
      input?.skills?.length
        ? input.skills.map((skill, index) => ({
            id: skill.id || `skill-${index + 1}`,
            name: skill.name || `Skill ${index + 1}`,
            iconKey: skill.iconKey || "code",
            accentClass: skill.accentClass || skillAccentPresets[index % skillAccentPresets.length],
          }))
        : defaultPortfolioContent.skills,
    certifications:
      input?.certifications?.length
        ? input.certifications.map((cert, index) => ({
            id: cert.id || `cert-${index + 1}`,
            title: cert.title || `Certification ${index + 1}`,
            issuer: cert.issuer || "Issuer",
            date: cert.date || "",
            credentialUrl: cert.credentialUrl || "",
            description: cert.description || "",
            image: cert.image || "",
          }))
        : defaultPortfolioContent.certifications,
  };
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
