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

// ---- shared bits for the architecture/flow diagrams ----
const node: React.CSSProperties = { ...box, padding: '10px 12px', minWidth: 0 };
const Arrow: React.FC<{ label?: string; down?: boolean }> = ({ label, down }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: ACC, fontWeight: 800, fontSize: down ? 16 : 15 }}>
    <span>{down ? '↓' : '→'}</span>
    {label && <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>{label}</span>}
  </div>
);
const cap: React.CSSProperties = { fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'center', lineHeight: 1.5 };

// Microservices topology: gateway -> services (own DB) + async message bus.
const MicroTopology: React.FC<VisualizationProps> = () => {
  const svc = (name: string, color: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ ...node, borderColor: color, color, flex: 'none', width: '100%' }}>{name}</div>
      <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>↓</span>
      <div style={{ ...node, fontSize: 11, color: 'var(--text-muted)', width: '100%' }}>🗄 {name} DB</div>
    </div>
  );
  return (
    <div style={card}>
      <div style={label}>Microservices topology — gateway, services, DB-per-service, event bus</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ ...node, borderColor: ACC, color: ACC, fontWeight: 700 }}>Clients / Web / Mobile</div>
        <span style={{ color: ACC }}>↓</span>
        <div style={{ ...node, borderColor: ACC, color: ACC, fontWeight: 700, width: '70%' }}>API Gateway<div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 500 }}>routing · auth · rate limit · aggregation</div></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, width: '100%', marginTop: 4 }}>
          {svc('Orders', '#10b981')}{svc('Payments', '#f59e0b')}{svc('Inventory', '#a855f7')}
        </div>
        <div className="be-viz-flow" style={{ ...node, width: '100%', marginTop: 8, borderStyle: 'dashed', borderColor: ACC, color: ACC }}>
          ⇄ Event bus (Kafka / NATS) — async, decoupled
        </div>
      </div>
      <p style={cap}>Sync calls go client→gateway→service; services stay decoupled by owning their data and communicating state changes as events over the bus.</p>
    </div>
  );
};

// gRPC request lifecycle + the four RPC types.
const GrpcLifecycle: React.FC<VisualizationProps> = () => (
  <div style={card}>
    <div style={label}>gRPC request lifecycle (over HTTP/2)</div>
    <div className="be-flowrow" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ ...node }}>Client stub<div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>generated from .proto</div></div>
      <Arrow label="marshal" />
      <div style={{ ...node, borderColor: ACC, color: ACC }}>HTTP/2 stream<div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>binary protobuf frames</div></div>
      <Arrow label="interceptors" />
      <div style={{ ...node }}>Server method<div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>your handler</div></div>
    </div>
    <div style={{ ...label, marginTop: 14 }}>The four RPC types</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8 }}>
      {[['Unary', 'req → resp'], ['Server stream', 'req → resp···'], ['Client stream', 'req··· → resp'], ['Bidirectional', 'req··· ⇄ resp···']].map(([t, d]) => (
        <div key={t} style={{ ...node }}>{t}<div style={{ fontSize: 11, color: ACC, fontFamily: 'ui-monospace, monospace' }}>{d}</div></div>
      ))}
    </div>
    <p style={cap}>One TCP/HTTP-2 connection multiplexes many streams; interceptors add auth/logging/tracing; deadlines &amp; metadata ride along each call.</p>
  </div>
);

// HTTP request -> middleware chain -> handler -> response.
const HttpMiddleware: React.FC<VisualizationProps> = () => (
  <div style={card}>
    <div style={label}>HTTP request → middleware chain → handler</div>
    <div className="be-flowrow" style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ ...node }}>Request</div>
      <Arrow />
      <div style={{ ...node, borderColor: '#10b981', color: '#10b981' }}>Logger</div>
      <Arrow label="next()" />
      <div style={{ ...node, borderColor: '#f59e0b', color: '#f59e0b' }}>Auth</div>
      <Arrow label="next()" />
      <div style={{ ...node, borderColor: ACC, color: ACC }}>Handler</div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 8 }}>
      <div style={{ ...node, borderColor: '#ef4444', color: '#ef4444' }}>Auth fails → c.Abort()</div>
      <span style={{ color: '#ef4444', fontWeight: 800 }}>⟲</span>
      <div style={{ ...node }}>401 Response (handler never runs)</div>
    </div>
    <p style={cap}>Each middleware runs before the handler and can short-circuit with Abort(); after the handler returns, control unwinds back up the chain (deferred work runs on the way out).</p>
  </div>
);

// Goroutine leak: blocked forever on a channel no one reads, vs fixed.
const GoroutineLeak: React.FC<VisualizationProps> = () => (
  <div style={card}>
    <div style={label}>Goroutine leak — blocked forever</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 12 }}>
      <div style={{ ...node, borderColor: '#ef4444', textAlign: 'left' }}>
        <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 6 }}>✗ Leaked</div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{'go func() {\n  ch <- work()  // blocks: no receiver\n}()\nreturn // caller left; G stuck forever'}</div>
        <div style={{ fontSize: 11, color: '#ef4444', marginTop: 6 }}>Stack + channel never freed → memory grows</div>
      </div>
      <div style={{ ...node, borderColor: '#10b981', textAlign: 'left' }}>
        <div style={{ color: '#10b981', fontWeight: 700, marginBottom: 6 }}>✓ Fixed</div>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{'select {\ncase ch <- work():\ncase <-ctx.Done():  // escape hatch\n  return\n}'}</div>
        <div style={{ fontSize: 11, color: '#10b981', marginTop: 6 }}>Cancellation lets the goroutine exit</div>
      </div>
    </div>
    <p style={cap}>Every goroutine you start needs a guaranteed way to finish — a buffered channel, a receiver, or a ctx.Done() escape hatch.</p>
  </div>
);

