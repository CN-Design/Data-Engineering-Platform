import React, { useEffect, useRef, useState } from 'react';
import type { Category } from '../../../core/types/types';
import { ArrowRight, Compass, X } from 'lucide-react';

interface Props {
  onStart: (tech: Category, topicId: string) => void;
  onClose: () => void;
}

type Experience = 'new' | 'some' | 'building';
type Goal = 'foundations' | 'interfaces' | 'apps' | 'interviews';

type PlacementTrack = 'html' | 'javascript' | 'react' | 'css' | 'nextjs' | 'systems';
const OPTIONS: Record<PlacementTrack, { topicId: string; title: string; reason: string }> = {
  html: { topicId: 'html-what-is-html', title: 'HTML', reason: 'Start with the structure and meaning of a webpage.' },
  javascript: { topicId: 'js-what-is-javascript', title: 'JavaScript', reason: 'Build a strong base in the language that makes pages respond.' },
  react: { topicId: 'react-what-is-react', title: 'React', reason: 'Learn how components turn data into interactive interfaces.' },
  css: { topicId: 'css-what-is-css', title: 'CSS', reason: 'Learn the visual rules behind responsive page layouts.' },
  nextjs: { topicId: 'nextjs-what-is-nextjs', title: 'Next.js', reason: 'Build complete React applications with routes and server features.' },
  systems: { topicId: 'sys-how-web-works', title: 'Systems & the Web Platform', reason: 'Understand how browsers, networks, and production systems fit together.' },
};

const choiceStyle = (active: boolean): React.CSSProperties => ({
  width: '100%', textAlign: 'left', padding: '12px 14px', borderRadius: 10,
  border: `1px solid ${active ? '#3b82f6' : 'var(--border-glass)'}`,
  background: active ? 'rgba(59,130,246,0.12)' : 'var(--bg-inner)',
  color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 600,
});

export const FrontendPlacement: React.FC<Props> = ({ onStart, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, []);
  const recommendation: PlacementTrack = !experience || !goal
    ? 'html'
    : experience === 'new'
      ? 'html'
      : experience === 'some'
        ? goal === 'interfaces' ? 'css' : goal === 'apps' ? 'react' : goal === 'interviews' ? 'systems' : 'javascript'
        : goal === 'foundations' ? 'javascript' : goal === 'interfaces' ? 'react' : goal === 'apps' ? 'nextjs' : 'systems';
  const selected = OPTIONS[recommendation];

  return (
    <dialog ref={dialogRef} aria-labelledby="fe-placement-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} style={{ width: 'min(680px, calc(100vw - 36px))', maxHeight: '90vh', overflowY: 'auto', padding: 24, borderRadius: 18, border: '1px solid var(--border-glass)', background: 'var(--bg-primary)', color: 'var(--text-primary)', boxShadow: '0 24px 80px rgba(0,0,0,0.35)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <Compass size={22} color="#60a5fa" />
          <div style={{ flex: 1 }}><h2 id="fe-placement-title" style={{ margin: 0, color: 'var(--text-primary)' }}>Find your starting point</h2><p style={{ color: 'var(--text-secondary)', margin: '6px 0 18px' }}>Two quick choices suggest a first lesson. You can change tracks whenever you like.</p></div>
          <button onClick={onClose} aria-label="Close placement" style={{ border: 0, background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={18} /></button>
        </div>
        <fieldset style={{ border: 0, padding: 0, margin: '0 0 18px' }}>
          <legend style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 9 }}>How familiar are you with building webpages?</legend>
          <div style={{ display: 'grid', gap: 8 }}>
            {([['new', 'I am starting from zero'], ['some', 'I know a little HTML, CSS, or JavaScript'], ['building', 'I have built interactive pages']] as [Experience, string][]).map(([value, label]) => <button key={value} aria-pressed={experience === value} onClick={() => setExperience(value)} style={choiceStyle(experience === value)}>{label}</button>)}
          </div>
        </fieldset>
        <fieldset style={{ border: 0, padding: 0, margin: '0 0 18px' }}>
          <legend style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: 9 }}>What would you like to focus on?</legend>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 8 }}>
            {([['foundations', 'Core foundations'], ['interfaces', 'Beautiful interfaces'], ['apps', 'Complete applications'], ['interviews', 'Production and interviews']] as [Goal, string][]).map(([value, label]) => <button key={value} aria-pressed={goal === value} onClick={() => setGoal(value)} style={choiceStyle(goal === value)}>{label}</button>)}
          </div>
        </fieldset>
        <div style={{ borderRadius: 12, padding: 15, background: 'var(--bg-inner)', borderLeft: '3px solid #3b82f6', marginBottom: 16 }}>
          <div style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 5 }}>Suggested first track · {selected.title}</div>
          <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selected.reason}</div>
          {(!experience || !goal) && <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 6 }}>Choose both answers to refine this suggestion.</div>}
        </div>
        <button disabled={!experience || !goal} onClick={() => onStart(recommendation, selected.topicId)} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 14px', opacity: experience && goal ? 1 : 0.55 }}>
          Start this lesson <ArrowRight size={16} />
        </button>
    </dialog>
  );
};
