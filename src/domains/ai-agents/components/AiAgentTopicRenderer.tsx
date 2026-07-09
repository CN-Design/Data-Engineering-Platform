import React, { useState, useEffect } from 'react';
import type {
  AgentTopicData, AgentSectionId, AgentFoundations, AgentExample,
  AgentCodeLabExercise, AgentDebuggingExercise, AgentInterviewSection, AgentProductionDeepDive, AgentSubtopic,
} from '../../../core/types/aiagents';
import { AGENT_SECTIONS } from '../../../core/types/aiagents';
import type { BackendTopicData, Checkpoint } from '../../../core/types/backend';
import type { ConceptualInterviewQuestion, CodingInterviewQuestion, ExplainerScript } from '../../../core/types/types';
import { AGENT_WIDGETS } from '../widgets/registry';
import { PyCodeBlock } from './PyCodeBlock';
import { CheckpointWidget } from '../../backend-engineering/components/Checkpoint';
import { BackendSelfCheck } from '../../backend-engineering/components/BackendSelfCheck';
import { ExplainerPlayer } from '../../data-engineering/components/ExplainerPlayer';
import { getMastery, setLastTopic } from '../../data-engineering/utils/learnProgress';
import { formatText } from '../../../core/utils/textFormatting';
import '../../backend-engineering/backend.css';
import './aiagents.css';
import {
  BookOpen, Sparkles, Code2, Brain, FlaskConical, Bug, GraduationCap, Server, ListChecks, PlayCircle,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle2, Lightbulb,
} from 'lucide-react';

const ACC = '#8b5cf6';
const SECTION_ICON: Record<AgentSectionId, any> = {
  foundations: BookOpen, interactiveWidget: Sparkles, interactiveExamples: Code2, checkpoints: Brain,
  codeLab: FlaskConical, debuggingLab: Bug, interviewPrep: GraduationCap, productionDeepDive: Server,
};

const Prose: React.FC<{ children?: string }> = ({ children }) =>
  children ? <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{formatText(children)}</p> : null;
const Field: React.FC<{ label: string; value?: string; color?: string }> = ({ label, value, color = 'var(--text-primary)' }) =>
  value ? (<div className="be-field" style={{ borderLeftColor: color }}><div className="be-field-label" style={{ color }}>{label}</div><p className="be-field-body">{formatText(value)}</p></div>) : null;
const Facet: React.FC<{ label: string; value?: string; accent?: string }> = ({ label, value, accent }) =>
  value ? (<div className="be-facet" style={accent ? { borderTop: `2px solid ${accent}` } : undefined}><div className="be-facet-label">{label}</div><p className="be-facet-body">{formatText(value)}</p></div>) : null;

const SubtopicItem: React.FC<{ s: AgentSubtopic }> = ({ s }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="be-sub">
      <button className="be-sub-head" onClick={() => setOpen(o => !o)}>
        <span className="be-sub-title">{s.title}</span>{open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && (
        <div className="be-sub-body">
          <p className="be-field-body" style={{ margin: 0 }}>{formatText(s.explanation)}</p>
          {s.example && <div className="be-code" style={{ marginBottom: 0 }}><pre><code>{s.example}</code></pre></div>}
        </div>
      )}
    </div>
  );
};

const Foundations: React.FC<{ data: AgentFoundations; subtopics?: AgentSubtopic[] }> = ({ data, subtopics }) => (
  <div>
    {data.overview && <p className="be-lead">{formatText(data.overview)}</p>}
    {subtopics && subtopics.length > 0 && (
      <div className="be-subsection" style={{ marginTop: 0, marginBottom: 20 }}>
        <p className="be-block-title" style={{ color: ACC }}>Core Sub-topics — Explained</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{subtopics.map((s, i) => <SubtopicItem key={i} s={s} />)}</div>
      </div>
    )}
    <div className="be-grid">
      <Facet label="Definition" value={data.formalDefinition} accent={ACC} />
      <Facet label="Why It Matters" value={data.whyItMatters} accent={ACC} />
      <Facet label="Mental Model" value={data.mentalModel} accent="#10b981" />
      <Facet label="How It's Used" value={data.realWorldUsage} accent="#0ea5e9" />
      <Facet label="Performance / Cost" value={data.performanceImpact} accent="#f59e0b" />
      <Facet label="Engineering Impact" value={data.engineeringImpact} />
      <Facet label="Business Impact" value={data.businessImpact} />
    </div>
    {data.commonUseCases && data.commonUseCases.length > 0 && (
      <div className="be-subsection"><p className="be-block-title">Common Use Cases</p>
        <div className="be-usecases">{data.commonUseCases.map((u, i) => <span key={i} className="be-usecase">{formatText(u)}</span>)}</div></div>
    )}
    {data.commonMisconceptions && data.commonMisconceptions.length > 0 && (
      <div className="be-subsection"><p className="be-block-title" style={{ color: '#ef4444' }}>Common Misconceptions</p>
        {data.commonMisconceptions.map((m, i) => (<div key={i} className="be-callout myth"><div className="be-callout-title">Myth: {m.myth}</div><p className="be-field-body" style={{ margin: 0 }}>{formatText(`Reality: ${m.reality}`)}</p></div>))}</div>
    )}
  </div>
);

