import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultPortfolioContent } from "@/data/portfolioContent";
import {
  loadContactSubmissions,
  loadPortfolioContent,
  resetPortfolioContent,
  savePortfolioContent,
} from "@/lib/integrations";
import type { ContactSubmission, PortfolioContent, PortfolioState } from "@/types/portfolio";

export function usePortfolioContent() {
  const [state, setState] = useState<PortfolioState>({
    content: defaultPortfolioContent,
    source: "default",
    loading: true,
    lastSavedAt: null,
  });
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [saving, setSaving] = useState(false);
  const [refreshingInbox, setRefreshingInbox] = useState(false);

  const refreshContent = useCallback(async () => {
    setState((current) => ({ ...current, loading: true }));

    const result = await loadPortfolioContent();
    setState({
      content: result.content,
      source: result.source,
      loading: false,
      lastSavedAt: result.lastSavedAt,
    });
  }, []);

  const refreshInbox = useCallback(async () => {
    setRefreshingInbox(true);
    const nextSubmissions = await loadContactSubmissions();
    setSubmissions(nextSubmissions);
    setRefreshingInbox(false);
  }, []);

  useEffect(() => {
    void refreshContent();
    void refreshInbox();
  }, [refreshContent, refreshInbox]);

  const save = useCallback(async (content: PortfolioContent) => {
    setSaving(true);
    const result = await savePortfolioContent(content);
    setState({
      content: result.content,
      source: result.source,
      loading: false,
      lastSavedAt: result.lastSavedAt,
    });
    setSaving(false);
    return result;
  }, []);

  const reset = useCallback(async () => {
    setSaving(true);
    const result = await resetPortfolioContent();
    setState({
      content: result.content,
      source: result.source,
      loading: false,
      lastSavedAt: result.lastSavedAt,
    });
    setSaving(false);
    return result;
  }, []);

  const api = useMemo(
    () => ({
      ...state,
      submissions,
      saving,
      refreshingInbox,
      save,
      reset,
      refreshContent,
      refreshInbox,
      setContent: (content: PortfolioContent) =>
        setState((current) => ({
          ...current,
          content,
        })),
    }),
    [refreshContent, refreshInbox, reset, save, saving, refreshingInbox, state, submissions],
  );

  return api;
}