// GC mark-sweep timeline with STW pauses highlighted.
const GcPhases: React.FC<VisualizationProps> = () => {
  const phase = (name: string, stw: boolean, grow = 1) => (
    <div className={stw ? 'be-pulse' : undefined} style={{ ...node, flex: grow, background: stw ? 'rgba(239,68,68,0.14)' : 'var(--bg-secondary)', borderColor: stw ? '#ef4444' : ACC, color: stw ? '#ef4444' : 'var(--text-primary)', fontSize: 12 }}>
      {name}{stw && <div style={{ fontSize: 10, fontWeight: 700 }}>STW</div>}
    </div>
  );
  return (
    <div style={card}>
      <div style={label}>Concurrent mark-sweep GC — only two brief stop-the-world pauses</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'stretch' }}>
        {phase('Sweep', false, 2)}<span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>→</span>
        {phase('Mark setup', true)}<span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>→</span>
        {phase('Concurrent mark', false, 3)}<span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>→</span>
        {phase('Mark term', true)}<span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>→</span>
        {phase('Sweep', false, 2)}
      </div>
      <p style={cap}>Marking runs concurrently with your program; only the two red STW phases pause goroutines (sub-millisecond). GOGC/GOMEMLIMIT tune how often this cycle runs.</p>
    </div>
  );
};

// Worker pool: jobs channel -> N workers -> results channel (fan-out/fan-in).
const WorkerPool: React.FC<VisualizationProps> = () => (
  <div style={card}>
    <div style={label}>Worker pool — fan-out then fan-in</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
      <div style={{ ...node, borderColor: ACC, color: ACC }}>jobs&nbsp;chan<div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>buffered queue</div></div>
      <Arrow label="fan-out" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {['worker 1', 'worker 2', 'worker 3'].map(w => <div key={w} style={{ ...node, padding: '6px 10px', fontSize: 12 }}>{w}</div>)}
      </div>
      <Arrow label="fan-in" />
      <div style={{ ...node, borderColor: '#10b981', color: '#10b981' }}>results&nbsp;chan</div>
    </div>
    <p style={cap}>A fixed set of N worker goroutines drains one jobs channel and writes to a results channel — bounding concurrency and memory instead of spawning one goroutine per job.</p>
  </div>
);

// Context cancellation propagation tree.
const ContextTree: React.FC<VisualizationProps> = () => (
  <div style={card}>
    <div style={label}>context cancellation propagates down the tree</div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ ...node, borderColor: '#ef4444', color: '#ef4444' }}>ctx, cancel := WithCancel(parent)<div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 500 }}>cancel() called / deadline hit</div></div>
      <span style={{ color: '#ef4444' }}>↓ Done() closes ↓</span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, width: '100%' }}>
        {['DB query', 'HTTP call', 'worker'].map(c => (
          <div key={c} style={{ ...node, borderColor: '#ef4444' }}>{c}<div style={{ fontSize: 10.5, color: '#ef4444' }}>&lt;-ctx.Done() → return</div></div>
        ))}
      </div>
    </div>
    <p style={cap}>Cancelling a parent context closes Done() for every derived child at once, so all downstream calls (DB, RPC, goroutines) unwind together — no leaks.</p>
  </div>
);

// Docker multi-stage build: big builder -> tiny final image.
const DockerMultistage: React.FC<VisualizationProps> = () => (
  <div style={card}>
    <div style={label}>Multi-stage Docker build — ship a tiny final image</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ ...node, textAlign: 'left', flex: 1, minWidth: 200 }}>
        <div style={{ color: '#f59e0b', fontWeight: 700 }}>Stage 1 · builder</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'ui-monospace, monospace', whiteSpace: 'pre-wrap', marginTop: 4 }}>{'FROM golang:1.x\nRUN go build -o /app\n# ~800 MB (SDK, cache)'}</div>
      </div>
      <Arrow label="COPY --from" />
      <div style={{ ...node, textAlign: 'left', borderColor: '#10b981', flex: 1, minWidth: 200 }}>
        <div style={{ color: '#10b981', fontWeight: 700 }}>Stage 2 · final</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'ui-monospace, monospace', whiteSpace: 'pre-wrap', marginTop: 4 }}>{'FROM scratch\nCOPY --from=builder /app /app\n# ~10 MB, no shell'}</div>
      </div>
    </div>
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 12 }}>
      <div style={{ height: 16, background: '#f59e0b', borderRadius: 4, width: '80%' }} title="builder ~800MB" />
      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>vs</span>
      <div style={{ height: 16, background: '#10b981', borderRadius: 4, width: '6%' }} title="final ~10MB" />
    </div>
    <p style={cap}>Only the compiled static binary is copied into a minimal base (scratch/distroless) — smaller images, faster pulls, and a far smaller attack surface (CGO_ENABLED=0 for a static build).</p>
  </div>
);

export const BACKEND_VISUALIZATIONS: Record<string, React.FC<VisualizationProps>> = {
  'concept-steps': ConceptSteps,
  'go-gmp': GoGMP,
  'go-channel': GoChannel,
  'go-slice-header': GoSliceHeader,
  'go-interface': GoInterface,
  'micro-topology': MicroTopology,
  'grpc-lifecycle': GrpcLifecycle,
  'http-middleware': HttpMiddleware,
  'goroutine-leak': GoroutineLeak,
  'gc-phases': GcPhases,
  'worker-pool': WorkerPool,
  'context-tree': ContextTree,
  'docker-multistage': DockerMultistage,
};
