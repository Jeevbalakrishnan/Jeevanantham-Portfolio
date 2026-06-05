import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAward,
  FiDatabase,
  FiDownload,
  FiEdit3,
  FiExternalLink,
  FiEye,
  FiImage,
  FiInbox,
  FiKey,
  FiLayers,
  FiLock,
  FiMail,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiServer,
  FiSettings,
  FiShield,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/utils/cn";
import {
  createId,
  skillAccentPresets,
  skillIconOptions,
} from "@/data/portfolioContent";
import {
  getAdminPasscode,
  hasSupabaseConfig,
  hasWeb3FormsConfig,
} from "@/lib/integrations";
import type {
  ContactSubmission,
  DataSource,
  PortfolioContent,
  SkillIconKey,
  SocialPlatform,
} from "@/types/portfolio";

const SESSION_KEY = "jeevanantham-admin-session";

type AdminTab = "profile" | "skills" | "projects" | "certifications" | "inbox";

interface AdminPanelProps {
  content: PortfolioContent;
  source: DataSource;
  lastSavedAt: string | null;
  saving: boolean;
  submissions: ContactSubmission[];
  refreshingInbox: boolean;
  onSave: (content: PortfolioContent) => Promise<unknown>;
  onReset: () => Promise<unknown>;
  onRefreshInbox: () => Promise<unknown>;
}

const socialPlatforms: SocialPlatform[] = [
  "github",
  "linkedin",
  "instagram",
  "email",
  "website",
  "phone",
];

