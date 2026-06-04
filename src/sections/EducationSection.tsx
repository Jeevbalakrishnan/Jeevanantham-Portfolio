import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/portfolio";

const coursework = [
  "Data Structures",
  "Python Programming",
  "SQL & Databases",
  "Machine Learning Basics",
  "Frontend Development",
  "Problem Solving",
];

export function EducationSection() {
  return (
    <section
      id="education"
      className="scroll-mt-28 px-4 sm:px-6 lg:px-8"
      aria-label="Education section"
    >
      <div className="mx-auto max-w-[1340px] space-y-8">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation with a strong project-driven learning mindset"
          description="My current journey blends classroom learning with hands-on experimentation across software engineering, AI, data science, and modern UI development."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
          <div className="space-y-5">
            {education.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              >
                <GlassCard strong className="relative overflow-hidden px-6 py-6 sm:px-8 sm:py-8">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 via-indigo-400 to-violet-400" />
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-[var(--text-muted)]">
                          {item.period}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-base font-medium text-blue-200">
                          {item.institution}
                        </p>
                      </div>
                      <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200">
                        Current Path
                      </span>
                    </div>

                    <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                      {item.description}
                    </p>

                    <ul className="grid gap-3">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7 text-[var(--text-secondary)]"
                        >
                          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 shadow-[0_0_18px_rgba(96,165,250,0.42)]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <GlassCard className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  Coursework Focus
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                  Subjects and areas I keep sharpening
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {coursework.map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-secondary)]"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.12),rgba(139,92,246,0.08))] p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  Next Milestone
                </p>
                <p className="mt-3 text-lg font-semibold text-[var(--text-primary)]">
                  Turning academic growth into internship-ready execution
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  I&apos;m focused on building stronger real-world projects, improving problem solving, and presenting my work through professional-quality interfaces.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
