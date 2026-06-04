import { motion } from "framer-motion";
import type { BrandContent, SocialLink } from "@/types/portfolio";

interface FooterProps {
  brand: BrandContent;
  links: SocialLink[];
}

export function Footer({ brand, links }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mx-auto mt-8 w-full max-w-[1340px] px-4 pb-8 sm:px-6 lg:px-8"
    >
      <div className="glass-panel rounded-[28px] px-6 py-6 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-[var(--text-primary)]">
              {brand.fullName}
            </p>
            <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
              {brand.footerBlurb}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.id ?? link.label}
                  href={link.href}
                  aria-label={link.label}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-secondary)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
                >
                  <Icon className="text-lg" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="my-6 glow-divider" />

        <div className="flex flex-col gap-2 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.fullName}. All rights reserved.</p>
          <p>{brand.availability}</p>
        </div>
      </div>
    </motion.footer>
  );
}
