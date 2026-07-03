import React, { useRef, useState } from 'react';
import type { PremiumTopicData } from '../../../core/types/types';
import { Book, Server, GitBranch, Activity, CheckCircle2, GitFork, Layers, Database, Search, Inbox, Send, Cpu, CircleDot, ChevronUp, ChevronDown, AlertTriangle, Scale } from 'lucide-react';
import { formatText } from '../../../core/utils/textFormatting';
import { TopicDiagram } from './diagrams';

const ARCH_ACCENT = '#f59e0b';

// Split a string on any of `seps`, but only at bracket depth 0 so arrows /
// pipes nested inside [...] {...} (...) are preserved.
function splitTop(s: string, seps: string[]): string[] {
  const out: string[] = [];
  let depth = 0;
  let buf = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth = Math.max(0, depth - 1);
    if (depth === 0) {
      let matched = '';
      for (const sep of seps) {
        if (s.startsWith(sep, i)) { matched = sep; break; }
      }
      if (matched) { out.push(buf); buf = ''; i += matched.length - 1; continue; }
    }
    buf += ch;
  }
  out.push(buf);
  return out.map(x => x.trim()).filter(Boolean);
}

function stripWrap(s: string): string {
  let t = s.trim();
  while ((t.startsWith('[') && t.endsWith(']')) || (t.startsWith('{') && t.endsWith('}')) || (t.startsWith('(') && t.endsWith(')'))) {
    t = t.slice(1, -1).trim();
  }
  return t;
}

interface FlowStage { label: string; branches?: string[]; kind?: 'parallel' | 'alt' }

function parseArchitectureFlow(flow: string): FlowStage[] | null {
  // Only render as a pipeline if it actually contains stage arrows.
  if (!/->|=>|→/.test(flow)) return null;
  const stages = splitTop(flow, ['->', '=>', '→']);
  if (stages.length < 2) return null;
  return stages.map(raw => {
    const clean = stripWrap(raw);
    // Parallel paths joined by AND; alternative paths joined by |.
    const andParts = splitTop(clean, [' AND ']);
    if (andParts.length > 1) return { label: clean, branches: andParts.map(stripWrap), kind: 'parallel' as const };
    const orParts = splitTop(clean, ['|']);
    if (orParts.length > 1) return { label: clean, branches: orParts.map(stripWrap), kind: 'alt' as const };
    return { label: clean };
  });
}

// Pick a node icon (as a rendered element) from keywords in the stage label.
function nodeIconEl(label: string) {
  const t = label.toLowerCase();
  const sz = 18;
  if (/source|origin|incoming|event|raw|ingest|input|producer|stream in|arriv/.test(t)) return <Inbox size={sz} />;
  if (/store|storage|warehouse|lakehouse|lake|disk|file|table|catalog|partition|index|cache|database|sink/.test(t)) return <Database size={sz} />;
  if (/transform|process|compute|map|aggregat|clean|router|route|recompute|job|etl|pipeline|merge|batch|enrich|join/.test(t)) return <Cpu size={sz} />;
  if (/quer|read|predicate|prun|scan|filter|skip|search|lookup|select/.test(t)) return <Search size={sz} />;
  if (/output|result|serv|view|downstream|dashboard|response|report|deliver|consumer|api/.test(t)) return <Send size={sz} />;
  return <CircleDot size={sz} />;
}

// One connector segment: a vertical line with an arrowhead, drawn between nodes.
const Connector: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '34px', flexShrink: 0 }} aria-hidden>
    <div style={{ width: '2px', flex: 1, background: `linear-gradient(180deg, rgba(245,158,11,0.35), ${ARCH_ACCENT})` }} />
    <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `7px solid ${ARCH_ACCENT}` }} />
  </div>
);

const StageBox: React.FC<{ label: string; index: number }> = ({ label, index }) => {
  return (
    <div
      style={{
        position: 'relative', display: 'flex', alignItems: 'center', gap: '12px',
        width: 'min(540px, 100%)', boxSizing: 'border-box',
        background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)',
        borderRadius: '12px', padding: '14px 18px 14px 16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '4px', borderRadius: '12px 0 0 12px', background: `linear-gradient(180deg, ${ARCH_ACCENT}, rgba(245,158,11,0.4))` }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245,158,11,0.12)', color: ARCH_ACCENT, flexShrink: 0 }}>
        {nodeIconEl(label)}
      </div>
      <span style={{ position: 'absolute', top: '8px', right: '12px', fontSize: '10.5px', fontWeight: 800, color: 'var(--text-muted)', opacity: 0.6 }}>{String(index + 1).padStart(2, '0')}</span>
      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.45 }}>{label}</span>
    </div>
  );
};

