// ============================================================
// Data Engineering — client-side learning progress utilities
// All state is namespaced under `de_*` in localStorage, versioned,
// and fails safe. Designed so a backend adapter can replace the
// storage layer later without changing call sites.
// ============================================================

import type { PremiumTopicData } from '../../../core/types/types';

const MASTERY_KEY = 'de_topic_mastery_v1'; // { [topicId]: 0..100 }
const REVIEW_KEY = 'de_review_queue_v1';    // { [topicId]: dueISODate }
const SELFCHECK_KEY = 'de_selfcheck_v1';    // { [topicId]: { [qKey]: 'got' | 'review' } }
const LAST_TOPIC_KEY = 'de_last_topic_v1';  // topicId
const DIAGNOSTIC_KEY = 'de_diagnostic_v1';  // DiagnosticResult

type Dict<T> = Record<string, T>;

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full / unavailable — non-fatal */
  }
};

// ---------- Reading time ----------

/** Rough estimate of words across the prose-heavy fields of a topic. */
export const estimateReadingMinutes = (data: PremiumTopicData | null): number => {
  if (!data) return 3;
  const text = JSON.stringify(data);
  const words = (text.match(/[A-Za-z]+/g) || []).length;
  // Technical reading is slower than prose; ~150 effective wpm.
  return Math.max(2, Math.round(words / 150));
};

// ---------- Mastery ----------

export const getMastery = (topicId: string): number => {
  const all = read<Dict<number>>(MASTERY_KEY, {});
  return all[topicId] ?? 0;
};

export const setMastery = (topicId: string, pct: number): void => {
  const all = read<Dict<number>>(MASTERY_KEY, {});
  all[topicId] = Math.max(0, Math.min(100, Math.round(pct)));
  write(MASTERY_KEY, all);
};

export const getAllMastery = (): Dict<number> => read<Dict<number>>(MASTERY_KEY, {});

// ---------- Self-check answers (per question) ----------

export type SelfRating = 'got' | 'review';

export const getSelfCheck = (topicId: string): Dict<SelfRating> => {
  const all = read<Dict<Dict<SelfRating>>>(SELFCHECK_KEY, {});
  return all[topicId] ?? {};
};

export const setSelfCheckAnswer = (topicId: string, qKey: string, rating: SelfRating): Dict<SelfRating> => {
  const all = read<Dict<Dict<SelfRating>>>(SELFCHECK_KEY, {});
  const forTopic = { ...(all[topicId] ?? {}), [qKey]: rating };
  all[topicId] = forTopic;
  write(SELFCHECK_KEY, all);
  return forTopic;
};

/** Mastery % from self-check answers: proportion rated "got" out of total questions. */
export const masteryFromSelfCheck = (answers: Dict<SelfRating>, totalQuestions: number): number => {
  if (totalQuestions <= 0) return 0;
  const got = Object.values(answers).filter(r => r === 'got').length;
  return Math.round((got / totalQuestions) * 100);
};

// ---------- Spaced repetition (lightweight SM-2-inspired) ----------

const addDays = (n: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

/**
 * Schedule the next review for a topic. "review" = due tomorrow;
 * "got" = due further out, growing with current mastery.
 */
export const scheduleReview = (topicId: string, quality: SelfRating, masteryPct: number): void => {
  const all = read<Dict<string>>(REVIEW_KEY, {});
  let interval = 1;
  if (quality === 'got') {
    if (masteryPct >= 90) interval = 14;
    else if (masteryPct >= 70) interval = 7;
    else if (masteryPct >= 50) interval = 3;
    else interval = 2;
  }
  all[topicId] = addDays(interval);
  write(REVIEW_KEY, all);
};

export const getReviewQueue = (): Dict<string> => read<Dict<string>>(REVIEW_KEY, {});

/** Topic IDs whose review date is today or earlier. */
export const getDueReviews = (): string[] => {
  const all = getReviewQueue();
  const today = new Date().toISOString().slice(0, 10);
  return Object.keys(all).filter(id => all[id] <= today);
};

// ---------- Last visited topic (resume) ----------

export const getLastTopic = (): string | null => {
  try { return localStorage.getItem(LAST_TOPIC_KEY) || null; } catch { return null; }
};

export const setLastTopic = (topicId: string): void => {
  try { localStorage.setItem(LAST_TOPIC_KEY, topicId); } catch { /* ignore */ }
};

// ---------- Diagnostic (onboarding placement) ----------

export interface DiagnosticResult {
  recommendedTrack: string;   // a Category id
  answers: Record<string, string>;
  doneAt: string;             // ISO timestamp
}

export const getDiagnostic = (): DiagnosticResult | null =>
  read<DiagnosticResult | null>(DIAGNOSTIC_KEY, null);

export const setDiagnostic = (result: DiagnosticResult): void => write(DIAGNOSTIC_KEY, result);

// ---------- MCQ answers (objective, auto-graded) ----------

const MCQ_KEY = 'de_mcq_v1'; // { [topicId]: { [questionId]: selectedIndex } }

export const getMcqAnswers = (topicId: string): Dict<number> => {
  const all = read<Dict<Dict<number>>>(MCQ_KEY, {});
  return all[topicId] ?? {};
};

export const setMcqAnswer = (topicId: string, qId: string, selectedIndex: number): Dict<number> => {
  const all = read<Dict<Dict<number>>>(MCQ_KEY, {});
  const forTopic = { ...(all[topicId] ?? {}), [qId]: selectedIndex };
  all[topicId] = forTopic;
  write(MCQ_KEY, all);
  return forTopic;
};

export const clearMcqAnswers = (topicId: string): void => {
  const all = read<Dict<Dict<number>>>(MCQ_KEY, {});
  all[topicId] = {};
  write(MCQ_KEY, all);
};
