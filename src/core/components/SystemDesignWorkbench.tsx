import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Compass, Eye } from 'lucide-react';
import type { ConceptualInterviewQuestion } from '../types/types';

// Shared across domains. Scaffolds the standard system-design interview
// framework around any conceptual system-design question, then reveals the
// authored model answer for comparison. `accent` lets each domain tint it.

const STAGES: { key: string; label: string; hint: string }[] = [
  { key: 'requirements', label: '1 · Clarify requirements', hint: 'Functional needs? Scale (users, QPS, data size)? Constraints — latency, cost, consistency? What is explicitly out of scope?' },
  { key: 'estimates', label: '2 · Back-of-envelope estimates', hint: 'Traffic, storage, and bandwidth to order-of-magnitude. Enough to size components — not precise math.' },
  { key: 'design', label: '3 · High-level design', hint: 'The core components and how one request flows end to end. Name the boxes and the arrows between them.' },
  { key: 'deepdive', label: '4 · Deep dive & data model', hint: 'Pick the 1–2 hardest parts. Schemas, APIs, key algorithms, and why.' },
  { key: 'tradeoffs', label: '5 · Trade-offs, bottlenecks & scale', hint: 'Where does it break first? What do you shard, cache, or queue? What are you consciously trading off?' },
];

const SdLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-muted)' }}>{children}</div>
);
const SdField: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color }) => (
  <div><SdLabel>{label}</SdLabel><div style={{ fontSize: 12.5, color: color || 'var(--text-secondary)', marginTop: 2, lineHeight: 1.55 }}>{value}</div></div>
);

export const SystemDesignWorkbench: React.FC<{ q: ConceptualInterviewQuestion; accent?: string }> = ({ q, accent = 'var(--accent, #8b5cf6)' }) => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);
  const de = q.detailedExplanation;
  const filled = STAGES.filter((s) => (notes[s.key] || '').trim()).length;

  return (
    <div style={{ padding: 14, borderRadius: 10, border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)' }}>
      <div onClick={() => setOpen((o) => !o)} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, cursor: 'pointer' }}>
        <span style={{ display: 'flex', gap: 8, alignItems: 'center', fontWeight: 600, color: 'var(--text-primary)' }}><Compass size={15} color={accent} /> {q.question}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>

      {open && (
        <div style={{ marginTop: 12, borderTop: '1px solid var(--border-glass)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Work the framework yourself first — jot notes at each stage ({filled}/{STAGES.length} started), then reveal the reference to compare.
          </div>
          {STAGES.map((s) => (
            <div key={s.key} style={{ border: '1px solid var(--border-glass)', borderRadius: 8, padding: '10px 12px', background: 'var(--bg-inner)' }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: notes[s.key]?.trim() ? '#10b981' : 'var(--text-primary)' }}>{s.label}</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', margin: '3px 0 6px', lineHeight: 1.45 }}>{s.hint}</div>
              <textarea
                value={notes[s.key] || ''}
                onChange={(e) => setNotes((n) => ({ ...n, [s.key]: e.target.value }))}
                placeholder="Your notes…"
                rows={2}
                style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', borderRadius: 6, border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: 12.5, padding: '7px 9px' }}
              />
            </div>
          ))}

          <button onClick={() => setRevealed((r) => !r)} style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 13, padding: '8px 14px', borderRadius: 8, border: '1px solid transparent', background: accent, color: '#fff' }}>
            <Eye size={14} /> {revealed ? 'Hide reference approach' : 'Reveal reference approach'}
          </button>

          {revealed && (
            <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SdField label="Reference approach" value={q.directAnswer} />
              {de?.whatItIs && <SdField label="What it is" value={de.whatItIs} />}
              {de?.whyItExists && <SdField label="Why it exists" value={de.whyItExists} />}
              {de?.howItWorks && <SdField label="How it works" value={de.howItWorks} />}
              {q.whyImportant && <SdField label="Why it matters" value={q.whyImportant} />}
              {q.realWorldExample && <SdField label="Real-world example" value={q.realWorldExample} color="#10b981" />}
              {q.followUps?.length > 0 && (
                <div>
                  <SdLabel>Follow-ups</SdLabel>
                  {q.followUps.map((f, i) => (
                    <div key={i} style={{ marginTop: 6 }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>Q: {f.question}</span>
                      <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.55 }}>{f.answer}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