// A fork group: parallel ("AND") or alternative ("|") sub-paths shown as lanes.
const ForkGroup: React.FC<{ stage: FlowStage; index: number }> = ({ stage, index }) => (
  <div
    style={{
      position: 'relative', width: 'min(620px, 100%)', boxSizing: 'border-box',
      background: 'var(--bg-secondary)', border: `1px dashed ${ARCH_ACCENT}`,
      borderRadius: '14px', padding: '14px 16px 16px',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '12px' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(245,158,11,0.12)', color: ARCH_ACCENT, flexShrink: 0 }}>
        {stage.kind === 'parallel' ? <Layers size={15} /> : <GitFork size={15} />}
      </span>
      <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        {stage.kind === 'parallel' ? 'Parallel paths' : 'Branches'}
      </span>
      <span style={{ marginLeft: 'auto', fontSize: '10.5px', fontWeight: 800, color: 'var(--text-muted)', opacity: 0.6 }}>{String(index + 1).padStart(2, '0')}</span>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {stage.branches!.map((b, i) => (
        <div key={i} style={{ flex: '1 1 200px', minWidth: '180px', display: 'flex', gap: '9px', alignItems: 'flex-start', background: 'var(--bg-primary)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '11px 12px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: ARCH_ACCENT, marginTop: '5px', flexShrink: 0 }} />
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{b}</span>
        </div>
      ))}
    </div>
  </div>
);

const ArchitectureFlow: React.FC<{ flow: string }> = ({ flow }) => {
  const stages = parseArchitectureFlow(flow);
  if (!stages) {
    // Prose flow — render as a clean narrative panel (not raw monospace).
    return (
      <div style={{ display: 'flex', gap: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border-glass)', borderLeft: `3px solid ${ARCH_ACCENT}`, borderRadius: '10px', padding: '16px 18px', marginBottom: '28px' }}>
        <GitBranch size={18} style={{ color: ARCH_ACCENT, flexShrink: 0, marginTop: '2px' }} />
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '14.5px' }}>{formatText(flow)}</p>
      </div>
    );
  }
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        background: 'var(--bg-primary)', border: '1px solid var(--border-glass)',
        borderRadius: '14px', padding: '24px 20px', marginBottom: '28px',
        backgroundImage: 'radial-gradient(circle, var(--border-glass) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      {stages.map((stage, i) => {
        const isFork = !!stage.branches && stage.branches.length > 1;
        return (
          <React.Fragment key={i}>
            {isFork ? <ForkGroup stage={stage} index={i} /> : <StageBox label={stage.label} index={i} />}
            {i < stages.length - 1 && <Connector />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Standard section header — keeps every premium section visually consistent
// and (critically) exposes an <h2> so the auto-TOC can label the section.
const PremiumSectionHeader: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', margin: '0 0 20px 0', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.02em' }}>
    {icon} {title}
  </h2>
);

// Expandable "deep dive" sub-topic: title always visible, full explanation on
// expand. This is how the previously-hidden nested concepts become mini-lessons.
const DeepDiveItem: React.FC<{ title: string; body: string; sub?: string }> = ({ title, body, sub }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: '1px solid var(--border-glass)', borderRadius: '10px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '14px 16px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'inherit', textAlign: 'left' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, fontSize: '15px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#8b5cf6', flexShrink: 0 }} />
          {title}
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <div style={{ padding: '0 16px 16px 33px' }}>
          {sub && <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '6px' }}>{sub}</div>}
          <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '14.5px', whiteSpace: 'pre-wrap' }}>{formatText(body)}</p>
        </div>
      )}
    </div>
  );
};

interface PremiumTopicRendererProps {
  data: PremiumTopicData;
  topicId?: string;
}

