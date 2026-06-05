import { motion } from "framer-motion";
import { FiAward, FiExternalLink } from "react-icons/fi";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CertificationRecord } from "@/types/portfolio";

interface CertificationsSectionProps {
  certifications: CertificationRecord[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  if (!certifications.length) {
    return null;
  }

  return (
    <section
      id="certifications"
      className="scroll-mt-28 px-4 sm:px-6 lg:px-8"
      aria-label="Certifications section"
    >
      <div className="mx-auto max-w-[1340px] space-y-8">
        <SectionHeading
          eyebrow="Certifications"
          title="Recognized learning milestones that strengthen my journey"
          description="A growing collection of certifications across software engineering, AI, data science, and modern web development."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
              whileHover={{ y: -6 }}
            >
              <GlassCard className="group h-full overflow-hidden p-0">
                {cert.image ? (
                  <div className="relative h-44 overflow-hidden border-b border-white/10 bg-slate-950">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      <FiAward className="text-amber-300" />
                      {cert.date || "Certified"}
                    </span>
                  </div>
                ) : (
                  <div className="relative h-44 overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))]">
                    <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:24px_24px]" />
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/30 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-violet-400/30 blur-3xl" />
                    <div className="relative flex h-full flex-col justify-between p-5">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-black/25 text-amber-300 backdrop-blur-sm">
                        <FiAward className="text-2xl" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                          {cert.date || "Certified"}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-white">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 p-5">
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
                      {cert.issuer}
                    </p>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                      {cert.title}
                    </h3>
                    {cert.description && (
                      <p className="text-sm leading-7 text-[var(--text-secondary)]">
                        {cert.description}
                      </p>
                    )}
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/25 hover:bg-blue-500/10"
                    >
                      View Credential
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
