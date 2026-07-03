// ============================================================
// Data Engineering — client-side engagement engine.
// XP, levels, streak, and achievements are DERIVED from existing
// progress signals (no separate source of truth to drift):
//   de_completed_topics, de_completed_challenges,
//   de_topic_mastery_v1, de_project_progress, de_activity_days
// All reads fail safe.
// ============================================================

const ACTIVITY_KEY = 'de_activity_days';

const readObj = <T,>(key: string, fallback: T): T => {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) as T : fallback; } catch { return fallback; }
};

// ---------- Activity / streak ----------

export const recordActivityToday = (): void => {
  try {
    const days: string[] = readObj<string[]>(ACTIVITY_KEY, []);
    const today = new Date().toISOString().slice(0, 10);
    if (!days.includes(today)) {
      days.push(today);
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(days));
    }
  } catch { /* ignore */ }
};

export const getStreak = (): number => {
  const days = new Set(readObj<string[]>(ACTIVITY_KEY, []));
  if (days.size === 0) return 0;
  const d = new Date();
  if (!days.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  let streak = 0;
  while (days.has(d.toISOString().slice(0, 10))) { streak += 1; d.setDate(d.getDate() - 1); }
  return streak;
};

export const getActiveDaysCount = (): number => new Set(readObj<string[]>(ACTIVITY_KEY, [])).size;

// ---------- Aggregate stats ----------

export interface EngagementStats {
  topicsCompleted: number;
  challengesSolved: number;
  masteredTopics: number; // mastery >= 80
  projectMilestones: number;
  streak: number;
  activeDays: number;
  xp: number;
  xpBreakdown: { label: string; xp: number }[];
}

export const getStats = (): EngagementStats => {
  const topics = readObj<Record<string, boolean>>('de_completed_topics', {});
  const challenges = readObj<Record<string, boolean>>('de_completed_challenges', {});
  const mastery = readObj<Record<string, number>>('de_topic_mastery_v1', {});
  const projects = readObj<Record<string, boolean>>('de_project_progress', {});

  const topicsCompleted = Object.values(topics).filter(Boolean).length;
  const challengesSolved = Object.values(challenges).filter(Boolean).length;
  const masteredTopics = Object.values(mastery).filter(v => v >= 80).length;
  const projectMilestones = Object.values(projects).filter(Boolean).length;

  const xpBreakdown = [
    { label: 'Topics completed', xp: topicsCompleted * 10 },
    { label: 'Challenges solved', xp: challengesSolved * 15 },
    { label: 'Topics mastered (≥80%)', xp: masteredTopics * 10 },
    { label: 'Project milestones', xp: projectMilestones * 20 },
  ];
  const xp = xpBreakdown.reduce((a, b) => a + b.xp, 0);

  return {
    topicsCompleted, challengesSolved, masteredTopics, projectMilestones,
    streak: getStreak(), activeDays: getActiveDaysCount(), xp, xpBreakdown,
  };
};

// ---------- Levels ----------

const LEVEL_TITLES: { min: number; title: string }[] = [
  { min: 20, title: 'Principal' },
  { min: 16, title: 'Staff' },
  { min: 12, title: 'Senior' },
  { min: 8, title: 'Engineer' },
  { min: 5, title: 'Practitioner' },
  { min: 3, title: 'Apprentice' },
  { min: 1, title: 'Novice' },
];

// XP needed to *reach* level L from L-1 grows linearly: 100 * L.
const xpToReach = (level: number): number => {
  let total = 0;
  for (let l = 2; l <= level; l++) total += 100 * (l - 1);
  return total;
};

export interface LevelInfo { level: number; title: string; intoLevel: number; forNext: number; pctToNext: number; }

export const levelFromXp = (xp: number): LevelInfo => {
  let level = 1;
  while (xpToReach(level + 1) <= xp) level += 1;
  const base = xpToReach(level);
  const next = xpToReach(level + 1);
  const forNext = next - base;
  const intoLevel = xp - base;
  const title = (LEVEL_TITLES.find(t => level >= t.min)?.title) || 'Novice';
  return { level, title, intoLevel, forNext, pctToNext: forNext ? Math.round((intoLevel / forNext) * 100) : 0 };
};

// ---------- Achievements ----------

export interface Achievement {
  id: string;
  label: string;
  desc: string;
  earned: boolean;
  progress: number; // 0..100
}

export const getAchievements = (s: EngagementStats): Achievement[] => {
  const mk = (id: string, label: string, desc: string, value: number, target: number): Achievement => ({
    id, label, desc, earned: value >= target, progress: Math.min(100, Math.round((value / target) * 100)),
  });
  return [
    mk('first-steps', 'First Steps', 'Complete your first topic', s.topicsCompleted, 1),
    mk('scholar', 'Scholar', 'Complete 25 topics', s.topicsCompleted, 25),
    mk('polymath', 'Polymath', 'Complete 100 topics', s.topicsCompleted, 100),
    mk('first-solve', 'Problem Solver', 'Solve your first challenge', s.challengesSolved, 1),
    mk('grinder', 'Grinder', 'Solve 25 challenges', s.challengesSolved, 25),
    mk('sharp', 'Sharp Recall', 'Master 10 topics (≥80%)', s.masteredTopics, 10),
    mk('streak-7', 'On a Roll', 'Reach a 7-day streak', s.streak, 7),
    mk('streak-30', 'Unstoppable', 'Reach a 30-day streak', s.streak, 30),
    mk('builder', 'Builder', 'Complete a project milestone', s.projectMilestones, 1),
    mk('shipper', 'Shipper', 'Complete 10 project milestones', s.projectMilestones, 10),
  ];
};
