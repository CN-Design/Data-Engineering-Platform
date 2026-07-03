import React from 'react';
import type { Topic } from '../../../core/types/types';
import { ArrowRight, CornerDownLeft, Link2, Flag, CheckCircle2, Trophy } from 'lucide-react';
import { getAllMastery } from '../utils/learnProgress';

interface TopicNextUpProps {
  topic: Topic;
  siblingTopics: Topic[]; // all topics in the current track, in curriculum order
  onNavigate: (t: Topic) => void;
}

const DIFF_COLOR: Record<string, string> = {
  beginner: '#10b981',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
};

const readCompleted = (): Record<string, boolean> => {
  try { return JSON.parse(localStorage.getItem('de_completed_topics') || '{}'); } catch { return {}; }
};

export const TopicNextUp: React.FC<TopicNextUpProps> = ({ topic, siblingTopics, onNavigate }) => {
  const completed = readCompleted();
  const mastery = getAllMastery();

  const idx = siblingTopics.findIndex(t => t.id === topic.id);
  const prev = idx > 0 ? siblingTopics[idx - 1] : null;
  const next = idx >= 0 && idx < siblingTopics.length - 1 ? siblingTopics[idx + 1] : null;

  // Related = other same-difficulty topics in this track, excluding prev/next/current.
  const related = siblingTopics
    .filter(t => t.difficulty === topic.difficulty && t.id !== topic.id && t.id !== prev?.id && t.id !== next?.id)
    .slice(0, 3);

  // Soft checkpoint: progress through the current difficulty tier of this track.
  const tier = siblingTopics.filter(t => t.difficulty === topic.difficulty);
  const tierDone = tier.filter(t => completed[t.id]).length;
  const tierPct = tier.length ? Math.round((tierDone / tier.length) * 100) : 0;
  const tierMasteryVals = tier.map(t => mastery[t.id] || 0);
  const tierAvgMastery = tierMasteryVals.length ? Math.round(tierMasteryVals.reduce((a, b) => a + b, 0) / tierMasteryVals.length) : 0;
  const tierComplete = tier.length > 0 && tierDone === tier.length;
  const diffColor = DIFF_COLOR[topic.difficulty] || '#3b82f6';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Checkpoint */}
      <div
        className="glass-panel"
        style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, borderLeft: `3px solid ${diffColor}`, background: tierComplete ? 'rgba(16,185,129,0.07)' : 'var(--bg-secondary)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {tierComplete ? <Trophy size={16} color="#10b981" /> : <Flag size={16} color={diffColor} />}
          <span style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-muted)' }}>
            {topic.difficulty} checkpoint
          </span>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>{tierDone}/{tier.length} done · {tierAvgMastery}% avg mastery</span>
        </div>
        <div style={{ height: 7, borderRadius: 999, background: 'var(--bg-inner)', overflow: 'hidden' }}>
          <div style={{ width: `${tierPct}%`, height: '100%', background: tierComplete ? '#10b981' : diffColor, transition: 'width .3s ease' }} />
        </div>
        <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {tierComplete
            ? `Checkpoint reached — you've completed every ${topic.difficulty} topic in this track. ${tierAvgMastery < 70 ? 'Consider revisiting Self-Checks below 70% before moving on.' : 'Strong mastery — ready to advance.'}`
            : `Complete the ${topic.difficulty} topics in this track (and their Self-Checks) to clear this checkpoint.`}
        </span>
      </div>

      {/* Prerequisite + Up next */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
        {prev && (
          <button
            onClick={() => onNavigate(prev)}
            className="glass-panel"
            style={{ textAlign: 'left', cursor: 'pointer', padding: 16, border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', display: 'flex', flexDirection: 'column', gap: 6 }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-muted)' }}>
              <CornerDownLeft size={13} /> Builds on
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>{prev.title}</span>
          </button>
        )}

        {next && (
          <button
            onClick={() => onNavigate(next)}
            className="glass-panel"
            style={{ textAlign: 'left', cursor: 'pointer', padding: 16, border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.06)', display: 'flex', flexDirection: 'column', gap: 6 }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, color: '#3b82f6' }}>
              Up next <ArrowRight size={13} />
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>{next.title}</span>
            {completed[next.id] && <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: '#10b981' }}><CheckCircle2 size={12} /> Completed</span>}
          </button>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
            <Link2 size={14} color="var(--text-muted)" />
            <span style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-muted)' }}>Related in this track</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {related.map(t => (
              <button
                key={t.id}
                onClick={() => onNavigate(t)}
                style={{ cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', borderRadius: 999, padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                {t.title}
                {completed[t.id] && <CheckCircle2 size={12} color="#10b981" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
