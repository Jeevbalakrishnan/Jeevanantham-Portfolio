import { motion } from "framer-motion";
import { FiLayers } from "react-icons/fi";
import { GlassCard } from "@/components/ui/GlassCard";
import type { SkillItem } from "@/types/portfolio";

interface SkillsSectionProps {
  skills: SkillItem[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="scroll-mt-28" aria-label="Skills section">
      <GlassCard strong className="h-full px-5 py-5 sm:px-6 sm:py-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-200">
              <FiLayers className="text-xl" />
            </span>
            <div>
              <p className="text-xl font-semibold text-[var(--text-primary)]">Skills</p>
              <p className="text-sm text-[var(--text-muted)]">
                Tools I enjoy building with
              </p>
            </div>
          </div>
          <a
            href="#about"
            className="text-sm font-medium text-blue-300 transition hover:text-blue-200"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.id ?? skill.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:border-blue-400/25 hover:shadow-[0_18px_36px_rgba(15,23,42,0.32)]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.accentClass} opacity-90`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_45%)] opacity-40" />
                <div className="relative z-10 flex h-full flex-col justify-between gap-5">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/10 text-3xl text-current backdrop-blur-sm transition duration-300 group-hover:scale-110">
                    <Icon />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                      {skill.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </section>
  );
}
