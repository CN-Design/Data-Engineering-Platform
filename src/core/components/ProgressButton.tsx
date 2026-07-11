import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Flame, Trophy, Star, Zap, X, CheckCircle2, Lock } from 'lucide-react';
import { getStats, levelFromXp, getAchievements } from '../../domains/data-engineering/utils/engagement';

// Domain-agnostic progress surface for the top-level entry points (dashboard,
// roadmap). XP/level/streak/achievements are derived from the shared engine, so
// they reflect progress across ALL domains — not just Data Engineering.
// (Mastery-by-track and certificates stay in the DE EngagementBar, since those
// are DE-specific signals.)

const StatChip: React.FC<{ icon: React.ReactNode; value: React.ReactNode; label: string; color: string }> = ({ icon, value, label, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 14px', borderRadius: 12, background: 'var(--bg-inner)', border: '1px solid var(--border-glass)' }}>
    <span style={{ color, display: 'flex' }}>{icon}</span>
    <div style={{ lineHeight: 1.1 }}>
      <strong style={{ fontSize: 15, color: 'var(--text-primary)' }}>{value}</strong>
      <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{label}</div>
    </div>
  </div>
);

const ProgressModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const stats = getStats();
  const lvl = levelFromXp(stats.xp);
  const achievements = getAchievements(stats);
  const earned = achievements.filter((a) => a.earned).length;

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Your progress" onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>
      <div onClick={(e) => e.stopPropagation()} className="cn-toast"
        style={{ width: '100%', maxWidth: 560, maxHeight: '85vh', overflowY: 'auto', padding: 24, borderRadius: 18, border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)', position: 'relative', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <button onClick={onClose} aria-label="Close" autoFocus style={{ position: 'absolute', top: 14, right: 14, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>

        {/* Level header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#3b82f6,#a855f7)', color: '#fff', fontWeight: 800, fontSize: 20, flexShrink: 0 }}>{lvl.level}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>Level {lvl.level} · {lvl.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <div style={{ flex: 1, height: 7, borderRadius: 999, background: 'var(--bg-inner)', overflow: 'hidden' }}>
                <div style={{ width: `${lvl.pctToNext}%`, height: '100%', background: 'linear-gradient(90deg,#3b82f6,#a855f7)' }} />
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{lvl.intoLevel}/{lvl.forNext} XP</span>
            </div>
          </div>
        </div>

        {/* Stat chips */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10 }}>
          <StatChip icon={<Flame size={18} />} value={`${stats.streak}d`} label="streak" color={stats.streak > 0 ? '#f97316' : 'var(--text-muted)'} />
          <StatChip icon={<Zap size={18} />} value={stats.topicsCompleted} label="topics done" color="#3b82f6" />
          <StatChip icon={<Star size={18} />} value={stats.challengesSolved} label="solved" color="#8b5cf6" />
          <StatChip icon={<Trophy size={18} />} value={`${earned}/${achievements.length}`} label="achievements" color="#10b981" />
        </div>

        {/* Achievements */}
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-muted)', marginBottom: 8 }}>Achievements · {earned}/{achievements.length}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 8 }}>
            {achievements.map((a) => (
              <div key={a.id} style={{ minWidth: 0, display: 'flex', gap: 10, alignItems: 'flex-start', padding: 10, borderRadius: 10, border: `1px solid ${a.earned ? '#10b981' : 'var(--border-glass)'}`, background: a.earned ? 'rgba(16,185,129,0.08)' : 'var(--bg-inner)', opacity: a.earned ? 1 : 0.72 }}>
                <span style={{ color: a.earned ? '#10b981' : 'var(--text-muted)', flexShrink: 0, marginTop: 1 }}>{a.earned ? <CheckCircle2 size={16} /> : <Lock size={14} />}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)' }}>{a.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{a.desc}</div>
                  {!a.earned && a.progress > 0 && (
                    <div style={{ marginTop: 5, height: 4, borderRadius: 999, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                      <div style={{ width: `${a.progress}%`, height: '100%', background: '#3b82f6' }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const ProgressButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const stats = getStats();
  const lvl = levelFromXp(stats.xp);
  return (
    <>
      <button onClick={() => setOpen(true)} title="Your progress" aria-label="Your progress"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 38, padding: '0 12px', borderRadius: 10, border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 700, fontSize: 12.5 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: 7, background: 'linear-gradient(135deg,#3b82f6,#a855f7)', color: '#fff', fontSize: 11, fontWeight: 800 }}>{lvl.level}</span>
        {stats.streak > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: '#f97316' }}><Flame size={14} />{stats.streak}</span>}
      </button>
      {open && <ProgressModal onClose={() => setOpen(false)} />}
    </>
  );
};