const LEVEL_COLOR: Record<string, string> = { beginner: '#10b981', intermediate: '#f59e0b', advanced: '#ef4444', production: '#a855f7' };
const InteractiveExamples: React.FC<{ items: AgentExample[]; theme: 'dark' | 'light' }> = ({ items, theme }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    {items.map((ex, i) => (
      <div key={i} style={{ border: '1px solid var(--border-glass)', borderRadius: 10, padding: 14, background: 'var(--bg-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#fff', background: LEVEL_COLOR[ex.level] || ACC, padding: '2px 8px', borderRadius: 6 }}>{ex.level}</span>
          <strong style={{ color: 'var(--text-primary)' }}>{ex.title}</strong>
        </div>
        <Prose>{ex.explanation}</Prose>
        <div style={{ marginTop: 10 }}><PyCodeBlock block={ex.code} theme={theme} title={ex.title} /></div>
      </div>
    ))}
  </div>
);

const CodeLab: React.FC<{ items: AgentCodeLabExercise[]; theme: 'dark' | 'light' }> = ({ items, theme }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    {items.map(ex => <CodeLabCard key={ex.id} ex={ex} theme={theme} />)}
  </div>
);
const CodeLabCard: React.FC<{ ex: AgentCodeLabExercise; theme: 'dark' | 'light' }> = ({ ex, theme }) => {
  const [hints, setHints] = useState(0);
  return (
    <div style={{ border: '1px solid var(--border-glass)', borderRadius: 10, padding: 14, background: 'var(--bg-secondary)' }}>
      <strong style={{ color: 'var(--text-primary)' }}>{ex.title}</strong>
      <Prose>{ex.instructions}</Prose>
      <div style={{ marginTop: 10 }}><PyCodeBlock block={{ ...ex.starter, editable: true, solution: ex.solution.code }} theme={theme} title="Your code — edit & reveal" /></div>
      {ex.testHarness && <div className="be-code" style={{ marginTop: 12 }}><div className="be-code-bar"><span className="be-code-tag"><FlaskConical size={13} /> test</span></div><pre><code>{ex.testHarness}</code></pre></div>}
      {ex.hints?.length > 0 && hints < ex.hints.length && (
        <button className="be-btn" style={{ marginTop: 12 }} onClick={() => setHints(n => n + 1)}><Lightbulb size={13} /> Hint ({hints + 1}/{ex.hints.length})</button>
      )}
      {hints > 0 && <ul style={{ margin: '10px 0 0 0', paddingLeft: 18, color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.6 }}>{ex.hints.slice(0, hints).map((h, i) => <li key={i}>{formatText(h)}</li>)}</ul>}
    </div>
  );
};

