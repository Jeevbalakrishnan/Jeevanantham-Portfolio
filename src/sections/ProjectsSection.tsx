import { motion } from "framer-motion";
import { FiArrowUpRight, FiFolder, FiGithub } from "react-icons/fi";
import { GlassCard } from "@/components/ui/GlassCard";
import type { ProjectItem } from "@/types/portfolio";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="scroll-mt-28" aria-label="Projects section">
      <GlassCard strong className="h-full px-5 py-5 sm:px-6 sm:py-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-200">
              <FiFolder className="text-xl" />
            </span>
            <div>
              <p className="text-xl font-semibold text-[var(--text-primary)]">Projects</p>
              <p className="text-sm text-[var(--text-muted)]">
                Selected builds and experiments
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="text-sm font-medium text-blue-300 transition hover:text-blue-200"
          >
            View All
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isDemoExternal = project.demo.startsWith("http");

            return (
              <motion.article
                key={project.id ?? project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:border-blue-400/25 hover:shadow-[0_20px_45px_rgba(2,6,23,0.34)]"
              >
                <div className={`relative mb-4 h-44 overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br ${project.coverClass}`}>
                  <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full blur-3xl ${project.glowClass}`} />
                  <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="absolute left-5 top-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/15 text-white shadow-[0_0_25px_rgba(255,255,255,0.06)] backdrop-blur-sm">
                    <Icon className="text-2xl" />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <div className="space-y-2">
                      <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/80">
                        Featured Build
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 2).map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/12 bg-black/15 px-3 py-1 text-xs text-white/85 backdrop-blur-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 opacity-90">
                      <span className="h-12 w-12 rounded-2xl border border-white/10 bg-white/10" />
                      <span className="mt-5 h-9 w-9 rounded-xl border border-white/10 bg-white/10" />
                      <span className="h-8 w-8 rounded-xl border border-white/10 bg-white/10" />
                      <span className="h-14 w-14 rounded-2xl border border-white/10 bg-white/10" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 px-2 pb-2">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] transition group-hover:text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-7 text-[var(--text-secondary)]">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-blue-400/15 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-secondary)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/25 hover:bg-blue-500/10 hover:text-white"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <FiGithub className="text-lg" />
                    </a>
                    <a
                      href={project.demo}
                      target={isDemoExternal ? "_blank" : undefined}
                      rel={isDemoExternal ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/25 hover:bg-blue-500/10"
                    >
                      Live Demo
                      <FiArrowUpRight />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </GlassCard>
    </section>
  );
}
