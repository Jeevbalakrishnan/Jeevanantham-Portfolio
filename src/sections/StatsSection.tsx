import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GlassCard } from "@/components/ui/GlassCard";
import type { StatItem } from "@/types/portfolio";

interface StatsSectionProps {
  stats: StatItem[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section id="stats" className="scroll-mt-28 px-4 sm:px-6 lg:px-8" aria-label="Statistics section">
      <div className="mx-auto max-w-[1340px]">
        <GlassCard className="overflow-hidden rounded-[28px] px-4 py-3 sm:px-6 sm:py-4">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
            {stats.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === stats.length - 1;

              return (
                <motion.div
                  key={item.id ?? item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                  className={`flex items-center gap-4 rounded-[22px] px-4 py-4 sm:px-5 xl:rounded-none xl:px-8 ${!isLast ? "xl:border-r xl:border-white/10" : ""}`}
                >
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-200 shadow-[0_0_28px_rgba(59,130,246,0.08)]">
                    <Icon className="text-xl" />
                  </span>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">{item.label}</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                      <AnimatedCounter value={item.value} suffix={item.suffix} />
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