const DebuggingLab: React.FC<{ items: AgentDebuggingExercise[]; theme: 'dark' | 'light' }> = ({ items, theme }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    {items.map(ex => <DebugCard key={ex.id} ex={ex} theme={theme} />)}
  </div>
);
const DebugCard: React.FC<{ ex: AgentDebuggingExercise; theme: 'dark' | 'light' }> = ({ ex, theme }) => {
  const [showFix, setShowFix] = useState(false);
  return (
    <div style={{ border: '1px solid var(--border-glass)', borderRadius: 10, padding: 14, background: 'var(--bg-secondary)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Bug size={16} color="#ef4444" /><strong style={{ color: 'var(--text-primary)' }}>{ex.title}</strong><span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{ex.difficulty}</span></div>
      <Prose>{`Symptom: ${ex.symptom}`}</Prose>
      <div style={{ marginTop: 10 }}><PyCodeBlock block={ex.brokenCode} theme={theme} title="Buggy code" /></div>
      <Field label="Error Analysis" value={ex.errorAnalysis} color="#ef4444" />
      {ex.commonMistakes?.length > 0 && <ul style={{ margin: '0 0 10px 0', paddingLeft: 18, color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.6 }}>{ex.commonMistakes.map((m, i) => <li key={i}>{formatText(m)}</li>)}</ul>}
      <Prose>{ex.fixChallenge}</Prose>
      <button className="be-btn" style={{ marginTop: 10 }} onClick={() => setShowFix(s => !s)}>{showFix ? 'Hide fix' : 'Show fix'}</button>
      {showFix && <div style={{ marginTop: 12 }}><PyCodeBlock block={ex.solution} theme={theme} title="Fixed code" /></div>}
    </div>
  );
};

const ConceptualCard: React.FC<{ q: ConceptualInterviewQuestion }> = ({ q }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 14, borderRadius: 10, border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)' }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, cursor: 'pointer' }}>
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{q.question}</span>{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {open && (<div style={{ marginTop: 12, borderTop: '1px solid var(--border-glass)', paddingTop: 12 }}>
        <Field label="Direct Answer" value={q.directAnswer} color={ACC} />
        {q.detailedExplanation && (<><Field label="What It Is" value={q.detailedExplanation.whatItIs} /><Field label="Why It Exists" value={q.detailedExplanation.whyItExists} /><Field label="How It Works" value={q.detailedExplanation.howItWorks} /></>)}
        <Field label="Why It Matters" value={q.whyImportant} />
        <Field label="Real-World Example" value={q.realWorldExample} color="#10b981" />
        {q.followUps?.length > 0 && q.followUps.map((f, i) => (<div key={i} style={{ marginTop: 8 }}><span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Q: {f.question}</span><Prose>{f.answer}</Prose></div>))}
      </div>)}
    </div>
  );
};
const CodingCard: React.FC<{ q: CodingInterviewQuestion }> = ({ q }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 14, borderRadius: 10, border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)' }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, cursor: 'pointer' }}>
        <span style={{ display: 'flex', gap: 8, alignItems: 'center', fontWeight: 600, color: 'var(--text-primary)' }}><Code2 size={15} color={ACC} /> {q.question}</span>{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {open && (<div style={{ marginTop: 12, borderTop: '1px solid var(--border-glass)', paddingTop: 12 }}>
        <Field label="Thought Process" value={q.thoughtProcess} color={ACC} />
        {q.solution?.code && <div className="be-code"><pre><code>{q.solution.code}</code></pre></div>}
        <Field label="Line-by-Line" value={q.lineByLine} />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}><Field label="Time" value={q.timeComplexity} color="#f59e0b" /><Field label="Space" value={q.spaceComplexity} color="#f59e0b" /></div>
      </div>)}
    </div>
  );
};
const InterviewEmbedded: React.FC<{ data: AgentInterviewSection }> = ({ data }) => {
  const groups: Array<{ label: string; qs?: ConceptualInterviewQuestion[]; coding?: CodingInterviewQuestion[] }> = [
    { label: 'Theory', qs: data.theory }, { label: 'Scenario', qs: data.scenario }, { label: 'System Design', qs: data.systemDesign }, { label: 'Coding', coding: data.coding },
  ];
  return (<div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
    {groups.map(g => { const items = g.qs || g.coding; if (!items || items.length === 0) return null;
      return (<div key={g.label}><h4 style={{ margin: '0 0 10px 0', color: 'var(--text-primary)', borderBottom: `2px solid ${ACC}`, paddingBottom: 6, display: 'inline-block' }}>{g.label}</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{g.qs?.map(q => <ConceptualCard key={q.id} q={q} />)}{g.coding?.map(q => <CodingCard key={q.id} q={q} />)}</div></div>); })}
  </div>);
};

const ProductionDeepDive: React.FC<{ data: AgentProductionDeepDive }> = ({ data }) => (
  <div>
    <Field label="Architecture" value={data.architecture} color={ACC} />
    <Field label="Performance / Latency" value={data.performance} color="#f59e0b" />
    <Field label="Reliability" value={data.reliability} />
    <Field label="Observability" value={data.observability} color="#0ea5e9" />
    <Field label="Security" value={data.security} color="#ef4444" />
    <Field label="Cost" value={data.cost} color="#10b981" />
    {data.caseStudies?.length > 0 && (<div><strong style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.4 }}>Case Studies</strong>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>{data.caseStudies.map((c, i) => (<div key={i} style={{ padding: 12, borderRadius: 8, background: 'var(--bg-inner)', border: '1px solid var(--border-glass)' }}><strong style={{ color: ACC }}>{c.company}</strong><Prose>{`Problem: ${c.problem}`}</Prose><Prose>{`Solution: ${c.solution}`}</Prose><Prose>{`Tradeoffs: ${c.tradeoffs}`}</Prose><Prose>{`Lessons: ${c.lessons}`}</Prose></div>))}</div></div>)}
  </div>
);