export function AdminPanel({
  content,
  source,
  lastSavedAt,
  saving,
  submissions,
  refreshingInbox,
  onSave,
  onReset,
  onRefreshInbox,
}: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<AdminTab>("profile");
  const [draft, setDraft] = useState<PortfolioContent>(content);
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    setDraft(content);
  }, [content]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setIsUnlocked(window.sessionStorage.getItem(SESSION_KEY) === "true");
  }, []);

  const databaseReady = hasSupabaseConfig();
  const emailReady = hasWeb3FormsConfig();

  const statusTone = useMemo(() => {
    if (source === "supabase") {
      return "text-emerald-300 border-emerald-400/20 bg-emerald-500/10";
    }

    if (source === "local") {
      return "text-amber-200 border-amber-400/20 bg-amber-500/10";
    }

    return "text-slate-300 border-white/10 bg-white/5";
  }, [source]);

  const handleUnlock = () => {
    if (passcode.trim() !== getAdminPasscode()) {
      setAuthError("Incorrect admin passcode.");
      return;
    }

    setIsUnlocked(true);
    setAuthError("");
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(SESSION_KEY);
    }
  };

  const handleSave = async () => {
    await onSave(draft);
    setSaveMessage("Changes saved successfully.");
    window.setTimeout(() => setSaveMessage(""), 2200);
  };

  const handleReset = async () => {
    if (!window.confirm("Reset all portfolio content to defaults? This cannot be undone.")) {
      return;
    }
    await onReset();
    setSaveMessage("Content reset to defaults.");
    window.setTimeout(() => setSaveMessage(""), 2200);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "portfolio-content.json";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const updateBrand = (field: keyof PortfolioContent["brand"], value: string) => {
    setDraft((current) => ({
      ...current,
      brand: {
        ...current.brand,
        [field]: value,
      },
    }));
  };

  const updateProfileImage = (image: string) => {
    setDraft((current) => ({ ...current, profileImage: image || "/images/jeevanantham-profile.png" }));
  };

  const updateSocial = (
    index: number,
    field: keyof PortfolioContent["socialLinks"][number],
    value: string,
  ) => {
    setDraft((current) => ({
      ...current,
      socialLinks: current.socialLinks.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const updateProject = (
    index: number,
    field: keyof PortfolioContent["projects"][number],
    value: string,
  ) => {
    setDraft((current) => ({
      ...current,
      projects: current.projects.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  };

  const updateProjectStack = (index: number, value: string) => {
    setDraft((current) => ({
      ...current,
      projects: current.projects.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              stack: value
                .split(",")
                .map((entry) => entry.trim())
                .filter(Boolean),
            }
          : item,
      ),
    }));
  };

  const updateStat = (index: number, key: "label" | "value" | "suffix", value: string) => {
    setDraft((current) => ({
      ...current,
      stats: current.stats.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [key]: key === "value" ? Number(value || 0) : value,
            }
          : item,
      ),
    }));
  };

  const updateSkill = (
    index: number,
    field: "name" | "iconKey",
    value: string,
  ) => {
    setDraft((current) => ({
      ...current,
      skills: current.skills.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: field === "iconKey" ? (value as SkillIconKey) : value,
            }
          : item,
      ),
    }));
  };

  const addSkill = () => {
    setDraft((current) => ({
      ...current,
      skills: [
        ...current.skills,
        {
          id: createId("skill"),
          name: "New Skill",
          iconKey: "code",
          accentClass: skillAccentPresets[current.skills.length % skillAccentPresets.length],
        },
      ],
    }));
  };

  const removeSkill = (index: number) => {
    setDraft((current) => ({
      ...current,
      skills: current.skills.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const updateCertification = (
    index: number,
    field: keyof PortfolioContent["certifications"][number],
    value: string,
  ) => {
    setDraft((current) => ({
      ...current,
      certifications: current.certifications.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addCertification = () => {
    setDraft((current) => ({
      ...current,
      certifications: [
        ...current.certifications,
        {
          id: createId("cert"),
          title: "New Certification",
          issuer: "Issuer Name",
          date: new Date().getFullYear().toString(),
          credentialUrl: "",
          description: "",
          image: "",
        },
      ],
    }));
  };

  const removeCertification = (index: number) => {
    setDraft((current) => ({
      ...current,
      certifications: current.certifications.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-[linear-gradient(135deg,rgba(59,130,246,0.26),rgba(139,92,246,0.18))] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(59,130,246,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1"
      >
        <FiSettings />
        Admin
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[70] bg-slate-950/70 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="fixed right-0 top-0 z-[80] h-screen w-full max-w-[760px] p-3 sm:p-4"
            >
              <GlassCard strong className="flex h-full flex-col overflow-hidden rounded-[28px]">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/12 text-blue-200">
                        <FiShield className="text-lg" />
                      </span>
                      <div>
                        <p className="text-lg font-semibold text-[var(--text-primary)]">
                          Portfolio Admin
                        </p>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Edit live content, manage skills, certifications, and inbox.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", statusTone)}>
                        Source: {source}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                        {databaseReady ? "Supabase connected" : "Supabase not configured"}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                        {emailReady ? "Web3Forms live" : "Email demo mode"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)] transition hover:bg-white/10"
                  >
                    <FiX />
                  </button>
                </div>

                {!isUnlocked ? (
                  <div className="flex flex-1 items-center justify-center p-5 sm:p-8">
                    <div className="w-full max-w-md space-y-5 rounded-[28px] border border-white/10 bg-white/5 p-6">
                      <div className="space-y-2 text-center">
                        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/12 text-blue-200">
                          <FiLock className="text-xl" />
                        </span>
                        <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                          Unlock Admin Access
                        </h3>
                        <p className="text-sm leading-7 text-[var(--text-secondary)]">
                          Enter the admin passcode to edit portfolio content and monitor form submissions.
                        </p>
                      </div>

                      <label className="grid gap-2 text-sm font-medium text-[var(--text-secondary)]">
                        Admin Passcode
                        <div className="relative">
                          <FiKey className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                          <input
                            type="password"
                            value={passcode}
                            onChange={(event) => setPasscode(event.target.value)}
                            onKeyDown={(event) => event.key === "Enter" && handleUnlock()}
                            className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-400/30 focus:bg-blue-500/[0.08]"
                            placeholder="Enter passcode"
                          />
                        </div>
                      </label>

                      {authError && (
                        <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                          {authError}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={handleUnlock}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(59,130,246,0.28)]"
                      >
                        <FiShield />
                        Unlock Admin
                      </button>

                      <p className="text-xs leading-6 text-[var(--text-muted)]">
                        Tip: for production, set a custom <code>VITE_ADMIN_PASSCODE</code> value and connect Supabase + Web3Forms.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: "profile", label: "Profile", icon: FiEdit3 },
                          { id: "skills", label: "Skills", icon: FiLayers },
                          { id: "projects", label: "Projects", icon: FiDatabase },
                          { id: "certifications", label: "Certs", icon: FiAward },
                          { id: "inbox", label: "Inbox", icon: FiInbox },
                        ].map((item) => {
                          const Icon = item.icon;
                          const isActive = tab === item.id;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setTab(item.id as AdminTab)}
                              className={cn(
                                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                                isActive
                                  ? "bg-blue-500/15 text-white ring-1 ring-blue-400/20"
                                  : "bg-white/5 text-[var(--text-secondary)] hover:text-white",
                              )}
                            >
                              <Icon />
                              {item.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={exportJson}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-white"
                        >
                          <FiDownload />
                          Export
                        </button>
                        <button
                          type="button"
                          onClick={handleLock}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-white"
                        >
                          <FiLock />
                          Lock
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
                      {tab === "profile" && (
                        <div className="space-y-6">
                          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                            <div className="mb-4 flex items-center gap-3">
                              <FiImage className="text-blue-200" />
                              <p className="text-base font-semibold text-[var(--text-primary)]">
                                Profile Picture
                              </p>
                            </div>
                            <ImageUpload
                              label="Hero profile image"
                              value={draft.profileImage}
                              onChange={updateProfileImage}
                              height="h-64"
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Full Name" value={draft.brand.fullName} onChange={(value) => updateBrand("fullName", value)} />
                            <Field label="Hero Name" value={draft.brand.heroName} onChange={(value) => updateBrand("heroName", value)} />
                            <Field label="Greeting" value={draft.brand.greeting} onChange={(value) => updateBrand("greeting", value)} />
                            <Field label="Email" value={draft.brand.email} onChange={(value) => updateBrand("email", value)} />
                            <Field label="Phone" value={draft.brand.phone} onChange={(value) => updateBrand("phone", value)} />
                            <Field label="Location" value={draft.brand.location} onChange={(value) => updateBrand("location", value)} />
                            <Field label="College" value={draft.brand.college} onChange={(value) => updateBrand("college", value)} />
                            <Field label="Year" value={draft.brand.year} onChange={(value) => updateBrand("year", value)} />
                          </div>

                          <AreaField
                            label="Tagline"
                            rows={3}
                            value={draft.brand.tagline}
                            onChange={(value) => updateBrand("tagline", value)}
                          />
                          <AreaField
                            label="Hero Description"
                            rows={4}
                            value={draft.brand.description}
                            onChange={(value) => updateBrand("description", value)}
                          />
                          <AreaField
                            label="About Intro"
                            rows={5}
                            value={draft.brand.aboutIntro}
                            onChange={(value) => updateBrand("aboutIntro", value)}
                          />
                          <AreaField
                            label="Contact Description"
                            rows={4}
                            value={draft.brand.contactDescription}
                            onChange={(value) => updateBrand("contactDescription", value)}
                          />

                          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                            <div className="mb-4 flex items-center gap-3">
                              <FiExternalLink className="text-blue-200" />
                              <p className="text-base font-semibold text-[var(--text-primary)]">
                                Social Links
                              </p>
                            </div>
                            <div className="space-y-4">
                              {draft.socialLinks.map((link, index) => (
                                <div key={link.id} className="grid gap-3 rounded-[22px] border border-white/10 bg-black/10 p-4 sm:grid-cols-3">
                                  <Field label="Label" value={link.label} onChange={(value) => updateSocial(index, "label", value)} />
                                  <div className="grid gap-2 text-sm font-medium text-[var(--text-secondary)]">
                                    Platform
                                    <select
                                      value={link.platform}
                                      onChange={(event) => updateSocial(index, "platform", event.target.value)}
                                      className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-[var(--text-primary)] outline-none"
                                    >
                                      {socialPlatforms.map((platform) => (
                                        <option key={platform} value={platform} className="bg-slate-900">
                                          {platform}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <Field label="URL / Href" value={link.href} onChange={(value) => updateSocial(index, "href", value)} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {tab === "skills" && (
                        <div className="space-y-5">
                          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-white/10 bg-white/5 p-5">
                            <div>
                              <p className="text-base font-semibold text-[var(--text-primary)]">Skills Editor</p>
                              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Add, edit, or remove skills shown on the portfolio.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={addSkill}
                              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.28)]"
                            >
                              <FiPlus />
                              Add Skill
                            </button>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            {draft.skills.map((skill, index) => (
                              <div key={skill.id} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                                <div className="space-y-3">
                                  <Field label="Skill Name" value={skill.name} onChange={(value) => updateSkill(index, "name", value)} />
                                  <div className="grid gap-2 text-sm font-medium text-[var(--text-secondary)]">
                                    Icon
                                    <select
                                      value={skill.iconKey}
                                      onChange={(event) => updateSkill(index, "iconKey", event.target.value)}
                                      className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-[var(--text-primary)] outline-none"
                                    >
                                      {skillIconOptions.map((option) => (
                                        <option key={option.key} value={option.key} className="bg-slate-900">
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeSkill(index)}
                                    className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 transition hover:bg-red-500/15"
                                  >
                                    <FiTrash2 />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {!draft.skills.length && (
                            <div className="rounded-[24px] border border-dashed border-white/10 bg-white/5 p-6 text-center text-sm text-[var(--text-secondary)]">
                              No skills yet. Click <strong>Add Skill</strong> to create one.
                            </div>
                          )}
                        </div>
                      )}

                      {tab === "projects" && (
                        <div className="space-y-6">
                          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                            <div className="mb-5 flex items-center gap-3">
                              <FiDatabase className="text-blue-200" />
                              <p className="text-base font-semibold text-[var(--text-primary)]">
                                Projects
                              </p>
                            </div>
                            <div className="space-y-5">
                              {draft.projects.map((project, index) => (
                                <div key={project.id} className="space-y-4 rounded-[22px] border border-white/10 bg-black/10 p-4">
                                  <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Title" value={project.title} onChange={(value) => updateProject(index, "title", value)} />
                                    <Field label="GitHub URL" value={project.github} onChange={(value) => updateProject(index, "github", value)} />
                                  </div>
                                  <Field label="Demo URL" value={project.demo} onChange={(value) => updateProject(index, "demo", value)} />
                                  <Field
                                    label="Tech Stack (comma separated)"
                                    value={project.stack.join(", ")}
                                    onChange={(value) => updateProjectStack(index, value)}
                                  />
                                  <AreaField
                                    label="Description"
                                    rows={4}
                                    value={project.description}
                                    onChange={(value) => updateProject(index, "description", value)}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                            <div className="mb-5 flex items-center gap-3">
                              <FiServer className="text-blue-200" />
                              <p className="text-base font-semibold text-[var(--text-primary)]">
                                Statistics
                              </p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              {draft.stats.map((stat, index) => (
                                <div key={stat.id} className="space-y-3 rounded-[22px] border border-white/10 bg-black/10 p-4">
                                  <Field label="Label" value={stat.label} onChange={(value) => updateStat(index, "label", value)} />
                                  <Field label="Value" type="number" value={String(stat.value)} onChange={(value) => updateStat(index, "value", value)} />
                                  <Field label="Suffix" value={stat.suffix} onChange={(value) => updateStat(index, "suffix", value)} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {tab === "certifications" && (
                        <div className="space-y-5">
                          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-white/10 bg-white/5 p-5">
                            <div>
                              <p className="text-base font-semibold text-[var(--text-primary)]">Certifications</p>
                              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Add or edit certifications displayed in the portfolio.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={addCertification}
                              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.28)]"
                            >
                              <FiPlus />
                              Add Certification
                            </button>
                          </div>

                          <div className="space-y-5">
                            {draft.certifications.map((cert, index) => (
                              <div key={cert.id} className="space-y-4 rounded-[24px] border border-white/10 bg-white/5 p-5">
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <Field label="Title" value={cert.title} onChange={(value) => updateCertification(index, "title", value)} />
                                  <Field label="Issuer" value={cert.issuer} onChange={(value) => updateCertification(index, "issuer", value)} />
                                  <Field label="Date / Year" value={cert.date} onChange={(value) => updateCertification(index, "date", value)} />
                                  <Field label="Credential URL" value={cert.credentialUrl} onChange={(value) => updateCertification(index, "credentialUrl", value)} />
                                </div>
                                <AreaField
                                  label="Description"
                                  rows={3}
                                  value={cert.description}
                                  onChange={(value) => updateCertification(index, "description", value)}
                                />
                                <ImageUpload
                                  label="Certificate Image (optional)"
                                  value={cert.image}
                                  onChange={(value) => updateCertification(index, "image", value)}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeCertification(index)}
                                  className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 transition hover:bg-red-500/15"
                                >
                                  <FiTrash2 />
                                  Remove Certification
                                </button>
                              </div>
                            ))}
                          </div>

                          {!draft.certifications.length && (
                            <div className="rounded-[24px] border border-dashed border-white/10 bg-white/5 p-6 text-center text-sm text-[var(--text-secondary)]">
                              No certifications yet. Click <strong>Add Certification</strong> to create one.
                            </div>
                          )}
                        </div>
                      )}

                      {tab === "inbox" && (
                        <div className="space-y-5">
                          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-white/10 bg-white/5 p-5">
                            <div>
                              <p className="text-base font-semibold text-[var(--text-primary)]">Contact Inbox</p>
                              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Review submitted messages from demo storage or your connected database.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => void onRefreshInbox()}
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-white"
                            >
                              <FiRefreshCw className={cn(refreshingInbox && "animate-spin")} />
                              Refresh Inbox
                            </button>
                          </div>

                          <div className="space-y-4">
                            {submissions.length ? (
                              submissions.map((submission) => (
                                <div key={submission.id} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="space-y-2">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <p className="text-lg font-semibold text-[var(--text-primary)]">
                                          {submission.subject}
                                        </p>
                                        <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
                                          {submission.deliveryStatus}
                                        </span>
                                      </div>
                                      <p className="text-sm text-[var(--text-secondary)]">
                                        From {submission.name} • {submission.email}
                                      </p>
                                      <p className="text-xs text-[var(--text-muted)]">
                                        {new Date(submission.createdAt).toLocaleString()}
                                      </p>
                                    </div>
                                    <a
                                      href={`mailto:${submission.email}?subject=Re: ${encodeURIComponent(submission.subject)}`}
                                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-white"
                                    >
                                      <FiMail />
                                      Reply
                                    </a>
                                  </div>
                                  <div className="mt-4 rounded-[20px] border border-white/10 bg-black/10 p-4 text-sm leading-7 text-[var(--text-secondary)]">
                                    {submission.message}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="rounded-[24px] border border-dashed border-white/10 bg-white/5 p-8 text-center">
                                <FiEye className="mx-auto text-2xl text-[var(--text-muted)]" />
                                <p className="mt-4 text-base font-medium text-[var(--text-primary)]">
                                  No submissions yet
                                </p>
                                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                                  Once visitors submit the contact form, their messages will appear here.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4 sm:px-6">
                      <div className="space-y-1 text-sm text-[var(--text-muted)]">
                        <p>
                          Last saved: {lastSavedAt ? new Date(lastSavedAt).toLocaleString() : "Not yet saved"}
                        </p>
                        {saveMessage && <p className="text-emerald-300">{saveMessage}</p>}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => void handleReset()}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-white"
                        >
                          <FiRefreshCw />
                          Reset Defaults
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleSave()}
                          disabled={saving}
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(59,130,246,0.28)] disabled:opacity-60"
                        >
                          <FiSave />
                          {saving ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </GlassCard>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

function Field({ label, value, onChange, type = "text" }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--text-secondary)]">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-400/30 focus:bg-blue-500/[0.08]"
      />
    </label>
  );
}

interface AreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

function AreaField({ label, value, onChange, rows = 4 }: AreaFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--text-secondary)]">
      {label}
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-400/30 focus:bg-blue-500/[0.08]"
      />
    </label>
  );
}
