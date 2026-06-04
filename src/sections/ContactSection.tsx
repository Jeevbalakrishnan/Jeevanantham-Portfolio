import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { hasSupabaseConfig, hasWeb3FormsConfig, submitContactMessage } from "@/lib/integrations";
import type { BrandContent, SocialLink } from "@/types/portfolio";

const initialState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

interface ContactSectionProps {
  brand: BrandContent;
  socialLinks: SocialLink[];
  onSubmitted?: () => Promise<unknown> | void;
}

export function ContactSection({ brand, socialLinks, onSubmitted }: ContactSectionProps) {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const result = await submitContactMessage(formData);

    if (result.ok) {
      setFeedback({ type: "success", message: result.message });
      setFormData(initialState);
      await onSubmitted?.();
    } else {
      setFeedback({ type: "error", message: result.message });
      await onSubmitted?.();
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="scroll-mt-28 px-4 sm:px-6 lg:px-8" aria-label="Contact section">
      <div className="mx-auto max-w-[1340px] space-y-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s connect and build something meaningful"
          description="I’m open to internships, collaborations, project discussions, and opportunities where I can contribute, learn, and grow as a developer."
        />

        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <GlassCard strong className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  Reach Out
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                  {brand.contactHeadline}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                  {brand.contactDescription}
                </p>
              </div>

              <div className="grid gap-4">
                <a
                  href={`mailto:${brand.email}`}
                  className="group flex items-center justify-between gap-4 rounded-[24px] border border-blue-400/18 bg-gradient-to-r from-blue-500/12 to-violet-500/10 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/12 text-blue-200">
                      <FiMail className="text-xl" />
                    </span>
                    <div>
                      <p className="text-sm text-[var(--text-muted)]">Email</p>
                      <p className="break-all text-base font-semibold text-[var(--text-primary)]">
                        {brand.email}
                      </p>
                    </div>
                  </div>
                  <FiArrowUpRight className="text-xl text-blue-200 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoCard icon={FiPhone} label="Phone" value={brand.phone} href={`tel:${brand.phone.replace(/\s+/g, "")}`} />
                  <InfoCard icon={FiMapPin} label="Location" value={brand.location} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-[var(--text-muted)]">College</p>
                    <p className="mt-2 text-base font-semibold text-[var(--text-primary)]">
                      {brand.college}
                    </p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-[var(--text-muted)]">Academic Year</p>
                    <p className="mt-2 text-base font-semibold text-[var(--text-primary)]">
                      {brand.year}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                    {hasWeb3FormsConfig() ? "Live email delivery enabled" : "Email delivery awaiting Web3Forms key"}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                    {hasSupabaseConfig() ? "Database inbox enabled" : "Database not configured"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  When configured, form submissions are stored and can be delivered to your inbox like a real production portfolio workflow.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  Social Links
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    const external = link.href.startsWith("http");

                    return (
                      <a
                        key={link.id ?? link.label}
                        href={link.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/25 hover:bg-blue-500/10 hover:text-white"
                      >
                        <Icon />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="px-6 py-6 sm:px-8 sm:py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-[var(--text-secondary)]">
                  Name
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, name: event.target.value }))
                    }
                    placeholder="Your name"
                    className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-400/30 focus:bg-blue-500/[0.08]"
                    required
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-[var(--text-secondary)]">
                  Email
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, email: event.target.value }))
                    }
                    placeholder="you@example.com"
                    className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-400/30 focus:bg-blue-500/[0.08]"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-[var(--text-secondary)]">
                  Phone
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, phone: event.target.value }))
                    }
                    placeholder="Optional phone number"
                    className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-400/30 focus:bg-blue-500/[0.08]"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-[var(--text-secondary)]">
                  Subject
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, subject: event.target.value }))
                    }
                    placeholder="What would you like to discuss?"
                    className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-400/30 focus:bg-blue-500/[0.08]"
                    required
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium text-[var(--text-secondary)]">
                Message
                <textarea
                  value={formData.message}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, message: event.target.value }))
                  }
                  placeholder="Tell me about the opportunity, project, or idea."
                  className="min-h-[180px] rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-400/30 focus:bg-blue-500/[0.08]"
                  required
                />
              </label>

              {feedback && (
                <div
                  className={`rounded-[22px] border px-4 py-4 text-sm leading-7 ${
                    feedback.type === "success"
                      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                      : "border-red-400/20 bg-red-500/10 text-red-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {feedback.type === "success" && <FiCheckCircle className="mt-1 shrink-0" />}
                    <span>{feedback.message}</span>
                  </div>
                </div>
              )}

              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(59,130,246,0.28)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FiSend />
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

interface InfoCardProps {
  icon: typeof FiPhone;
  label: string;
  value: string;
  href?: string;
}

function InfoCard({ icon: Icon, label, value, href }: InfoCardProps) {
  const inner = (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-blue-400/20 hover:bg-blue-500/[0.06]">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/12 text-blue-200">
        <Icon className="text-lg" />
      </span>
      <p className="mt-4 text-sm text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 text-base font-semibold text-[var(--text-primary)] break-words">
        {value}
      </p>
    </div>
  );

  if (href) {
    return <a href={href}>{inner}</a>;
  }

  return inner;
}