const DIFF_PILL: Record<string, { bg: string; color: string }> = {
  beginner: { bg: 'rgba(16,185,129,0.15)', color: '#10b981' }, intermediate: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' }, advanced: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
};
const ChipRow: React.FC<{ label: string; items?: string[]; core?: boolean }> = ({ label, items, core }) =>
  !items || items.length === 0 ? null : (<div className="be-chip-row"><span className="be-chip-label">{label}</span>{items.map((c, i) => <span key={i} className={`be-chip${core ? ' core' : ''}`}>{c}</span>)}</div>);
const NavChipRow: React.FC<{ label: string; items?: string[]; navMap: Record<string, string>; onNavigate?: (id: string) => void }> = ({ label, items, navMap, onNavigate }) =>
  !items || items.length === 0 ? null : (<div className="be-chip-row"><span className="be-chip-label">{label}</span>{items.map((id, i) => { const t = navMap[id]; return t && onNavigate ? <button key={i} className="be-chip be-chip-link" onClick={() => onNavigate(id)}>{t} →</button> : <span key={i} className="be-chip">{id}</span>; })}</div>);

interface Props {
  data: AgentTopicData;
  topics?: Array<{ id: string; title: string }>;
  onNavigate?: (id: string) => void;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  prevTitle?: string;
  nextTitle?: string;
  theme?: 'dark' | 'light';
  explainer?: ExplainerScript | null;
}

