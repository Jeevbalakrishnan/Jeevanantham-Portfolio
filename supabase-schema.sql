create table if not exists public.portfolio_content (
  slug text primary key,
  content jsonb not null,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.contact_submissions (
  id text primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default timezone('utc', now()),
  delivery_status text not null default 'stored'
);

alter table public.portfolio_content enable row level security;
alter table public.contact_submissions enable row level security;

-- Demo-friendly policies for static portfolio hosting.
-- For stronger production security, replace these with authenticated admin-only policies.

drop policy if exists "Public read portfolio content" on public.portfolio_content;
create policy "Public read portfolio content"
on public.portfolio_content
for select
using (true);

drop policy if exists "Public write portfolio content" on public.portfolio_content;
create policy "Public write portfolio content"
on public.portfolio_content
for all
using (true)
with check (true);

drop policy if exists "Public read contact submissions" on public.contact_submissions;
create policy "Public read contact submissions"
on public.contact_submissions
for select
using (true);

drop policy if exists "Public write contact submissions" on public.contact_submissions;
create policy "Public write contact submissions"
on public.contact_submissions
for all
using (true)
with check (true);

insert into public.portfolio_content (slug, content)
values (
  'primary',
  jsonb_build_object(
    'brand', jsonb_build_object(
      'name', 'Jeevanantham',
      'fullName', 'Jeevanantham B',
      'heroName', 'Jeevanantham',
      'tagline', 'Aspiring Software Engineer | AI & Data Science Enthusiast | Python Developer',
      'greeting', 'Hi there! 👋',
      'description', 'I build thoughtful digital experiences and intelligent solutions with Python, AI, data science, and modern web technologies.',
      'email', 'jeevbalakrishnan19@gmail.com',
      'phone', '+91 00000 00000',
      'location', 'Tamil Nadu, India',
      'college', 'CARE College of Engineering',
      'year', '3rd Year',
      'aboutIntro', 'I’m a passionate student developer focused on transforming ideas into elegant digital products. From AI-powered systems to polished front-end interfaces, I enjoy building experiences that feel both smart and visually refined.',
      'footerBlurb', 'Crafted with React, TypeScript, Tailwind CSS, and Framer Motion to present a premium developer portfolio experience.',
      'availability', 'Open to internships, collaborations, and project opportunities.',
      'contactHeadline', 'Best way to contact me',
      'contactDescription', 'For internship opportunities, collaborations, or project discussions, email is the fastest way to reach me. You can also leave a direct message through the contact form below.',
      'heroStatus', 'Building with focus'
    ),
    'socialLinks', jsonb_build_array(
      jsonb_build_object('id', 'github', 'label', 'GitHub', 'href', 'https://github.com/', 'platform', 'github'),
      jsonb_build_object('id', 'linkedin', 'label', 'LinkedIn', 'href', 'https://www.linkedin.com/', 'platform', 'linkedin'),
      jsonb_build_object('id', 'instagram', 'label', 'Instagram', 'href', 'https://www.instagram.com/', 'platform', 'instagram'),
      jsonb_build_object('id', 'email', 'label', 'Email', 'href', 'mailto:jeevbalakrishnan19@gmail.com', 'platform', 'email')
    ),
    'projects', jsonb_build_array(
      jsonb_build_object('id', 'ai-vault', 'title', 'Personal AI Vault', 'description', 'A privacy-focused digital vault for storing personal knowledge, notes, and structured AI-assisted workflows in one secure interface.', 'stack', jsonb_build_array('Python', 'Tkinter', 'JSON'), 'github', 'https://github.com/', 'demo', '#contact', 'iconKey', 'shield', 'coverClass', 'from-sky-500/40 via-blue-500/15 to-slate-950/90 before:bg-sky-400/40', 'glowClass', 'bg-sky-400/25'),
      jsonb_build_object('id', 'attendance', 'title', 'Face Detection Attendance System', 'description', 'An automated attendance solution using face recognition to identify students, reduce manual effort, and improve tracking accuracy.', 'stack', jsonb_build_array('Python', 'OpenCV', 'MySQL'), 'github', 'https://github.com/', 'demo', '#contact', 'iconKey', 'cpu', 'coverClass', 'from-violet-500/35 via-indigo-500/15 to-slate-950/90 before:bg-violet-400/40', 'glowClass', 'bg-violet-400/25'),
      jsonb_build_object('id', 'movie-recommendation', 'title', 'Movie Recommendation System', 'description', 'A recommendation engine that suggests movies based on user preferences, similarity models, and data-driven personalization logic.', 'stack', jsonb_build_array('Python', 'Pandas', 'Scikit-learn'), 'github', 'https://github.com/', 'demo', '#contact', 'iconKey', 'film', 'coverClass', 'from-fuchsia-500/35 via-purple-500/15 to-slate-950/90 before:bg-fuchsia-400/40', 'glowClass', 'bg-fuchsia-400/25'),
      jsonb_build_object('id', 'portfolio-site', 'title', 'Portfolio Website', 'description', 'A polished developer portfolio crafted with React, TypeScript, Framer Motion, and glassmorphism UI for a premium personal brand.', 'stack', jsonb_build_array('React', 'TypeScript', 'Tailwind CSS'), 'github', 'https://github.com/', 'demo', '#home', 'iconKey', 'layout', 'coverClass', 'from-cyan-500/30 via-blue-500/15 to-slate-950/90 before:bg-cyan-400/40', 'glowClass', 'bg-cyan-400/25')
    ),
    'stats', jsonb_build_array(
      jsonb_build_object('id', 'projects', 'label', 'Projects', 'value', 5, 'suffix', '+', 'iconKey', 'folder'),
      jsonb_build_object('id', 'years', 'label', 'Learning Years', 'value', 2, 'suffix', '+', 'iconKey', 'code'),
      jsonb_build_object('id', 'certifications', 'label', 'Certifications', 'value', 3, 'suffix', '+', 'iconKey', 'award'),
      jsonb_build_object('id', 'hours', 'label', 'Coding Hours', 'value', 1000, 'suffix', '+', 'iconKey', 'clock')
    )
  )
)
on conflict (slug) do nothing;
