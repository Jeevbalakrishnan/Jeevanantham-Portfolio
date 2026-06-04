import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  createNormalizedContent,
  defaultPortfolioContent,
} from "@/data/portfolioContent";
import type {
  ContactSubmission,
  DataSource,
  PortfolioContent,
} from "@/types/portfolio";

const CONTENT_STORAGE_KEY = "jeevanantham-portfolio-content";
const MESSAGE_STORAGE_KEY = "jeevanantham-contact-submissions";
const CONTENT_SLUG = "primary";

let supabaseClient: SupabaseClient | null = null;

function isBrowser() {
  return typeof window !== "undefined";
}

function getSupabaseClient() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(url, key);
  }

  return supabaseClient;
}

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function readLocalContent() {
  if (!isBrowser()) {
    return null;
  }

  return safeJsonParse<PortfolioContent>(window.localStorage.getItem(CONTENT_STORAGE_KEY));
}

function writeLocalContent(content: PortfolioContent) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
}

function readLocalMessages() {
  if (!isBrowser()) {
    return [] as ContactSubmission[];
  }

  return safeJsonParse<ContactSubmission[]>(window.localStorage.getItem(MESSAGE_STORAGE_KEY)) ?? [];
}

function writeLocalMessages(messages: ContactSubmission[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(messages));
}

function dedupeMessages(messages: ContactSubmission[]) {
  const map = new Map<string, ContactSubmission>();

  messages.forEach((message) => {
    map.set(message.id, message);
  });

  return Array.from(map.values()).sort(
    (first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  );
}

function syncContactLinks(content: PortfolioContent) {
  const normalized = createNormalizedContent(content);

  normalized.socialLinks = normalized.socialLinks.map((link) => {
    if (link.platform === "email") {
      return {
        ...link,
        href: `mailto:${normalized.brand.email}`,
      };
    }

    if (link.platform === "phone") {
      const phoneHref = normalized.brand.phone.replace(/\s+/g, "");

      return {
        ...link,
        href: `tel:${phoneHref}`,
      };
    }

    return link;
  });

  return normalized;
}

export function hasSupabaseConfig() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
}

export function hasWeb3FormsConfig() {
  return Boolean(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
}

export function getAdminPasscode() {
  return import.meta.env.VITE_ADMIN_PASSCODE || "admin123";
}

export async function loadPortfolioContent() {
  const localContent = readLocalContent();
  const client = getSupabaseClient();

  if (client) {
    const { data, error } = await client
      .from("portfolio_content")
      .select("content, updated_at")
      .eq("slug", CONTENT_SLUG)
      .maybeSingle();

    if (!error && data?.content) {
      const normalized = syncContactLinks(createNormalizedContent(data.content as PortfolioContent));
      writeLocalContent(normalized);

      return {
        content: normalized,
        source: "supabase" as DataSource,
        lastSavedAt: data.updated_at ?? null,
      };
    }
  }

  if (localContent) {
    return {
      content: syncContactLinks(createNormalizedContent(localContent)),
      source: "local" as DataSource,
      lastSavedAt: null,
    };
  }

  return {
    content: syncContactLinks(defaultPortfolioContent),
    source: "default" as DataSource,
    lastSavedAt: null,
  };
}

export async function savePortfolioContent(content: PortfolioContent) {
  const syncedContent = syncContactLinks(content);
  writeLocalContent(syncedContent);

  const now = new Date().toISOString();
  const client = getSupabaseClient();

  if (client) {
    const { error } = await client.from("portfolio_content").upsert(
      {
        slug: CONTENT_SLUG,
        content: syncedContent,
        updated_at: now,
      },
      {
        onConflict: "slug",
      },
    );

    if (!error) {
      return {
        content: syncedContent,
        source: "supabase" as DataSource,
        lastSavedAt: now,
      };
    }
  }

  return {
    content: syncedContent,
    source: "local" as DataSource,
    lastSavedAt: now,
  };
}

export async function resetPortfolioContent() {
  return savePortfolioContent(defaultPortfolioContent);
}

export async function loadContactSubmissions() {
  const localMessages = readLocalMessages();
  const client = getSupabaseClient();

  if (client) {
    const { data, error } = await client
      .from("contact_submissions")
      .select("id, name, email, subject, message, created_at, delivery_status")
      .order("created_at", { ascending: false })
      .limit(30);

    if (!error && data) {
      const remoteMessages = data.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        subject: item.subject,
        message: item.message,
        createdAt: item.created_at,
        deliveryStatus: item.delivery_status,
      })) as ContactSubmission[];

      const merged = dedupeMessages([...remoteMessages, ...localMessages]);
      writeLocalMessages(merged);
      return merged;
    }
  }

  return dedupeMessages(localMessages);
}

async function persistSubmission(submission: ContactSubmission) {
  const localMessages = dedupeMessages([submission, ...readLocalMessages()]);
  writeLocalMessages(localMessages);

  const client = getSupabaseClient();

  if (client) {
    await client.from("contact_submissions").upsert(
      {
        id: submission.id,
        name: submission.name,
        email: submission.email,
        subject: submission.subject,
        message: submission.message,
        created_at: submission.createdAt,
        delivery_status: submission.deliveryStatus,
      },
      {
        onConflict: "id",
      },
    );
  }

  return localMessages;
}

export async function submitContactMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}) {
  const submission: ContactSubmission = {
    id: isBrowser() && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`,
    name: input.name,
    email: input.email,
    subject: input.subject,
    message: input.message,
    createdAt: new Date().toISOString(),
    deliveryStatus: hasSupabaseConfig() ? "stored" : "demo",
  };

  await persistSubmission(submission);

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return {
      ok: true,
      submission,
      mode: hasSupabaseConfig() ? "stored" : "demo",
      message: hasSupabaseConfig()
        ? "Message saved to the database. Add a Web3Forms access key to enable real email delivery."
        : "Message saved in demo mode. Add Supabase and Web3Forms keys to enable a real production workflow.",
    };
  }

  const payload = new FormData();
  payload.append("access_key", accessKey);
  payload.append("subject", input.subject);
  payload.append("from_name", "Jeevanantham Portfolio");
  payload.append("replyto", input.email);
  payload.append("name", input.name);
  payload.append("email", input.email);
  payload.append("message", input.message);
  if (input.phone) {
    payload.append("phone", input.phone);
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: payload,
    });
    const result = (await response.json()) as { success?: boolean; message?: string };

    if (response.ok && result.success) {
      submission.deliveryStatus = "sent";
      await persistSubmission(submission);

      return {
        ok: true,
        submission,
        mode: "sent",
        message: "Message sent successfully. It will reach the configured inbox like a real production contact form.",
      };
    }

    submission.deliveryStatus = hasSupabaseConfig() ? "stored" : "failed";
    await persistSubmission(submission);

    return {
      ok: false,
      submission,
      mode: submission.deliveryStatus,
      message: result.message || "Email delivery failed. The submission was still saved locally or in the database.",
    };
  } catch {
    submission.deliveryStatus = hasSupabaseConfig() ? "stored" : "failed";
    await persistSubmission(submission);

    return {
      ok: false,
      submission,
      mode: submission.deliveryStatus,
      message:
        "Network error while sending the email. The message was still retained in local storage or the database inbox.",
    };
  }
}