export const AiAgentTopicRenderer: React.FC<Props> = ({ data, topics = [], onNavigate, isCompleted, onToggleComplete, onPrev, onNext, prevTitle, nextTitle, theme = 'dark', explainer }) => {
  const navMap = Object.fromEntries(topics.map(t => [t.id, t.title])) as Record<string, string>;
  const available = AGENT_SECTIONS.filter(s => { const v = (data as any)[s.id]; return v && (Array.isArray(v) ? v.length > 0 : true); });

  const ip = data.interviewPrep;
  const selfCheckN = (ip?.theory?.length || 0) + (ip?.scenario?.length || 0) + (ip?.systemDesign?.length || 0) + (ip?.coding?.length || 0)
    + (data.foundations?.commonMisconceptions?.length || 0) + (data.subtopics?.length || 0);
  const hasSelfCheck = selfCheckN > 0;

  type NavId = AgentSectionId | 'selfCheck' | 'explainer';
  const navItems: Array<{ id: NavId; label: string; description: string; Icon: any }> = [
    ...(explainer ? [{ id: 'explainer' as NavId, label: 'Explainer', description: 'Watch a short animated, narrated explainer', Icon: PlayCircle }] : []),
    ...available.map(s => ({ id: s.id as NavId, label: s.label, description: s.description, Icon: SECTION_ICON[s.id] })),
    ...(hasSelfCheck ? [{ id: 'selfCheck' as NavId, label: 'Self-Check', description: 'Rate your recall & schedule spaced reviews', Icon: ListChecks }] : []),
  ];
  const [active, setActive] = useState<NavId>('foundations');
  const [mastery, setMasteryState] = useState<number>(() => getMastery(data.id));

  useEffect(() => {
    setLastTopic(data.id); setMasteryState(getMastery(data.id));
    if (!navItems.some(n => n.id === active)) setActive(navItems[0]?.id || 'foundations');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.id]);

  const renderSection = () => {
    switch (active) {
      case 'foundations': return <Foundations data={data.foundations} subtopics={data.subtopics} />;
      case 'interactiveWidget': {
        if (!data.interactiveWidget) return null;
        const W = AGENT_WIDGETS[data.interactiveWidget.widgetId] || AGENT_WIDGETS['note'];
        return (<div><h4 style={{ margin: '0 0 4px 0', color: 'var(--text-primary)' }}>{data.interactiveWidget.title}</h4>{data.interactiveWidget.caption && <Prose>{data.interactiveWidget.caption}</Prose>}<div style={{ marginTop: 10 }}><W config={data.interactiveWidget.config} /></div></div>);
      }
      case 'interactiveExamples': return data.interactiveExamples ? <InteractiveExamples items={data.interactiveExamples} theme={theme} /> : null;
      case 'checkpoints': return data.checkpoints ? <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{(data.checkpoints as Checkpoint[]).map((cp, i) => <CheckpointWidget key={i} cp={cp} />)}</div> : null;
      case 'codeLab': return data.codeLab ? <CodeLab items={data.codeLab} theme={theme} /> : null;
      case 'debuggingLab': return data.debuggingLab ? <DebuggingLab items={data.debuggingLab} theme={theme} /> : null;
      case 'interviewPrep': return data.interviewPrep ? <InterviewEmbedded data={data.interviewPrep} /> : null;
      case 'productionDeepDive': return data.productionDeepDive ? <ProductionDeepDive data={data.productionDeepDive} /> : null;
      case 'selfCheck': return <BackendSelfCheck topicId={data.id} data={data as unknown as BackendTopicData} onMasteryChange={setMasteryState} />;
      case 'explainer': return explainer ? <ExplainerPlayer script={explainer} /> : null;
      default: return null;
    }
  };

  const diff = DIFF_PILL[data.difficulty] || DIFF_PILL.beginner;
  const activeMeta = navItems.find(s => s.id === active);
  const ActiveIcon = activeMeta?.Icon || BookOpen;

  return (
    <div className="be-root ai-root">
      <header className="be-header">
        <div className="be-title-row">
          <h1 className="be-title">{data.title}</h1>
          <span className="be-pill" style={{ background: diff.bg, color: diff.color }}>{data.difficulty}</span>
          <span className="be-pill ai-archetype">{data.archetype}</span>
          {hasSelfCheck && (
            <span title="Mastery from Self-Check" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
              <ListChecks size={14} color={mastery >= 80 ? '#10b981' : ACC} />
              <span style={{ width: 90, height: 6, borderRadius: 999, background: 'var(--bg-inner)', overflow: 'hidden', display: 'inline-block' }}><span style={{ display: 'block', width: `${mastery}%`, height: '100%', background: mastery >= 80 ? '#10b981' : 'linear-gradient(90deg,#8b5cf6,#ec4899)' }} /></span>{mastery}% mastery
            </span>
          )}
        </div>
        {data.summary && <p className="be-summary">{formatText(data.summary)}</p>}
        <div className="be-chips">
          <NavChipRow label="Prerequisites" items={data.prerequisites} navMap={navMap} onNavigate={onNavigate} />
          <ChipRow label="Core sub-topics" items={data.nestedConcepts} core />
          <NavChipRow label="Related" items={data.relatedConcepts} navMap={navMap} onNavigate={onNavigate} />
        </div>
      </header>

      <nav className="be-nav" role="tablist" aria-label="Lesson sections">
        {navItems.map((s, i) => {
          const Icon = s.Icon; const selected = s.id === active;
          return (
            <button key={s.id} id={`ai-tab-${s.id}`} role="tab" aria-selected={selected} aria-controls="ai-tabpanel" tabIndex={selected ? 0 : -1}
              onClick={() => setActive(s.id)}
              onKeyDown={(e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const d = e.key === 'ArrowRight' ? 1 : -1; const n = navItems[(i + d + navItems.length) % navItems.length]; setActive(n.id); requestAnimationFrame(() => document.getElementById(`ai-tab-${n.id}`)?.focus()); } }}
              title={s.description} className={`be-nav-btn${selected ? ' active' : ''}`}><Icon size={15} aria-hidden="true" /> {s.label}</button>
          );
        })}
      </nav>

      <section className="be-panel" id="ai-tabpanel" role="tabpanel" aria-labelledby={`ai-tab-${active}`} tabIndex={0}>
        <div className="be-panel-head"><div className="be-panel-icon"><ActiveIcon size={20} aria-hidden="true" /></div><div><h2 className="be-panel-title">{activeMeta?.label}</h2><p className="be-panel-desc">{activeMeta?.description}</p></div></div>
        <div className="be-panel-body animate-fade-in" key={active}>{renderSection()}</div>
      </section>

      {data.keyTakeaways?.length > 0 && (
        <div className="be-takeaways"><p className="be-block-title" style={{ color: ACC }}>Key Takeaways</p>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{data.keyTakeaways.map((k, i) => <li key={i}>{formatText(k)}</li>)}</ul></div>
      )}

      {(onPrev || onNext || onToggleComplete) && (
        <div className="be-footer">
          <div className="be-footer-side">{onPrev && <button className="be-foot-btn" onClick={onPrev}><ChevronLeft size={16} /><span className="be-foot-label">{prevTitle || 'Previous'}</span></button>}</div>
          {onToggleComplete && <button className={`be-complete-btn${isCompleted ? ' done' : ''}`} onClick={onToggleComplete}><CheckCircle2 size={16} /> {isCompleted ? 'Completed' : 'Mark complete'}</button>}
          <div className="be-footer-side be-footer-right">{onNext && <button className="be-foot-btn" onClick={onNext}><span className="be-foot-label">{nextTitle || 'Next'}</span><ChevronRight size={16} /></button>}</div>
        </div>
      )}
    </div>
  );
};
