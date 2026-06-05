import {
  FiAward,
  FiBookOpen,
  FiClock,
  FiCode,
  FiCpu,
  FiFilm,
  FiFolder,
  FiGithub,
  FiGrid,
  FiHome,
  FiInstagram,
  FiLayers,
  FiLayout,
  FiLinkedin,
  FiMail,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUser,
  FiZap,
} from "react-icons/fi";
import {
  SiCss,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNumpy,
  SiPandas,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type {
  EducationItem,
  HighlightItem,
  NavItem,
  ProjectItem,
  SkillItem,
  SocialLink,
  StatItem,
} from "@/types/portfolio";

export const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "certifications", label: "Certifications", href: "#certifications" },
  { id: "education", label: "Education", href: "#education" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: FiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FiLinkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: FiInstagram,
  },
  {
    label: "Email",
    href: "mailto:jeevbalakrishnan19@gmail.com",
    icon: FiMail,
  },
];

export const skills: SkillItem[] = [
  {
    name: "Python",
    icon: SiPython,
    accentClass: "from-yellow-400/20 via-blue-500/15 to-transparent text-yellow-300",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    accentClass: "from-yellow-300/20 via-amber-400/10 to-transparent text-yellow-200",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    accentClass: "from-blue-400/20 via-sky-500/10 to-transparent text-sky-200",
  },
  {
    name: "React",
    icon: SiReact,
    accentClass: "from-cyan-400/20 via-blue-500/10 to-transparent text-cyan-200",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    accentClass: "from-cyan-300/20 via-sky-400/10 to-transparent text-cyan-200",
  },
  {
    name: "SQL",
    icon: SiMysql,
    accentClass: "from-orange-300/20 via-amber-500/10 to-transparent text-orange-200",
  },
  {
    name: "HTML5",
    icon: SiHtml5,
    accentClass: "from-orange-400/20 via-rose-500/10 to-transparent text-orange-200",
  },
  {
    name: "CSS3",
    icon: SiCss,
    accentClass: "from-blue-400/20 via-indigo-500/10 to-transparent text-blue-200",
  },
  {
    name: "Git",
    icon: SiGit,
    accentClass: "from-orange-400/20 via-red-500/10 to-transparent text-orange-200",
  },
  {
    name: "Pandas",
    icon: SiPandas,
    accentClass: "from-fuchsia-400/20 via-purple-500/10 to-transparent text-fuchsia-200",
  },
  {
    name: "NumPy",
    icon: SiNumpy,
    accentClass: "from-cyan-400/20 via-blue-500/10 to-transparent text-cyan-200",
  },
  {
    name: "Scikit-learn",
    icon: SiScikitlearn,
    accentClass: "from-orange-400/20 via-yellow-500/10 to-transparent text-amber-200",
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Personal AI Vault",
    description:
      "A privacy-focused digital vault for storing personal knowledge, notes, and structured AI-assisted workflows in one secure interface.",
    stack: ["Python", "Tkinter", "JSON"],
    github: "https://github.com/",
    demo: "#contact",
    icon: FiShield,
    coverClass:
      "from-sky-500/40 via-blue-500/15 to-slate-950/90 before:bg-sky-400/40",
    glowClass: "bg-sky-400/25",
  },
  {
    title: "Face Detection Attendance System",
    description:
      "An automated attendance solution using face recognition to identify students, reduce manual effort, and improve tracking accuracy.",
    stack: ["Python", "OpenCV", "MySQL"],
    github: "https://github.com/",
    demo: "#contact",
    icon: FiCpu,
    coverClass:
      "from-violet-500/35 via-indigo-500/15 to-slate-950/90 before:bg-violet-400/40",
    glowClass: "bg-violet-400/25",
  },
  {
    title: "Movie Recommendation System",
    description:
      "A recommendation engine that suggests movies based on user preferences, similarity models, and data-driven personalization logic.",
    stack: ["Python", "Pandas", "Scikit-learn"],
    github: "https://github.com/",
    demo: "#contact",
    icon: FiFilm,
    coverClass:
      "from-fuchsia-500/35 via-purple-500/15 to-slate-950/90 before:bg-fuchsia-400/40",
    glowClass: "bg-fuchsia-400/25",
  },
  {
    title: "Portfolio Website",
    description:
      "A polished developer portfolio crafted with React, TypeScript, Framer Motion, and glassmorphism UI for a premium personal brand.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/",
    demo: "#home",
    icon: FiLayout,
    coverClass:
      "from-cyan-500/30 via-blue-500/15 to-slate-950/90 before:bg-cyan-400/40",
    glowClass: "bg-cyan-400/25",
  },
];

