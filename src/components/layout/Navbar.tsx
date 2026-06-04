import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCode,
  FiDownload,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
} from "react-icons/fi";
import { navItems } from "@/data/portfolio";
import type { BrandContent, ThemeMode } from "@/types/portfolio";
import { cn } from "@/utils/cn";

interface NavbarProps {
  brand: BrandContent;
  activeSection: string;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onDownloadResume: () => void;
}

export function Navbar({
  brand,
  activeSection,
  theme,
  onToggleTheme,
  onDownloadResume,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);

    return () => {
      window.removeEventListener("resize", closeOnResize);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1340px]">
        <div className="glass-panel-strong rounded-[24px] px-4 py-3 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between gap-4">
            <a
              href="#home"
              className="group inline-flex items-center gap-3 rounded-full text-[var(--text-primary)]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/25 to-violet-500/15 text-blue-200 shadow-[0_0_30px_rgba(59,130,246,0.18)] transition-transform duration-300 group-hover:scale-105">
                <FiCode className="text-lg" />
              </span>
              <div>
                <p className="text-sm font-medium text-[var(--text-secondary)]">Portfolio</p>
                <p className="text-base font-semibold tracking-wide sm:text-lg">
                  {brand.fullName}
                </p>
              </div>
            </a>

            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition duration-300",
                      isActive
                        ? "text-white"
                        : "text-[var(--text-secondary)] hover:text-white",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-pill"
                        className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-blue-500/10"
              >
                {theme === "dark" ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
              </button>
              <button
                type="button"
                onClick={onDownloadResume}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(59,130,246,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(99,102,241,0.32)]"
              >
                <FiDownload />
                Download Resume
              </button>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)] transition hover:border-blue-400/30 hover:bg-blue-500/10"
              >
                {theme === "dark" ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
              </button>
              <button
                type="button"
                aria-label="Toggle navigation menu"
                onClick={() => setIsOpen((current) => !current)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)] transition hover:border-blue-400/30 hover:bg-blue-500/10"
              >
                {isOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="mt-4 space-y-3 border-t border-white/10 pt-4 lg:hidden"
              >
                <nav className="grid gap-2">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "rounded-2xl px-4 py-3 text-sm font-medium transition",
                          isActive
                            ? "bg-white/8 text-white ring-1 ring-white/10"
                            : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-white",
                        )}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </nav>
                <button
                  type="button"
                  onClick={() => {
                    onDownloadResume();
                    setIsOpen(false);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(59,130,246,0.28)]"
                >
                  <FiDownload />
                  Download Resume
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
