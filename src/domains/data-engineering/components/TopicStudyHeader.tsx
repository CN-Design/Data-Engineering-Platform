import React, { useState } from 'react';
import type { Topic, PremiumTopicData } from '../../../core/types/types';
import { Clock, Gauge, Target, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { estimateReadingMinutes } from '../utils/learnProgress';

interface TopicStudyHeaderProps {
  topic: Topic;
  data: PremiumTopicData;
  mastery: number; // 0..100
}

const DIFF_COLOR: Record<string, string> = {
  beginner: '#10b981',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
};

const MasteryRing: React.FC<{ pct: number }> = ({ pct }) => {
  const r = 16;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  const color = pct >= 80 ? '#10b981' : pct >= 40 ? '#f59e0b' : pct > 0 ? '#3b82f6' : 'var(--text-muted)';
  return (
    <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={r} fill="none" stroke="var(--border-glass)" strokeWidth="4" />
        <circle
          cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off} transform="rotate(-90 22 22)"
          style={{ transition: 'stroke-dashoffset .4s ease' }}
        />
      </svg>
      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)' }}>{pct}%</span>
    </div>
  );
};

const Meta: React.FC<{ icon: React.ReactNode; label: string; value: string; color?: string }> = ({ icon, label, value, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span style={{ color: color || 'var(--text-muted)', display: 'flex' }}>{icon}</span>
    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{label}</span>
    <span style={{ fontSize: '13px', fontWeight: 700, color: color || 'var(--text-primary)', textTransform: 'capitalize' }}>{value}</span>
  </div>
);

export const TopicStudyHeader: React.FC<TopicStudyHeaderProps> = ({ topic, data, mastery }) => {
  const [showObjectives, setShowObjectives] = useState(false);
  const cc = data.coreConcept;
  const minutes = estimateReadingMinutes(data);
  const diffColor = DIFF_COLOR[topic.difficulty] || 'var(--text-muted)';

  // TL;DR: prefer the formal definition; fall back to the first overview line.
  const tldr = cc.formalDefinition?.trim() || (cc.overview && cc.overview[0]) || cc.simpleExplanation || '';
  const takeaways = (data.keyTakeaways || []).slice(0, 3);
  const objectives = cc.learningObjectives || [];

  return (
    <div
      className="glass-panel"
      style={{
        padding: '22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span aria-hidden style={{ position: 'absolute', inset: '0 auto 0 0', width: 4, background: `linear-gradient(180deg, ${diffColor}, transparent)` }} />

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
          <Meta icon={<Gauge size={15} />} label="Level" value={topic.difficulty} color={diffColor} />
          <Meta icon={<Clock size={15} />} label="Read" value={`~${minutes} min`} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MasteryRing pct={mastery} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Mastery</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {mastery === 0 ? 'Take the Self-Check' : mastery >= 80 ? 'Strong' : mastery >= 40 ? 'Getting there' : 'Keep practicing'}
            </span>
          </div>
        </div>
      </div>

      {/* TL;DR */}
      <div style={{ background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', borderLeft: `3px solid ${diffColor}`, borderRadius: '10px', padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
          <Sparkles size={14} color={diffColor} />
          <strong style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)' }}>In a nutshell</strong>
        </div>
        <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.65, color: 'var(--text-primary)' }}>{tldr}</p>
        {takeaways.length > 0 && (
          <ul style={{ margin: '10px 0 0 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {takeaways.map((t, i) => (
              <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{t}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Learning objectives (collapsible) */}
      {objectives.length > 0 && (
        <div>
          <button
            onClick={() => setShowObjectives(v => !v)}
            aria-expanded={showObjectives}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'inherit', padding: 0, fontSize: '13px', fontWeight: 600 }}
          >
            <Target size={15} color="#3b82f6" />
            What you&apos;ll be able to do ({objectives.length})
            {showObjectives ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {showObjectives && (
            <ul style={{ margin: '10px 0 0 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {objectives.map((o, i) => (
                <li key={i} style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{o}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
        Full deep-dive below · finish with the <strong style={{ color: 'var(--text-secondary)' }}>Self-Check</strong> tab to lock in mastery.
      </p>
    </div>
  );
};