export const PremiumTopicRenderer: React.FC<PremiumTopicRendererProps> = ({ data, topicId }) => {
  const { coreConcept, industryUseCases, comparisonSection } = data;
  const rootRef = useRef<HTMLDivElement>(null);

  if (!coreConcept) return null;

  return (
    <div ref={rootRef} className="premium-content-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: '"Outfit", sans-serif' }}>



      {/* Overview Section */}
      <section className="glass-panel premium-section">
        <h2 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          color: 'var(--text-primary)', 
          margin: '0 0 20px 0',
          fontSize: '22px',
          fontWeight: 600,
          letterSpacing: '-0.02em'
        }}>
          <Book size={22} style={{ color: '#3b82f6' }} /> 
          Topic Overview
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {coreConcept.overview?.map((para, i) => (
            <p key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '15px', margin: 0 }}>{formatText(para)}</p>
          ))}
        </div>
        
        {coreConcept.formalDefinition && (
          <div style={{ 
            marginTop: '28px', 
            padding: '20px', 
            background: 'var(--bg-secondary)', 
            borderRadius: '8px', 
            borderLeft: '4px solid #3b82f6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', margin: '0 0 8px 0', fontWeight: 600 }}>Formal Definition</h3>
            <p style={{ color: 'var(--text-primary)', fontStyle: 'italic', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>"{formatText(coreConcept.formalDefinition)}"</p>
          </div>
        )}
      </section>

      {/* Why it Matters */}
      <section className="glass-panel premium-section">
        <h2 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          color: 'var(--text-primary)', 
          margin: '0 0 20px 0',
          fontSize: '22px',
          fontWeight: 600,
          letterSpacing: '-0.02em'
        }}>
          <Activity size={22} style={{ color: '#10b981' }} /> 
          Why It Matters
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {coreConcept.whyItMatters && Object.entries(coreConcept.whyItMatters).map(([key, value]) => (
            <div key={key} style={{ 
              background: 'var(--bg-secondary)', 
              padding: '20px', 
              borderRadius: '8px',
              borderTop: '3px solid #10b981'
            }}>
              <strong style={{ 
                display: 'block', 
                marginBottom: '10px', 
                color: 'var(--text-primary)', 
                textTransform: 'capitalize',
                fontSize: '15px',
                fontWeight: 600
              }}>
                {key} Impact
              </strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{formatText(value as string)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Context & Analogy */}
      {(coreConcept.historicalContext || coreConcept.realWorldAnalogy) && (
        <section className="glass-panel premium-section">
          <PremiumSectionHeader icon={<Book size={22} style={{ color: '#3b82f6' }} />} title="Context & Analogy" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {coreConcept.historicalContext && (
              <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: '10px', borderTop: '3px solid #3b82f6' }}>
                <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>Historical Context</strong>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '14.5px' }}>{formatText(coreConcept.historicalContext)}</p>
              </div>
            )}
            {coreConcept.realWorldAnalogy && (
              <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: '10px', borderTop: '3px solid #10b981' }}>
                <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>Real-World Analogy</strong>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '14.5px' }}>{formatText(coreConcept.realWorldAnalogy)}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* How It Works Internally */}
      {coreConcept.internalWorking && coreConcept.internalWorking.length > 0 && (
        <section className="glass-panel premium-section">
          <PremiumSectionHeader icon={<Cpu size={22} style={{ color: '#06b6d4' }} />} title="How It Works Internally" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {coreConcept.internalWorking.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', background: 'var(--bg-secondary)', padding: '14px 16px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                <span style={{ flexShrink: 0, width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(6,182,212,0.14)', color: '#06b6d4', fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '14.5px' }}>{formatText(step)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Concepts — Deep Dive (nested sub-topics, expandable) */}
      {coreConcept.importantConcepts && coreConcept.importantConcepts.length > 0 && (
        <section className="glass-panel premium-section">
          <PremiumSectionHeader icon={<Layers size={22} style={{ color: '#8b5cf6' }} />} title="Key Concepts — Deep Dive" />
          <p style={{ margin: '0 0 14px 0', color: 'var(--text-muted)', fontSize: '13px' }}>Expand each concept for a detailed explanation.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {coreConcept.importantConcepts.map((c, i) => (
              <DeepDiveItem key={i} title={c.concept} body={c.explanation} />
            ))}
          </div>
        </section>
      )}

      {/* Key Terminology */}
      {coreConcept.keyTerminology && coreConcept.keyTerminology.length > 0 && (
        <section className="glass-panel premium-section">
          <PremiumSectionHeader icon={<Book size={22} style={{ color: '#3b82f6' }} />} title="Key Terminology" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {coreConcept.keyTerminology.map((t, i) => (
              <div key={i} style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>{t.term}</strong>
                <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{formatText(t.meaning)}</p>
                {t.importance && <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)', fontSize: '12.5px', lineHeight: 1.55 }}><strong style={{ color: '#f59e0b' }}>Why it matters:</strong> {formatText(t.importance)}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Variations & Types */}
      {coreConcept.variationsAndTypes && coreConcept.variationsAndTypes.length > 0 && (
        <section className="glass-panel premium-section">
          <PremiumSectionHeader icon={<GitFork size={22} style={{ color: '#f59e0b' }} />} title="Variations & Types" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {coreConcept.variationsAndTypes.map((v, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'var(--bg-secondary)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                <CircleDot size={16} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '14.5px' }}>{formatText(v)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Advantages, Limitations & Trade-offs */}
      {(coreConcept.advantages?.length || coreConcept.disadvantages?.length || coreConcept.tradeOffs) && (
        <section className="glass-panel premium-section">
          <PremiumSectionHeader icon={<Scale size={22} style={{ color: '#10b981' }} />} title="Advantages, Limitations & Trade-offs" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {coreConcept.advantages?.length > 0 && (
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px', borderTop: '3px solid #10b981' }}>
                <strong style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '10px' }}><CheckCircle2 size={15} /> Advantages</strong>
                <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>{coreConcept.advantages.map((a, i) => <li key={i}>{formatText(a)}</li>)}</ul>
              </div>
            )}
            {coreConcept.disadvantages?.length > 0 && (
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px', borderTop: '3px solid #ef4444' }}>
                <strong style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '10px' }}><AlertTriangle size={15} /> Limitations</strong>
                <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>{coreConcept.disadvantages.map((a, i) => <li key={i}>{formatText(a)}</li>)}</ul>
              </div>
            )}
          </div>
          {coreConcept.tradeOffs && (coreConcept.tradeOffs.whenToUse || coreConcept.tradeOffs.whenToAvoid) && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '16px' }}>
              {coreConcept.tradeOffs.whenToUse && (
                <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.28)', padding: '14px 16px', borderRadius: '10px' }}>
                  <strong style={{ color: '#10b981', fontSize: '13px' }}>When to use</strong>
                  <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{formatText(coreConcept.tradeOffs.whenToUse)}</p>
                </div>
              )}
              {coreConcept.tradeOffs.whenToAvoid && (
                <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.28)', padding: '14px 16px', borderRadius: '10px' }}>
                  <strong style={{ color: '#ef4444', fontSize: '13px' }}>When to avoid</strong>
                  <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{formatText(coreConcept.tradeOffs.whenToAvoid)}</p>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Common Misconceptions */}
      {coreConcept.commonMisconceptions && coreConcept.commonMisconceptions.length > 0 && (
        <section className="glass-panel premium-section">
          <PremiumSectionHeader icon={<AlertTriangle size={22} style={{ color: '#ef4444' }} />} title="Common Misconceptions" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {coreConcept.commonMisconceptions.map((m, i) => (
              <div key={i} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', borderLeft: '3px solid #ef4444', borderRadius: '10px', padding: '14px 16px' }}>
                <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>Myth: {formatText(m.myth)}</div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.65 }}><strong style={{ color: '#10b981' }}>Reality:</strong> {formatText(m.reality)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Core Components */}
      <section className="glass-panel premium-section">
        <h2 style={{
          display: 'flex',
          alignItems: 'center', 
          gap: '10px', 
          color: 'var(--text-primary)', 
          margin: '0 0 20px 0',
          fontSize: '22px',
          fontWeight: 600,
          letterSpacing: '-0.02em'
        }}>
          <Server size={22} style={{ color: '#a855f7' }} /> 
          Core Components
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {coreConcept.coreComponents?.map((comp, i) => (
            <div key={i} className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '17px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#a855f7" />
                {comp.name}
              </h3>
              <div style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{formatText(comp.definition)}</p>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px', padding: '12px 0', borderTop: '1px solid var(--border-glass)' }}>
                    <div style={{ flex: '0 0 120px', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, paddingTop: '2px' }}>Purpose</div>
                    <div style={{ flex: '1 1 200px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{formatText(comp.purpose)}</div>
                  </div>
                  
                  {comp.responsibilities && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px', padding: '12px 0', borderTop: '1px solid var(--border-glass)' }}>
                      <div style={{ flex: '0 0 120px', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, paddingTop: '2px' }}>Responsibilities</div>
                      <div style={{ flex: '1 1 200px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{formatText(comp.responsibilities)}</div>
                    </div>
                  )}
                  
                  {comp.examples && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px', padding: '12px 0', borderTop: '1px solid var(--border-glass)' }}>
                      <div style={{ flex: '0 0 120px', fontSize: '12px', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, paddingTop: '2px' }}>Examples</div>
                      <div style={{ flex: '1 1 200px', fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>{formatText(comp.examples)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Flow */}
      <section className="glass-panel premium-section">
        <h2 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          color: 'var(--text-primary)', 
          margin: '0 0 20px 0',
          fontSize: '22px',
          fontWeight: 600,
          letterSpacing: '-0.02em'
        }}>
          <GitBranch size={22} style={{ color: '#f59e0b' }} /> 
          Architecture & Data Flow
        </h2>
        
        <TopicDiagram
          topicId={topicId}
          fallback={coreConcept.architectureFlow ? <ArchitectureFlow flow={coreConcept.architectureFlow} /> : null}
        />
        
        <div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Step-by-Step Execution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {coreConcept.dataFlowWalkthrough?.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                <div style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  background: 'var(--bg-primary)', border: '1px solid #f59e0b',
                  color: '#f59e0b', width: '24px', height: '24px', borderRadius: '50%', fontSize: '13px', fontWeight: 'bold', flexShrink: 0
                }}>
                  {i + 1}
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontSize: '14.5px' }}>{formatText(step)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      {industryUseCases && industryUseCases.length > 0 && (
        <section className="glass-panel premium-section">
          <h2 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            color: 'var(--text-primary)', 
            margin: '0 0 20px 0',
            fontSize: '22px',
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: 'var(--bg-primary)' }}>
              <Activity size={20} style={{ color: '#10b981' }} /> 
            </div>
            Industry Implementations
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {industryUseCases.map((uc, i) => (
              <div key={i} style={{ 
                background: 'var(--bg-secondary)', 
                padding: '24px', 
                borderRadius: '12px', 
                border: '1px solid var(--border-glass)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '16px', letterSpacing: '0.01em' }}>
                    {uc.company}
                  </strong>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', borderLeft: '2px solid var(--border-glass)' }}>
                    <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '4px' }}>The Challenge</strong>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{formatText(uc.problem)}</p>
                  </div>
                  
                  <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', borderLeft: '2px solid #3b82f6' }}>
                    <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '4px' }}>The Solution</strong>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{formatText(uc.solution)}</p>
                  </div>
                  
                  <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', borderLeft: '2px solid #10b981' }}>
                    <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.05em', marginBottom: '4px' }}>Business Impact</strong>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.5 }}>{formatText(uc.benefits)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Comparison Section */}
      {comparisonSection && comparisonSection.length > 0 && (
        <section className="glass-panel premium-section">
          <h2 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            color: 'var(--text-primary)', 
            margin: '0 0 20px 0',
            fontSize: '22px',
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: 'var(--bg-primary)' }}>
              <GitBranch size={20} style={{ color: '#f59e0b' }} /> 
            </div>
            Comparative Analysis
          </h2>
          <div style={{ overflowX: 'auto', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-glass)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '18px 24px', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '0.02em', width: '18%' }}>Dimension</th>
                  <th style={{ padding: '18px 24px', color: '#60a5fa', fontWeight: 600, letterSpacing: '0.02em', width: '27%' }}>Option A</th>
                  <th style={{ padding: '18px 24px', color: '#c084fc', fontWeight: 600, letterSpacing: '0.02em', width: '27%' }}>Option B</th>
                  <th style={{ padding: '18px 24px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.02em' }}>Context</th>
                </tr>
              </thead>
              <tbody>
                {comparisonSection.map((comp, i) => (
                  <tr key={i} style={{ 
                    borderBottom: i === comparisonSection.length - 1 ? 'none' : '1px solid var(--border-glass)',
                    background: i % 2 === 0 ? 'transparent' : 'var(--bg-primary)',
                    transition: 'background 0.2s ease',
                  }}>
                    <td style={{ padding: '20px 24px', color: 'var(--text-primary)', fontWeight: 500, verticalAlign: 'top' }}>{comp.feature}</td>
                    <td style={{ padding: '20px 24px', color: 'var(--text-secondary)', verticalAlign: 'top', lineHeight: 1.6 }}>{formatText(comp.optionA)}</td>
                    <td style={{ padding: '20px 24px', color: 'var(--text-secondary)', verticalAlign: 'top', lineHeight: 1.6 }}>{formatText(comp.optionB)}</td>
                    <td style={{ padding: '20px 24px', color: 'var(--text-muted)', fontSize: '13px', verticalAlign: 'top', lineHeight: 1.6, fontStyle: 'italic' }}>{formatText(comp.explanation)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </div>
  );
};
