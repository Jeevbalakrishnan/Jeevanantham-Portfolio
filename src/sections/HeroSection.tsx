import { motion } from "framer-motion";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import { GlassCard } from "@/components/ui/GlassCard";
import type { BrandContent, SocialLink, StatItem } from "@/types/portfolio";

interface HeroSectionProps {
  brand: BrandContent;
  socialLinks: SocialLink[];
  quickStats: StatItem[];
  onDownloadResume: () => void;
}

export function HeroSection({
  brand,
  socialLinks,
  quickStats,
  onDownloadResume,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="scroll-mt-28 px-4 sm:px-6 lg:px-8"
      aria-label="Hero section"
    >
      <div className="mx-auto max-w-[1340px]">
        <GlassCard strong className="overflow-hidden px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="space-y-5"
              >
                <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200 shadow-[0_0_25px_rgba(59,130,246,0.12)]">
                  {brand.greeting}
                </span>

                <div className="space-y-4">
                  <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-7xl">
                    I&apos;m <span className="gradient-text">{brand.heroName}</span>
                  </h1>
                  <p className="max-w-3xl text-lg font-medium text-[var(--text-secondary)] sm:text-xl">
                    {brand.tagline}
                  </p>
                  <p className="max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                    {brand.description}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <button
                  type="button"
                  onClick={onDownloadResume}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(59,130,246,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_54px_rgba(99,102,241,0.34)]"
                >
                  <FiDownload />
                  Download Resume
                </button>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-6 py-4 text-sm font-semibold text-[var(--text-primary)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-500/10"
                >
                  <FiMail />
                  Contact Me
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
                className="space-y-4"
              >
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  Connect with me
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    const external = link.href.startsWith("http");

                    return (
                      <a
                        key={link.id ?? link.label}
                        href={link.href}
                        aria-label={link.label}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-secondary)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
                      >
                        <Icon className="text-lg" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              className="relative mx-auto flex w-full max-w-[520px] items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[440px]">
                <div className="absolute inset-x-8 top-10 h-[360px] rounded-full bg-blue-500/18 blur-[90px] sm:h-[420px]" />
                <div className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30 shadow-[0_0_80px_rgba(59,130,246,0.45)]" />
                <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/25" />

                <div className="neon-ring relative mx-auto aspect-square w-full max-w-[420px] animate-float-slow rounded-full p-4">
                  <div className="absolute inset-3 rounded-full border border-blue-400/20 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm" />
                  <div className="relative z-10 overflow-hidden rounded-full border border-white/12 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_38%)] shadow-[0_24px_60px_rgba(2,6,23,0.45)]">
                    <img
                      src="/images/jeevanantham-profile.png"
                      alt={brand.fullName}
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                </div>

                <GlassCard className="absolute bottom-0 left-1/2 z-20 w-[92%] -translate-x-1/2 px-4 py-4 sm:px-5">
                  <div className="grid grid-cols-3 divide-x divide-white/10">
                    {quickStats.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div key={item.id ?? item.label} className="flex items-center justify-center gap-3 px-2 py-2 text-center">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-blue-200">
                            <Icon className="text-lg" />
                          </span>
                          <div className="text-left">
                            <p className="text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">
                              {item.value}
                              {item.suffix}
                            </p>
                            <p className="text-xs text-[var(--text-muted)] sm:text-sm">
                              {item.label}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>

                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-0 top-8 hidden rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl xl:block"
                >
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    {brand.heroStatus}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
                    Python • AI • Frontend <FiArrowRight className="text-blue-300" />
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
