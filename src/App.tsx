import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import {
  getHeroQuickStats,
  resolveProjects,
  resolveSocialLinks,
  resolveStats,
} from "@/data/portfolioContent";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import { useTheme } from "@/hooks/useTheme";
import { AboutSection } from "@/sections/AboutSection";
import { ContactSection } from "@/sections/ContactSection";
import { EducationSection } from "@/sections/EducationSection";
import { HeroSection } from "@/sections/HeroSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { StatsSection } from "@/sections/StatsSection";
import { downloadResume } from "@/utils/downloadResume";

const observedSections = ["home", "about", "skills", "projects", "education", "contact"];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    content,
    source,
    loading,
    lastSavedAt,
    submissions,
    saving,
    refreshingInbox,
    save,
    reset,
    refreshInbox,
  } = usePortfolioContent();
  const [activeSection, setActiveSection] = useState("home");

  const socialLinks = useMemo(() => resolveSocialLinks(content.socialLinks), [content.socialLinks]);
  const projects = useMemo(() => resolveProjects(content.projects), [content.projects]);
  const stats = useMemo(() => resolveStats(content.stats), [content.stats]);
  const heroQuickStats = useMemo(() => getHeroQuickStats(content.stats), [content.stats]);

  useEffect(() => {
    const sectionElements = observedSections
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sectionElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-28% 0px -45% 0px",
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip text-[var(--text-primary)]">
      <BackgroundEffects />

      <Navbar
        brand={content.brand}
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
        onDownloadResume={downloadResume}
      />

      <main className="relative z-10 mx-auto flex w-full flex-col gap-8 pb-8 pt-28 sm:gap-10 sm:pt-32">
        <HeroSection
          brand={content.brand}
          socialLinks={socialLinks}
          quickStats={heroQuickStats}
          onDownloadResume={downloadResume}
        />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="px-4 sm:px-6 lg:px-8"
          aria-label="Skills and projects overview"
        >
          <div className="mx-auto grid max-w-[1340px] gap-6 xl:grid-cols-12">
            <div className="xl:col-span-5">
              <SkillsSection />
            </div>
            <div className="xl:col-span-7">
              <ProjectsSection projects={projects} />
            </div>
          </div>
        </motion.section>

        <StatsSection stats={stats} />
        <AboutSection brand={content.brand} />
        <EducationSection />
        <ContactSection
          brand={content.brand}
          socialLinks={socialLinks}
          onSubmitted={refreshInbox}
        />
      </main>

      <Footer brand={content.brand} links={socialLinks} />

      {!loading && (
        <AdminPanel
          content={content}
          source={source}
          lastSavedAt={lastSavedAt}
          saving={saving}
          submissions={submissions}
          refreshingInbox={refreshingInbox}
          onSave={save}
          onReset={reset}
          onRefreshInbox={refreshInbox}
        />
      )}
    </div>
  );
}
