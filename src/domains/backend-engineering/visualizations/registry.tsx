import React from 'react';

// ============================================================
// Backend (Go) visualization registry
// JSON references a visualization by `visualId`; the component lives here
// and receives `config` as props. Theme-consistent (CSS variables).
// ============================================================

export interface VisualizationProps {
  config?: Record<string, unknown>;
}

const card: React.CSSProperties = {
  border: '1px solid var(--border-glass)',
  borderRadius: '10px',
  padding: '16px',
  background: 'var(--bg-inner)',
};
const box: React.CSSProperties = {
  border: '1px solid var(--border-glass)',
  borderRadius: '8px',
  padding: '10px 12px',
  background: 'var(--bg-secondary)',
  fontSize: '13px',
  color: 'var(--text-primary)',
  textAlign: 'center',
};
const label: React.CSSProperties = { fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '8px' };
const ACC = '#00ADD8';

// Generic, config-driven stepped explainer (the universal fallback).
const ConceptSteps: React.FC<VisualizationProps> = ({ config }) => {
  const intro = (config?.intro as string) || '';
  const steps = (config?.steps as Array<{ name: string; detail: string }>) || [];
  return (
    <div style={card}>
      {intro && <p style={{ margin: '0 0 14px 0', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{intro}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '26px', height: '26px', borderRadius: '999px', background: `${ACC}22`, color: ACC, fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '14px' }}>{s.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: 1.6, marginTop: '2px' }}>{s.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// GMP scheduler: Goroutines -> P (run queues) -> M (OS threads) -> CPU cores.
const GoGMP: React.FC<VisualizationProps> = () => (
  <div style={card}>
    <div style={label}>Go Scheduler — G · M · P</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
      <div>
        <div style={{ ...label, color: ACC }}>Goroutines (G)</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {['G', 'G', 'G', 'G', 'G', 'G'].map((g, i) => <span key={i} style={{ ...box, padding: '4px 8px', fontSize: '12px' }}>{g}{i + 1}</span>)}
        </div>
        <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '6px' }}>~2KB growable stacks, cheap to create</div>
      </div>
      <div>
        <div style={{ ...label, color: ACC }}>Processors (P)</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['P0', 'P1'].map(p => <div key={p} style={{ ...box, flex: 1 }}>{p}<div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>run queue</div></div>)}
        </div>
        <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '6px' }}>count = GOMAXPROCS</div>
      </div>
      <div>
        <div style={{ ...label, color: ACC }}>Threads (M) → CPU</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['M0', 'M1'].map(m => <div key={m} style={{ ...box, flex: 1 }}>{m}<div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>OS thread</div></div>)}
        </div>
        <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '6px' }}>blocked G → park, run next</div>
      </div>
    </div>
    <div style={{ textAlign: 'center', color: ACC, fontWeight: 700, marginTop: '12px', fontSize: '13px' }}>G → P (queue) → M (thread) → core · work-stealing keeps cores busy</div>
  </div>
);

// Goroutine -> channel -> goroutine message passing.
const GoChannel: React.FC<VisualizationProps> = () => (
  <div style={card}>
    <div style={label}>Channel — share memory by communicating</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ ...box }}>goroutine A<br /><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ch &lt;- v (send)</span></div>
      <span style={{ color: ACC, fontWeight: 800 }}>→</span>
      <div style={{ ...box, borderColor: ACC, color: ACC }}>chan T<br /><span style={{ fontSize: '11px' }}>[ buffer ]</span></div>
      <span style={{ color: ACC, fontWeight: 800 }}>→</span>
      <div style={{ ...box }}>goroutine B<br /><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>v := &lt;-ch (recv)</span></div>
    </div>
    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'center' }}>Unbuffered: send blocks until a receiver is ready (rendezvous). Buffered: send blocks only when full.</div>
  </div>
);

// Slice header: pointer / len / cap over a backing array.
const GoSliceHeader: React.FC<VisualizationProps> = () => (
  <div style={card}>
    <div style={label}>Slice header — pointer · len · cap</div>
    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
      <div style={{ ...box, flex: 1, borderColor: ACC }}>ptr →</div>
      <div style={{ ...box, flex: 1 }}>len = 3</div>
      <div style={{ ...box, flex: 1 }}>cap = 5</div>
    </div>
    <div style={{ ...label, marginBottom: '4px' }}>backing array</div>
    <div style={{ display: 'flex', gap: '4px' }}>
      {['10', '20', '30', '·', '·'].map((v, i) => (
        <div key={i} style={{ ...box, flex: 1, opacity: i < 3 ? 1 : 0.45, borderColor: i < 3 ? ACC : 'var(--border-glass)' }}>{v}</div>
      ))}
    </div>
    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '10px' }}>append within cap reuses the array (and can alias!); exceeding cap allocates a new, larger array and copies.</div>
  </div>
);

// Interface satisfaction (implicit / structural).
const GoInterface: React.FC<VisualizationProps> = () => (
  <div style={card}>
    <div style={label}>Interfaces are satisfied implicitly</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ ...box }}>type Dog struct{'{}'}<br /><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>func (Dog) Speak() string</span></div>
      <span style={{ color: ACC, fontWeight: 800 }}>satisfies →</span>
      <div style={{ ...box, borderColor: ACC, color: ACC }}>type Speaker interface{'{'} Speak() string {'}'}</div>
    </div>
    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'center' }}>No "implements" keyword — if the method set matches, the type satisfies the interface automatically.</div>
  </div>
);

export const BACKEND_VISUALIZATIONS: Record<string, React.FC<VisualizationProps>> = {
  'concept-steps': ConceptSteps,
  'go-gmp': GoGMP,
  'go-channel': GoChannel,
  'go-slice-header': GoSliceHeader,
  'go-interface': GoInterface,
};
