import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutHighlights, aboutStats } from "@/data/portfolio";
import type { BrandContent } from "@/types/portfolio";

interface AboutSectionProps {
  brand: BrandContent;
}

export function AboutSection({ brand }: AboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-28 px-4 sm:px-6 lg:px-8" aria-label="About section">
      <div className="mx-auto max-w-[1340px] space-y-8">
        <SectionHeading
          eyebrow="About Me"
          title="Building intelligent products with code, curiosity, and design clarity"
          description="I combine a strong interest in software engineering with growing hands-on experience in AI, data science, and modern frontend development. My goal is to create work that is both technically solid and visually refined."
        />

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <GlassCard strong className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="space-y-6">
              <p className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                {brand.aboutIntro}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {aboutHighlights.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                      className="rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-200">
                        <Icon className="text-lg" />
                      </span>
                      <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </GlassCard>

          <GlassCard className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  Quick Snapshot
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                  What defines my current journey
                </h3>
              </div>

              <div className="grid gap-4">
                {aboutStats.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                      className="flex items-start gap-4 rounded-[22px] border border-white/10 bg-white/5 p-4"
                    >
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-200">
                        <Icon className="text-lg" />
                      </span>
                      <div>
                        <p className="text-sm text-[var(--text-muted)]">{item.title}</p>
                        <p className="mt-1 text-base font-semibold text-[var(--text-primary)]">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
