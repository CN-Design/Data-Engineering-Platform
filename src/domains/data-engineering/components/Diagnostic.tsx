import React, { useState } from 'react';
import { Compass, ArrowRight, ArrowLeft, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { setDiagnostic } from '../utils/learnProgress';
import { useEscapeToClose } from '../utils/useEscapeToClose';

interface DiagnosticProps {
  onPick: (track: string) => void; // jump to the recommended (or chosen) track
  onClose: () => void;
}

interface QuestionDef {
  id: string;
  title: string;
  options: { value: string; label: string; hint: string }[];
}

const QUESTIONS: QuestionDef[] = [
  {
    id: 'experience',
    title: 'How would you describe your data engineering experience?',
    options: [
      { value: 'new', label: 'Brand new', hint: "I'm starting from scratch" },
      { value: 'some', label: 'Some experience', hint: "I've written scripts / queries" },
      { value: 'working', label: 'Working in the field', hint: 'I build pipelines today' },
    ],
  },
  {
    id: 'sqlpy',
    title: 'How comfortable are you with SQL and Python?',
    options: [
      { value: 'none', label: 'Not yet', hint: 'Little or no hands-on' },
      { value: 'basic', label: 'The basics', hint: 'Can read/write simple code & queries' },
      { value: 'strong', label: 'Strong', hint: 'Fluent in both' },
    ],
  },
  {
    id: 'goal',
    title: "What's your main goal right now?",
    options: [
      { value: 'fundamentals', label: 'Build fundamentals', hint: 'Understand the core deeply' },
      { value: 'interviews', label: 'Prepare for interviews', hint: 'Get job-ready fast' },
      { value: 'production', label: 'Go deep / production', hint: 'Advanced & operational skills' },
    ],
  },
];

const TRACK_LABEL: Record<string, string> = {
  foundations: 'Foundations (Start Here)',
  python: 'Python for DE',
  sql: 'Advanced SQL',
  'data-engineering': 'Data Engineering Core',
};

const recommend = (a: Record<string, string>): string => {
  if (a.experience === 'new' || a.sqlpy === 'none') return 'foundations';
  if (a.sqlpy === 'basic') return 'python';
  // strong on SQL/Python:
  if (a.goal === 'fundamentals') return 'sql';
  return 'data-engineering';
};

export const Diagnostic: React.FC<DiagnosticProps> = ({ onPick, onClose }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  useEscapeToClose(onClose);

  const q = QUESTIONS[step];
  const rec = recommend(answers);

  const choose = (value: string) => {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const track = recommend(next);
      setDiagnostic({ recommendedTrack: track, answers: next, doneAt: new Date().toISOString() });
      setDone(true);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Data Engineering placement"
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-slide-up"
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 520, padding: 26, background: 'var(--bg-secondary)', position: 'relative', display: 'flex', flexDirection: 'column', gap: 18 }}
      >
        <button onClick={onClose} aria-label="Close" autoFocus style={{ position: 'absolute', top: 14, right: 14, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <X size={18} />
        </button>

        {!done ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 38, height: 38, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(59,130,246,0.14)', color: '#3b82f6' }}><Compass size={20} /></span>
              <div>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>Find your starting point</h3>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>~2 minutes · Question {step + 1} of {QUESTIONS.length}</span>
              </div>
            </div>

            {/* progress */}
            <div style={{ display: 'flex', gap: 6 }}>
              {QUESTIONS.map((_, i) => (
                <span key={i} style={{ flex: 1, height: 5, borderRadius: 999, background: i <= step ? 'linear-gradient(90deg,#3b82f6,#a855f7)' : 'var(--bg-inner)' }} />
              ))}
            </div>

            <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>{q.title}</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.options.map(opt => {
                const selected = answers[q.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => choose(opt.value)}
                    className="glass-panel"
                    style={{ textAlign: 'left', cursor: 'pointer', padding: '14px 16px', border: `1px solid ${selected ? '#3b82f6' : 'var(--border-glass)'}`, background: selected ? 'rgba(59,130,246,0.08)' : 'var(--bg-inner)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}
                  >
                    <span>
                      <span style={{ display: 'block', fontSize: 14.5, fontWeight: 700, color: 'var(--text-primary)' }}>{opt.label}</span>
                      <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{opt.hint}</span>
                    </span>
                    <ArrowRight size={16} className="text-muted" />
                  </button>
                );
              })}
            </div>

            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="btn btn-secondary" style={{ alignSelf: 'flex-start', padding: '6px 12px', fontSize: 12 }}>
                <ArrowLeft size={13} /> Back
              </button>
            )}
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 38, height: 38, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(16,185,129,0.14)', color: '#10b981' }}><CheckCircle2 size={20} /></span>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>Here&apos;s where to start</h3>
            </div>
            <div style={{ background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', borderLeft: '3px solid #3b82f6', borderRadius: 10, padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Sparkles size={15} color="#3b82f6" />
                <span style={{ fontSize: 11.5, textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 800, color: 'var(--text-muted)' }}>Recommended track</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>{TRACK_LABEL[rec] || rec}</div>
              <p style={{ margin: '6px 0 0 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Based on your answers. You can always follow the full roadmap or jump to any track — this is just the best on-ramp for you.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={() => onPick(rec)} className="btn btn-primary" style={{ padding: '10px 18px' }}>
                Start {TRACK_LABEL[rec] || rec} <ArrowRight size={15} />
              </button>
              <button onClick={onClose} className="btn btn-secondary" style={{ padding: '10px 18px' }}>
                Browse all tracks
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
