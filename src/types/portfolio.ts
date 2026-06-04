import type { IconType } from "react-icons";

export type ThemeMode = "dark" | "light";

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "instagram"
  | "email"
  | "website"
  | "phone";

export type ProjectIconKey = "shield" | "cpu" | "film" | "layout";

export type StatIconKey = "folder" | "code" | "award" | "clock";

export type DataSource = "default" | "local" | "supabase";

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface BrandContent {
  name: string;
  fullName: string;
  heroName: string;
  tagline: string;
  greeting: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  college: string;
  year: string;
  aboutIntro: string;
  footerBlurb: string;
  availability: string;
  contactHeadline: string;
  contactDescription: string;
  heroStatus: string;
}

export interface SocialLinkRecord {
  id: string;
  label: string;
  href: string;
  platform: SocialPlatform;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
  id?: string;
  platform?: SocialPlatform;
}

export interface SkillItem {
  name: string;
  icon: IconType;
  accentClass: string;
}

export interface ProjectRecord {
  id: string;
  title: string;
  description: string;
  stack: string[];
  github: string;
  demo: string;
  iconKey: ProjectIconKey;
  coverClass: string;
  glowClass: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  stack: string[];
  github: string;
  demo: string;
  icon: IconType;
  coverClass: string;
  glowClass: string;
  id?: string;
  iconKey?: ProjectIconKey;
}

export interface StatRecord {
  id: string;
  label: string;
  value: number;
  suffix: string;
  iconKey: StatIconKey;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: IconType;
  id?: string;
  iconKey?: StatIconKey;
}

export interface EducationItem {
  title: string;
  institution: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface HighlightItem {
  title: string;
  description: string;
  icon: IconType;
}

export interface PortfolioContent {
  brand: BrandContent;
  socialLinks: SocialLinkRecord[];
  projects: ProjectRecord[];
  stats: StatRecord[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  deliveryStatus: "demo" | "stored" | "sent" | "failed";
}

export interface PortfolioState {
  content: PortfolioContent;
  source: DataSource;
  loading: boolean;
  lastSavedAt: string | null;
}