export const stats: StatItem[] = [
  {
    label: "Projects",
    value: 5,
    suffix: "+",
    icon: FiFolder,
  },
  {
    label: "Learning Years",
    value: 2,
    suffix: "+",
    icon: FiCode,
  },
  {
    label: "Certifications",
    value: 3,
    suffix: "+",
    icon: FiAward,
  },
  {
    label: "Coding Hours",
    value: 1000,
    suffix: "+",
    icon: FiClock,
  },
];

export const education: EducationItem[] = [
  {
    title: "B.E. — Computer Science / AI & Data Science Track",
    institution: "CARE College of Engineering",
    period: "3rd Year • Current",
    description:
      "Building a strong foundation in software engineering, data analysis, machine learning concepts, and problem solving through academic learning and hands-on projects.",
    highlights: [
      "Focused on AI, data science, and modern software development",
      "Actively strengthening Python, SQL, and web development skills",
      "Exploring intelligent systems with real-world project implementation",
    ],
  },
  {
    title: "Continuous Learning Journey",
    institution: "Self-driven practice & project-based learning",
    period: "Ongoing",
    description:
      "Beyond the classroom, I spend time improving frontend development, clean UI design, and practical machine learning workflows through experimentation and consistent building.",
    highlights: [
      "Frontend projects with React, TypeScript, and Tailwind CSS",
      "Machine learning experiments using Pandas, NumPy, and Scikit-learn",
      "Version control, debugging, and iterative improvement with Git",
    ],
  },
];

export const aboutHighlights: HighlightItem[] = [
  {
    title: "AI-first curiosity",
    description: "I enjoy exploring how AI and data can solve meaningful real-world problems.",
    icon: FiZap,
  },
  {
    title: "Clean engineering mindset",
    description: "I focus on readable code, scalable structure, and intuitive user experiences.",
    icon: FiTarget,
  },
  {
    title: "Modern UI craftsmanship",
    description: "I love designing sleek interfaces with thoughtful motion, depth, and clarity.",
    icon: FiGrid,
  },
  {
    title: "Growth through building",
    description: "Every project is a chance to improve, experiment, and sharpen core skills.",
    icon: FiTrendingUp,
  },
];

export const footerLinks = socialLinks;

export const brand = {
  name: "Jeevanantham",
  fullName: "Jeevanantham B",
  tagline:
    "Aspiring Software Engineer | AI & Data Science Enthusiast | Python Developer",
  greeting: "Hi there! 👋",
  description:
    "I build thoughtful digital experiences and intelligent solutions with Python, AI, data science, and modern web technologies.",
  email: "jeevbalakrishnan19@gmail.com",
  college: "CARE College of Engineering",
  year: "3rd Year",
  logoIcon: FiHome,
  aboutIntro:
    "I’m a passionate student developer focused on transforming ideas into elegant digital products. From AI-powered systems to polished front-end interfaces, I enjoy building experiences that feel both smart and visually refined.",
};

export const aboutStats = [
  {
    title: "Primary Focus",
    value: "AI + Web Development",
    icon: FiCpu,
  },
  {
    title: "Favorite Workflow",
    value: "Design → Build → Refine",
    icon: FiLayers,
  },
  {
    title: "Current Goal",
    value: "Internship-ready portfolio",
    icon: FiBookOpen,
  },
  {
    title: "Best Contact",
    value: "Email Collaboration",
    icon: FiMail,
  },
];

export const heroQuickStats = stats.slice(0, 3);

export const sectionIcons = {
  home: FiHome,
  about: FiUser,
  skills: FiLayers,
  projects: FiFolder,
  education: FiBookOpen,
  contact: FiMail,
};
