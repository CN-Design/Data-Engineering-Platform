import React, { useState } from 'react';

// ============================================================
// Data Engineering — hand-authored SVG & interactive diagrams.
// Theme-aware (uses CSS variables) so they adapt to dark/light.
// Registered per topic id; the renderer falls back to the text
// arrow-flow when a topic has no custom diagram.
// ============================================================

const C = {
  box: 'var(--bg-inner)',
  boxStroke: 'var(--border-glass)',
  text: 'var(--text-primary)',
  sub: 'var(--text-secondary)',
  muted: 'var(--text-muted)',
  blue: '#3b82f6', amber: '#f59e0b', green: '#10b981', purple: '#a855f7',
  teal: '#14b8a6', bronze: '#b45309', silver: '#94a3b8', gold: '#eab308', red: '#ef4444',
};

const svgStyle: React.CSSProperties = { width: '100%', maxWidth: 700, height: 'auto', display: 'block', margin: '0 auto' };

// Reusable labelled box
const Box: React.FC<{ x: number; y: number; w: number; h: number; label: string; accent?: string; sub?: string }> = ({ x, y, w, h, label, accent = C.blue, sub }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="8" fill={C.box} stroke={accent} strokeWidth="1.5" />
    <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 4)} textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>{label}</text>
    {sub && <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" fontSize="10.5" fill={C.muted}>{sub}</text>}
  </g>
);

const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color?: string }> = ({ x1, y1, x2, y2, color = C.muted }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" markerEnd="url(#deArrow)" />
);

const Defs = () => (
  <defs>
    <marker id="deArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill={C.muted} />
    </marker>
  </defs>
);

// ---------- 1. ETL vs ELT ----------
const EtlEltDiagram: React.FC = () => (
  <svg viewBox="0 0 700 250" style={svgStyle} role="img" aria-label="ETL versus ELT pipeline comparison">
    <Defs />
    <text x="10" y="24" fontSize="12" fontWeight="800" fill={C.amber}>ETL — transform before load</text>
    <Box x={10} y={38} w={110} h={46} label="Extract" sub="sources" accent={C.blue} />
    <Arrow x1={122} y1={61} x2={148} y2={61} />
    <Box x={150} y={38} w={120} h={46} label="Transform" sub="staging/ETL engine" accent={C.amber} />
    <Arrow x1={272} y1={61} x2={298} y2={61} />
    <Box x={300} y={38} w={110} h={46} label="Load" accent={C.green} />
    <Arrow x1={412} y1={61} x2={438} y2={61} />
    <Box x={440} y={38} w={120} h={46} label="Warehouse" sub="clean tables" accent={C.teal} />

    <text x="10" y="140" fontSize="12" fontWeight="800" fill={C.purple}>ELT — load first, transform in-warehouse</text>
    <Box x={10} y={154} w={110} h={46} label="Extract" sub="sources" accent={C.blue} />
    <Arrow x1={122} y1={177} x2={148} y2={177} />
    <Box x={150} y={154} w={110} h={46} label="Load" accent={C.green} />
    <Arrow x1={262} y1={177} x2={288} y2={177} />
    <Box x={290} y={154} w={130} h={46} label="Warehouse" sub="raw + modeled" accent={C.teal} />
    <Arrow x1={422} y1={177} x2={448} y2={177} />
    <Box x={450} y={154} w={130} h={46} label="Transform" sub="dbt / SQL" accent={C.purple} />
  </svg>
);

// ---------- 2. Medallion architecture ----------
const MedallionDiagram: React.FC = () => (
  <svg viewBox="0 0 700 220" style={svgStyle} role="img" aria-label="Medallion architecture: bronze, silver, gold layers">
    <Defs />
    <Box x={20} y={70} w={160} h={70} label="Bronze" sub="raw / ingested" accent={C.bronze} />
    <Arrow x1={182} y1={105} x2={228} y2={105} />
    <Box x={230} y={70} w={160} h={70} label="Silver" sub="cleaned / conformed" accent={C.silver} />
    <Arrow x1={392} y1={105} x2={438} y2={105} />
    <Box x={440} y={70} w={160} h={70} label="Gold" sub="business marts" accent={C.gold} />
    <text x={100} y={40} textAnchor="middle" fontSize="11" fill={C.muted}>ingest as-is</text>
    <text x={310} y={40} textAnchor="middle" fontSize="11" fill={C.muted}>validate, dedup, join</text>
    <text x={520} y={40} textAnchor="middle" fontSize="11" fill={C.muted}>aggregate, serve BI</text>
    <text x={310} y={175} textAnchor="middle" fontSize="11" fill={C.sub}>Quality &amp; trust increase left → right; each layer is a Delta/Iceberg table.</text>
  </svg>
);

// ---------- 3. Star schema ----------
const StarSchemaDiagram: React.FC = () => (
  <svg viewBox="0 0 700 300" style={svgStyle} role="img" aria-label="Star schema: central fact table with dimension tables">
    <Defs />
    <line x1={350} y1={150} x2={130} y2={70} stroke={C.boxStroke} strokeWidth="1.5" />
    <line x1={350} y1={150} x2={570} y2={70} stroke={C.boxStroke} strokeWidth="1.5" />
    <line x1={350} y1={150} x2={130} y2={230} stroke={C.boxStroke} strokeWidth="1.5" />
    <line x1={350} y1={150} x2={570} y2={230} stroke={C.boxStroke} strokeWidth="1.5" />
    <Box x={280} y={120} w={140} h={60} label="fact_sales" sub="measures + FKs" accent={C.blue} />
    <Box x={60} y={40} w={140} h={54} label="dim_date" accent={C.amber} />
    <Box x={500} y={40} w={140} h={54} label="dim_product" accent={C.green} />
    <Box x={60} y={206} w={140} h={54} label="dim_customer" accent={C.purple} />
    <Box x={500} y={206} w={140} h={54} label="dim_store" accent={C.teal} />
    <text x={350} y={285} textAnchor="middle" fontSize="11" fill={C.sub}>One central fact table joined to denormalized dimensions — fast, simple analytics.</text>
  </svg>
);

// ---------- 4. Kafka topic / partitions / consumer groups ----------
const KafkaPartitionsDiagram: React.FC = () => {
  const cell = (x: number, y: number, n: number, color: string) =>
    Array.from({ length: n }).map((_, i) => (
      <rect key={i} x={x + i * 26} y={y} width="22" height="20" rx="3" fill={C.box} stroke={color} strokeWidth="1.2" />
    ));
  return (
    <svg viewBox="0 0 700 300" style={svgStyle} role="img" aria-label="Kafka topic partitions and consumer groups">
      <Defs />
      <Box x={20} y={30} w={90} h={40} label="Producer" accent={C.blue} />
      <Arrow x1={112} y1={50} x2={158} y2={50} />
      {/* Topic with 3 partitions */}
      <rect x={160} y={20} width={330} height={190} rx="10" fill="none" stroke={C.boxStroke} strokeWidth="1.5" />
      <text x={175} y={40} fontSize="12" fontWeight="800" fill={C.text}>Topic: orders</text>
      {['P0', 'P1', 'P2'].map((p, i) => (
        <g key={p}>
          <text x={175} y={78 + i * 46} fontSize="11" fontWeight="700" fill={C.amber}>{p}</text>
          {cell(200, 64 + i * 46, 5, C.amber)}
        </g>
      ))}
      {/* Consumer group A */}
      <Arrow x1={492} y1={90} x2={528} y2={90} color={C.green} />
      <Box x={530} y={40} w={150} h={44} label="Consumer Group A" sub="3 consumers" accent={C.green} />
      <Arrow x1={492} y1={160} x2={528} y2={160} color={C.purple} />
      <Box x={530} y={140} w={150} h={44} label="Consumer Group B" sub="independent offset" accent={C.purple} />
      <text x={350} y={250} textAnchor="middle" fontSize="11" fill={C.sub}>Each partition is consumed by one consumer per group; groups read independently.</text>
      <text x={350} y={270} textAnchor="middle" fontSize="11" fill={C.muted}>Ordering is guaranteed within a partition, not across the topic.</text>
    </svg>
  );
};

// ---------- 5. CDC pipeline ----------
const CdcPipelineDiagram: React.FC = () => (
  <svg viewBox="0 0 700 220" style={svgStyle} role="img" aria-label="Change data capture pipeline">
    <Defs />
    <Box x={15} y={80} w={120} h={56} label="Source DB" sub="WAL / binlog" accent={C.blue} />
    <Arrow x1={137} y1={108} x2={168} y2={108} />
    <Box x={170} y={80} w={120} h={56} label="Debezium" sub="CDC connector" accent={C.red} />
    <Arrow x1={292} y1={108} x2={323} y2={108} />
    <Box x={325} y={80} w={120} h={56} label="Kafka" sub="change events" accent={C.amber} />
    <Arrow x1={447} y1={108} x2={478} y2={108} />
    <Box x={480} y={44} w={200} h={48} label="Lakehouse (Bronze)" accent={C.bronze} />
    <Box x={480} y={124} w={200} h={48} label="Warehouse (upsert/MERGE)" accent={C.teal} />
    <line x1={445} y1={108} x2={478} y2={68} stroke={C.muted} strokeWidth="2" markerEnd="url(#deArrow)" />
    <line x1={445} y1={108} x2={478} y2={148} stroke={C.muted} strokeWidth="2" markerEnd="url(#deArrow)" />
    <text x={350} y={200} textAnchor="middle" fontSize="11" fill={C.sub}>Row changes stream continuously as insert/update/delete events — no full reloads.</text>
  </svg>
);

// ---------- 6. Warehouse vs Lake vs Lakehouse ----------
const WarehouseLakeLakehouseDiagram: React.FC = () => {
  const col = (x: number, title: string, color: string, rows: string[]) => (
    <g>
      <rect x={x} y={30} width={200} height={200} rx="10" fill={C.box} stroke={color} strokeWidth="1.5" />
      <rect x={x} y={30} width={200} height={34} rx="10" fill={color} opacity="0.15" />
      <text x={x + 100} y={52} textAnchor="middle" fontSize="13" fontWeight="800" fill={C.text}>{title}</text>
      {rows.map((r, i) => (
        <text key={i} x={x + 14} y={88 + i * 26} fontSize="11.5" fill={C.sub}>• {r}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 700 250" style={svgStyle} role="img" aria-label="Warehouse vs lake vs lakehouse comparison">
      {col(15, 'Warehouse', C.teal, ['Structured only', 'Schema-on-write', 'Fast BI / SQL', 'Higher $ / GB'])}
      {col(250, 'Data Lake', C.blue, ['Any format', 'Schema-on-read', 'Cheap storage', 'Weak governance'])}
      {col(485, 'Lakehouse', C.purple, ['Open tables', 'ACID + schema', 'BI + ML on one', 'Delta / Iceberg'])}
    </svg>
  );
};

// ---------- 7. INTERACTIVE: Partition pruning ----------
const PartitionPruningWidget: React.FC = () => {
  const partitions = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'];
  const [selected, setSelected] = useState<string>('2024-03');
  const [rangeMode, setRangeMode] = useState(false);

  const isScanned = (p: string) => {
    if (!rangeMode) return p === selected;
    return p >= selected; // "month >= selected"
  };
  const scanned = partitions.filter(isScanned).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12.5, color: C.sub }}>Query filter:</span>
        <code style={{ fontSize: 12.5, background: C.box, border: `1px solid ${C.boxStroke}`, borderRadius: 6, padding: '3px 8px', color: C.text }}>
          WHERE month {rangeMode ? '>=' : '='} '{selected}'
        </code>
        <button onClick={() => setRangeMode(m => !m)} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: 11.5 }}>
          {rangeMode ? 'Use = (single)' : 'Use >= (range)'}
        </button>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {partitions.map(p => {
          const scan = isScanned(p);
          return (
            <button
              key={p}
              onClick={() => setSelected(p)}
              style={{
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, borderRadius: 8, padding: '10px 12px',
                border: `1.5px solid ${scan ? C.green : C.boxStroke}`,
                background: scan ? 'rgba(16,185,129,0.12)' : 'var(--bg-inner)',
                color: scan ? C.text : C.muted,
                opacity: scan ? 1 : 0.55,
              }}
              title={scan ? 'Scanned' : 'Pruned (skipped)'}
            >
              month={p}
              <span style={{ display: 'block', fontSize: 10, fontWeight: 600, color: scan ? C.green : C.muted }}>{scan ? 'SCANNED' : 'pruned'}</span>
            </button>
          );
        })}
      </div>
      <div style={{ fontSize: 12.5, color: C.sub }}>
        Engine reads <strong style={{ color: C.text }}>{scanned}</strong> of {partitions.length} partitions
        {' '}— partition pruning skips the other {partitions.length - scanned}, cutting I/O and cost. Tap a partition to change the filter.
      </div>
    </div>
  );
};

// ---------- 8. INTERACTIVE: Windowing + watermark ----------
const WindowingWatermarkWidget: React.FC = () => {
  // Events at event-times (seconds). Windows are 10s tumbling: [0,10),[10,20),[20,30)
  const events = [3, 7, 12, 18, 24, 9, 15];
  const [watermark, setWatermark] = useState(14);
  const windows = [
    { label: '[0–10)', start: 0, end: 10 },
    { label: '[10–20)', start: 10, end: 20 },
    { label: '[20–30)', start: 20, end: 30 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12.5, color: C.sub }}>Watermark (event-time):</span>
        <input type="range" min={0} max={30} value={watermark} onChange={e => setWatermark(Number(e.target.value))} style={{ flex: 1, minWidth: 160 }} aria-label="Watermark position" />
        <code style={{ fontSize: 12.5, background: C.box, border: `1px solid ${C.boxStroke}`, borderRadius: 6, padding: '3px 8px', color: C.text }}>t = {watermark}s</code>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {windows.map(w => {
          const closed = watermark >= w.end; // window can be emitted once watermark passes its end
          const evs = events.filter(e => e >= w.start && e < w.end);
          return (
            <div key={w.label} style={{ flex: 1, border: `1.5px solid ${closed ? C.green : C.boxStroke}`, borderRadius: 8, padding: 10, background: closed ? 'rgba(16,185,129,0.1)' : 'var(--bg-inner)' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.text }}>{w.label}</div>
              <div style={{ fontSize: 11, color: C.muted, margin: '4px 0' }}>{evs.length} events</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: closed ? C.green : C.amber }}>{closed ? '✓ emitted' : 'waiting…'}</div>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 12.5, color: C.sub }}>
        A window is emitted once the <strong style={{ color: C.text }}>watermark</strong> passes its end — the system&apos;s estimate that no earlier events remain. Late events arriving after that are dropped or sent to a side output. Drag to advance event-time.
      </div>
    </div>
  );
};

// ---------- 9. Spark cluster architecture ----------
const SparkClusterDiagram: React.FC = () => (
  <svg viewBox="0 0 700 260" style={svgStyle} role="img" aria-label="Spark cluster: driver, cluster manager, executors">
    <Defs />
    <Box x={270} y={20} w={160} h={54} label="Driver" sub="builds DAG, schedules" accent={C.blue} />
    <Arrow x1={350} y1={76} x2={350} y2={100} />
    <Box x={270} y={102} w={160} h={48} label="Cluster Manager" sub="YARN / K8s / Standalone" accent={C.amber} />
    <Arrow x1={300} y1={152} x2={150} y2={186} />
    <Arrow x1={350} y1={152} x2={350} y2={186} />
    <Arrow x1={400} y1={152} x2={550} y2={186} />
    {[70, 290, 510].map((x, i) => (
      <g key={i}>
        <Box x={x} y={188} w={130} h={54} label={`Executor ${i + 1}`} sub="tasks + cache" accent={C.green} />
      </g>
    ))}
    <text x={350} y={256} textAnchor="middle" fontSize="11" fill={C.muted}>Driver plans work; the cluster manager allocates executors that run tasks in parallel.</text>
  </svg>
);

// ---------- 10. Repartition vs Coalesce ----------
const RepartitionCoalesceDiagram: React.FC = () => (
  <svg viewBox="0 0 700 240" style={svgStyle} role="img" aria-label="Repartition versus coalesce">
    <Defs />
    <text x="10" y="20" fontSize="12" fontWeight="800" fill={C.blue}>repartition(6) — full shuffle, even sizes</text>
    {[0, 1, 2].map(i => <rect key={i} x={20 + i * 70} y={34} width="56" height="30" rx="5" fill={C.box} stroke={C.blue} />)}
    {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={300 + i * 60} y={34} width="46" height="30" rx="5" fill={C.box} stroke={C.blue} />)}
    <Arrow x1={236} y1={49} x2={296} y2={49} color={C.blue} />
    <text x={266} y={40} textAnchor="middle" fontSize="9" fill={C.muted}>shuffle</text>

    <text x="10" y="130" fontSize="12" fontWeight="800" fill={C.green}>coalesce(2) — no shuffle, merges locally</text>
    {[0, 1, 2, 3].map(i => <rect key={i} x={20 + i * 62} y={144} width="50" height="30" rx="5" fill={C.box} stroke={C.green} />)}
    {[0, 1].map(i => <rect key={i} x={320 + i * 90} y={144} width="78" height="30" rx="5" fill={C.box} stroke={C.green} />)}
    <Arrow x1={280} y1={159} x2={316} y2={159} color={C.green} />
    <text x={350} y={220} textAnchor="middle" fontSize="11" fill={C.sub}>Use coalesce to reduce partitions cheaply; repartition to increase or rebalance (costs a shuffle).</text>
  </svg>
);

// ---------- 11. Normalization vs Denormalization ----------
const NormalizationDiagram: React.FC = () => (
  <svg viewBox="0 0 700 240" style={svgStyle} role="img" aria-label="Normalized versus denormalized tables">
    <Defs />
    <text x="10" y="20" fontSize="12" fontWeight="800" fill={C.blue}>Normalized — no redundancy, more joins</text>
    <Box x={20} y={34} w={110} h={44} label="orders" sub="customer_id (FK)" accent={C.blue} />
    <Arrow x1={132} y1={56} x2={168} y2={56} />
    <Box x={170} y={34} w={110} h={44} label="customers" accent={C.blue} />
    <Arrow x1={282} y1={56} x2={318} y2={56} />
    <Box x={320} y={34} w={110} h={44} label="regions" accent={C.blue} />

    <text x="10" y="130" fontSize="12" fontWeight="800" fill={C.amber}>Denormalized — one wide table, fast reads</text>
    <Box x={20} y={144} w={420} h={44} label="orders_wide" sub="order + customer + region columns" accent={C.amber} />
    <text x={350} y={216} textAnchor="middle" fontSize="11" fill={C.sub}>Normalize for write integrity (OLTP); denormalize for read speed in analytics (OLAP).</text>
  </svg>
);

// ---------- 12. SCD Type 2 ----------
const Scd2Diagram: React.FC = () => (
  <svg viewBox="0 0 700 220" style={svgStyle} role="img" aria-label="Slowly changing dimension type 2 row versioning">
    <Defs />
    <text x="10" y="22" fontSize="12" fontWeight="800" fill={C.text}>dim_customer — customer 42 moves city</text>
    {/* header */}
    {['key', 'id', 'city', 'valid_from', 'valid_to', 'is_current'].map((h, i) => (
      <text key={h} x={20 + i * 115} y={52} fontSize="10.5" fontWeight="700" fill={C.muted}>{h}</text>
    ))}
    <rect x={12} y={60} width={676} height={40} rx="6" fill={C.box} stroke={C.silver} />
    {['1001', '42', 'Austin', '2022-01-01', '2024-05-31', 'false'].map((v, i) => (
      <text key={i} x={20 + i * 115} y={85} fontSize="11" fill={C.sub}>{v}</text>
    ))}
    <rect x={12} y={108} width={676} height={40} rx="6" fill="rgba(16,185,129,0.1)" stroke={C.green} />
    {['1002', '42', 'Denver', '2024-06-01', 'NULL', 'true'].map((v, i) => (
      <text key={i} x={20 + i * 115} y={133} fontSize="11" fontWeight={i === 5 ? 700 : 400} fill={i === 5 ? C.green : C.text}>{v}</text>
    ))}
    <text x={350} y={186} textAnchor="middle" fontSize="11" fill={C.sub}>The old row is closed (valid_to set, is_current=false); a new versioned row keeps full history.</text>
  </svg>
);

// ---------- 13. Lambda vs Kappa ----------
const LambdaKappaDiagram: React.FC = () => (
  <svg viewBox="0 0 700 250" style={svgStyle} role="img" aria-label="Lambda versus Kappa architecture">
    <Defs />
    <text x="10" y="20" fontSize="12" fontWeight="800" fill={C.blue}>Lambda — batch + speed layers</text>
    <Box x={20} y={30} w={90} h={40} label="Source" accent={C.blue} />
    <Arrow x1={112} y1={42} x2={140} y2={38} /><Box x={142} y={26} w={120} h={34} label="Batch layer" accent={C.teal} />
    <Arrow x1={112} y1={58} x2={140} y2={78} /><Box x={142} y={70} w={120} h={34} label="Speed layer" accent={C.amber} />
    <Arrow x1={264} y1={43} x2={300} y2={55} /><Arrow x1={264} y1={87} x2={300} y2={65} />
    <Box x={302} y={44} w={120} h={34} label="Serving" accent={C.green} />
    <text x={470} y={62} fontSize="10.5" fill={C.muted}>two code paths to maintain</text>

    <text x="10" y="150" fontSize="12" fontWeight="800" fill={C.purple}>Kappa — one streaming path</text>
    <Box x={20} y={160} w={90} h={40} label="Source" accent={C.blue} />
    <Arrow x1={112} y1={180} x2={148} y2={180} />
    <Box x={150} y={160} w={140} h={40} label="Stream processor" sub="reprocess by replay" accent={C.purple} />
    <Arrow x1={292} y1={180} x2={328} y2={180} />
    <Box x={330} y={160} w={120} h={40} label="Serving" accent={C.green} />
    <text x={480} y={184} fontSize="10.5" fill={C.muted}>one code path; replay for history</text>
  </svg>
);

// ---------- 14. Delta transaction log & time travel ----------
const DeltaLogDiagram: React.FC = () => (
  <svg viewBox="0 0 700 220" style={svgStyle} role="img" aria-label="Delta Lake transaction log and time travel">
    <Defs />
    <text x="10" y="22" fontSize="12" fontWeight="800" fill={C.text}>_delta_log — ordered, atomic commits</text>
    {['v0 insert', 'v1 update', 'v2 delete', 'v3 merge'].map((v, i) => (
      <g key={i}>
        <rect x={20 + i * 165} y={40} width={140} height={44} rx="8" fill={C.box} stroke={C.purple} strokeWidth="1.5" />
        <text x={90 + i * 165} y={67} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.text}>{v}</text>
        {i < 3 && <Arrow x1={160 + i * 165} y1={62} x2={183 + i * 165} y2={62} />}
      </g>
    ))}
    <Box x={20} y={110} w={300} h={44} label="SELECT ... VERSION AS OF 1" sub="reads the table as it was at v1" accent={C.green} />
    <text x={350} y={190} textAnchor="middle" fontSize="11" fill={C.sub}>Each commit is atomic (ACID); the ordered log powers time travel, audits, and rollbacks.</text>
  </svg>
);

// ---------- 15. INTERACTIVE: Shuffle (before/after) ----------
const ShuffleWidget: React.FC = () => {
  const [shuffled, setShuffled] = useState(false);
  const keyColor = (k: string) => (k === 'A' ? C.blue : k === 'B' ? C.amber : C.green);
  // 3 mappers with mixed keys; after shuffle, 3 reducers each hold one key.
  const mappers = [['A', 'B', 'C'], ['B', 'A', 'A'], ['C', 'C', 'B']];
  const reducers = [['A', 'A', 'A'], ['B', 'B', 'B'], ['C', 'C', 'C']];
  const grid = shuffled ? reducers : mappers;
  const label = shuffled ? 'Reducer' : 'Mapper';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <svg viewBox="0 0 700 170" style={svgStyle} role="img" aria-label="Shuffle redistribution of keys">
        {grid.map((cells, gi) => (
          <g key={gi}>
            <rect x={40 + gi * 220} y={30} width={180} height={90} rx="10" fill="none" stroke={C.boxStroke} strokeWidth="1.5" />
            <text x={130 + gi * 220} y={22} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.text}>{label} {gi + 1}</text>
            {cells.map((k, ci) => (
              <g key={ci}>
                <rect x={58 + gi * 220 + ci * 52} y={58} width={40} height={34} rx="6" fill={C.box} stroke={keyColor(k)} strokeWidth="1.5" />
                <text x={78 + gi * 220 + ci * 52} y={80} textAnchor="middle" fontSize="13" fontWeight="800" fill={keyColor(k)}>{k}</text>
              </g>
            ))}
          </g>
        ))}
        <text x={350} y={150} textAnchor="middle" fontSize="11" fill={C.muted}>
          {shuffled ? 'After shuffle: all rows with the same key land on the same reducer (network-heavy).' : 'Before shuffle: keys are scattered across mappers.'}
        </text>
      </svg>
      <button onClick={() => setShuffled(s => !s)} className="btn btn-primary" style={{ padding: '7px 14px', fontSize: 13 }}>
        {shuffled ? 'Reset' : 'Run shuffle →'}
      </button>
    </div>
  );
};

// ---------- 16. INTERACTIVE: Broadcast vs Shuffle join ----------
const BroadcastJoinWidget: React.FC = () => {
  const [mode, setMode] = useState<'broadcast' | 'shuffle'>('broadcast');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 6, background: C.box, padding: 4, borderRadius: 10, border: `1px solid ${C.boxStroke}` }}>
        <button onClick={() => setMode('broadcast')} className={`btn ${mode === 'broadcast' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: 12.5 }}>Broadcast join</button>
        <button onClick={() => setMode('shuffle')} className={`btn ${mode === 'shuffle' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: 12.5 }}>Shuffle (sort-merge) join</button>
      </div>
      <svg viewBox="0 0 700 180" style={svgStyle} role="img" aria-label="Broadcast versus shuffle join">
        <Defs />
        {mode === 'broadcast' ? (
          <>
            <Box x={280} y={12} w={140} h={40} label="Small dim" sub="broadcast to all" accent={C.amber} />
            {[40, 280, 520].map((x, i) => (
              <g key={i}>
                <Arrow x1={350} y1={54} x2={x + 70} y2={96} color={C.amber} />
                <Box x={x} y={98} w={140} h={44} label={`Executor ${i + 1}`} sub="local join, no shuffle" accent={C.green} />
              </g>
            ))}
            <text x={350} y={168} textAnchor="middle" fontSize="11" fill={C.sub}>Small table copied to every executor — the big table never moves. Fast when one side is small.</text>
          </>
        ) : (
          <>
            {[40, 280, 520].map((x, i) => <Box key={i} x={x} y={12} w={140} h={38} label={`Part ${i + 1}`} accent={C.blue} />)}
            {[40, 280, 520].map((x, i) => (
              <g key={i}>
                <Arrow x1={x + 70} y1={52} x2={((i + 1) % 3) * 240 + 110} y2={96} color={C.red} />
              </g>
            ))}
            {[40, 280, 520].map((x, i) => <Box key={i} x={x} y={98} w={140} h={44} label={`Reducer ${i + 1}`} sub="joined by key" accent={C.green} />)}
            <text x={350} y={168} textAnchor="middle" fontSize="11" fill={C.sub}>Both tables shuffled across the network by join key — needed when both sides are large.</text>
          </>
        )}
      </svg>
    </div>
  );
};

// ---------- 17. DAG & stages ----------
const DagStagesDiagram: React.FC = () => (
  <svg viewBox="0 0 700 210" style={svgStyle} role="img" aria-label="Spark job split into stages at shuffle boundaries">
    <Defs />
    <rect x={20} y={40} width={300} height={130} rx="10" fill="none" stroke={C.boxStroke} strokeDasharray="5 4" />
    <text x={30} y={34} fontSize="11" fontWeight="800" fill={C.blue}>Stage 1 (narrow)</text>
    <Box x={40} y={60} w={110} h={38} label="read" accent={C.blue} />
    <Arrow x1={152} y1={79} x2={178} y2={79} />
    <Box x={180} y={60} w={110} h={38} label="filter/map" accent={C.blue} />
    <text x={330} y={95} fontSize="10.5" fill={C.red} fontWeight={700}>shuffle</text>
    <Arrow x1={322} y1={79} x2={378} y2={79} color={C.red} />
    <rect x={380} y={40} width={300} height={130} rx="10" fill="none" stroke={C.boxStroke} strokeDasharray="5 4" />
    <text x={390} y={34} fontSize="11" fontWeight="800" fill={C.green}>Stage 2 (after shuffle)</text>
    <Box x={400} y={60} w={110} h={38} label="groupBy" accent={C.green} />
    <Arrow x1={512} y1={79} x2={538} y2={79} />
    <Box x={540} y={60} w={120} h={38} label="write" accent={C.green} />
    <text x={350} y={195} textAnchor="middle" fontSize="11" fill={C.sub}>Spark builds a DAG of transformations, then cuts it into stages at every shuffle boundary; each stage runs as parallel tasks.</text>
  </svg>
);

// ---------- 18. Delivery semantics ----------
const DeliverySemanticsDiagram: React.FC = () => {
  const row = (y: number, name: string, color: string, desc: string) => (
    <g>
      <rect x={12} y={y} width={676} height={44} rx="8" fill={C.box} stroke={color} strokeWidth="1.4" />
      <text x={26} y={y + 27} fontSize="13" fontWeight="800" fill={color}>{name}</text>
      <text x={210} y={y + 27} fontSize="11.5" fill={C.sub}>{desc}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 700 190" style={svgStyle} role="img" aria-label="Message delivery semantics">
      {row(16, 'At-most-once', C.amber, 'fire & forget — may lose messages, never duplicates')}
      {row(72, 'At-least-once', C.blue, 'retries until acked — never loses, may duplicate')}
      {row(128, 'Exactly-once', C.green, 'idempotent producer + transactions — no loss, no dupes')}
    </svg>
  );
};

// ---------- 19. Offsets & rebalancing ----------
const OffsetsRebalanceDiagram: React.FC = () => (
  <svg viewBox="0 0 700 190" style={svgStyle} role="img" aria-label="Kafka offsets and consumer rebalancing">
    <Defs />
    <text x={20} y={22} fontSize="12" fontWeight="800" fill={C.text}>Partition log — committed offset marks progress</text>
    {Array.from({ length: 8 }).map((_, i) => (
      <g key={i}>
        <rect x={20 + i * 70} y={34} width={62} height={34} rx="5" fill={i < 5 ? 'rgba(16,185,129,0.12)' : C.box} stroke={i < 5 ? C.green : C.boxStroke} />
        <text x={51 + i * 70} y={55} textAnchor="middle" fontSize="11" fill={C.sub}>{i}</text>
      </g>
    ))}
    <line x1={370} y1={30} x2={370} y2={74} stroke={C.red} strokeWidth="2" />
    <text x={330} y={90} fontSize="10.5" fill={C.red} fontWeight={700}>committed offset = 5</text>
    <text x={520} y={55} fontSize="10.5" fill={C.muted}>← consumed | not yet →</text>
    <text x={350} y={130} textAnchor="middle" fontSize="11.5" fill={C.sub}>On rebalance, partitions are reassigned across the group; each consumer resumes from the last committed offset.</text>
    <text x={350} y={152} textAnchor="middle" fontSize="11" fill={C.muted}>Commit too early → risk data loss; commit too late → risk reprocessing.</text>
  </svg>
);

// ---------- 20. Batch vs streaming ----------
const BatchVsStreamingDiagram: React.FC = () => (
  <svg viewBox="0 0 700 210" style={svgStyle} role="img" aria-label="Batch versus streaming processing">
    <Defs />
    <text x={20} y={22} fontSize="12" fontWeight="800" fill={C.blue}>Batch — bounded data on a schedule</text>
    <Box x={20} y={34} w={130} h={40} label="Collect window" accent={C.blue} />
    <Arrow x1={152} y1={54} x2={188} y2={54} />
    <Box x={190} y={34} w={130} h={40} label="Process all at once" accent={C.blue} />
    <Arrow x1={322} y1={54} x2={358} y2={54} />
    <Box x={360} y={34} w={130} h={40} label="Load results" accent={C.blue} />
    <text x={520} y={58} fontSize="10.5" fill={C.muted}>high latency, high throughput</text>

    <text x={20} y={130} fontSize="12" fontWeight="800" fill={C.teal}>Streaming — unbounded, continuous</text>
    <Box x={20} y={142} w={110} h={40} label="Event" accent={C.teal} />
    <Arrow x1={132} y1={162} x2={162} y2={162} color={C.teal} />
    <Box x={164} y={142} w={130} h={40} label="Process per-event" accent={C.teal} />
    <Arrow x1={296} y1={162} x2={326} y2={162} color={C.teal} />
    <Box x={328} y={142} w={130} h={40} label="Serve instantly" accent={C.teal} />
    <text x={520} y={166} fontSize="10.5" fill={C.muted}>low latency, always on</text>
  </svg>
);

// ---------- 21. Catalyst query plan ----------
const QueryPlanDiagram: React.FC = () => (
  <svg viewBox="0 0 700 130" style={svgStyle} role="img" aria-label="Catalyst optimizer query planning stages">
    <Defs />
    <Box x={10} y={44} w={120} h={44} label="Logical plan" sub="what you wrote" accent={C.blue} />
    <Arrow x1={132} y1={66} x2={158} y2={66} />
    <Box x={160} y={44} w={130} h={44} label="Optimized plan" sub="rules, pushdown" accent={C.amber} />
    <Arrow x1={292} y1={66} x2={318} y2={66} />
    <Box x={320} y={44} w={130} h={44} label="Physical plans" sub="cost-based pick" accent={C.purple} />
    <Arrow x1={452} y1={66} x2={478} y2={66} />
    <Box x={480} y={44} w={200} h={44} label="RDD DAG (executed)" accent={C.green} />
    <text x={350} y={116} textAnchor="middle" fontSize="11" fill={C.sub}>Catalyst rewrites your query through logical → optimized → physical plans before generating executable RDD code.</text>
  </svg>
);

// ---------- 22. dbt layering ----------
const DbtLayersDiagram: React.FC = () => (
  <svg viewBox="0 0 700 150" style={svgStyle} role="img" aria-label="dbt model layering">
    <Defs />
    <Box x={10} y={50} w={120} h={48} label="sources" sub="raw tables" accent={C.silver} />
    <Arrow x1={132} y1={74} x2={158} y2={74} />
    <Box x={160} y={50} w={120} h={48} label="staging" sub="clean/rename/cast" accent={C.blue} />
    <Arrow x1={282} y1={74} x2={308} y2={74} />
    <Box x={310} y={50} w={140} h={48} label="intermediate" sub="joins / dedup" accent={C.amber} />
    <Arrow x1={452} y1={74} x2={478} y2={74} />
    <Box x={480} y={50} w={120} h={48} label="marts" sub="fct / dim" accent={C.green} />
    <text x={350} y={132} textAnchor="middle" fontSize="11" fill={C.sub}>dbt models compose with ref(); tests &amp; docs attach at every layer, forming a DAG dbt runs in order.</text>
  </svg>
);

// ---------- 23. Snowflake virtual warehouses (storage/compute separation) ----------
const VirtualWarehousesDiagram: React.FC = () => (
  <svg viewBox="0 0 700 220" style={svgStyle} role="img" aria-label="Separation of storage and compute with virtual warehouses">
    <Defs />
    <Box x={200} y={150} w={300} h={48} label="Shared storage (micro-partitions)" accent={C.teal} />
    {[{ x: 40, n: 'WH: ETL', c: C.blue }, { x: 290, n: 'WH: BI', c: C.amber }, { x: 540, n: 'WH: Data Science', c: C.purple }].map((w, i) => (
      <g key={i}>
        <Box x={w.x} y={30} w={130} h={48} label={w.n} sub="independent compute" accent={w.c} />
        <Arrow x1={w.x + 65} y1={80} x2={350} y2={148} color={w.c} />
      </g>
    ))}
    <text x={350} y={214} textAnchor="middle" fontSize="11" fill={C.sub}>Each virtual warehouse scales independently over the same data — no contention between workloads.</text>
  </svg>
);

// ---------- 24. Kafka replication & ISR ----------
const KafkaReplicationDiagram: React.FC = () => (
  <svg viewBox="0 0 700 220" style={svgStyle} role="img" aria-label="Kafka partition replication and in-sync replicas">
    <Defs />
    {[{ x: 30, n: 'Broker 1', role: 'Leader P0', c: C.green }, { x: 260, n: 'Broker 2', role: 'Follower P0', c: C.blue }, { x: 490, n: 'Broker 3', role: 'Follower P0', c: C.blue }].map((b, i) => (
      <g key={i}>
        <rect x={b.x} y={40} width={180} height={110} rx="10" fill="none" stroke={C.boxStroke} strokeWidth="1.5" />
        <text x={b.x + 90} y={32} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.text}>{b.n}</text>
        <Box x={b.x + 20} y={70} w={140} h={54} label={b.role} sub={i === 0 ? 'handles reads/writes' : 'replicates'} accent={b.c} />
      </g>
    ))}
    <Arrow x1={210} y1={97} x2={258} y2={97} color={C.green} />
    <Arrow x1={440} y1={97} x2={488} y2={97} color={C.green} />
    <text x={350} y={185} textAnchor="middle" fontSize="11" fill={C.sub}>Each partition has one leader + follower replicas. In-sync replicas (ISR) can take over on failure — that&apos;s durability.</text>
  </svg>
);

// ---------- 25. Kafka Connect ----------
const KafkaConnectDiagram: React.FC = () => (
  <svg viewBox="0 0 700 170" style={svgStyle} role="img" aria-label="Kafka Connect source and sink connectors">
    <Defs />
    <Box x={15} y={60} w={110} h={48} label="Source DB" accent={C.blue} />
    <Arrow x1={127} y1={84} x2={158} y2={84} />
    <Box x={160} y={60} w={120} h={48} label="Source connector" sub="ingest" accent={C.amber} />
    <Arrow x1={282} y1={84} x2={313} y2={84} />
    <Box x={315} y={60} w={90} h={48} label="Kafka" accent={C.green} />
    <Arrow x1={407} y1={84} x2={438} y2={84} />
    <Box x={440} y={60} w={120} h={48} label="Sink connector" sub="export" accent={C.amber} />
    <Arrow x1={562} y1={84} x2={593} y2={84} />
    <Box x={595} y={60} w={90} h={48} label="Warehouse" accent={C.teal} />
    <text x={350} y={140} textAnchor="middle" fontSize="11" fill={C.sub}>Connect moves data in/out of Kafka with config, not code — scalable, fault-tolerant connectors.</text>
  </svg>
);

// ---------- 26. Five pillars of data observability ----------
const ObservabilityPillarsDiagram: React.FC = () => {
  const pillars = [
    { n: 'Freshness', c: C.blue }, { n: 'Volume', c: C.amber }, { n: 'Schema', c: C.green },
    { n: 'Distribution', c: C.purple }, { n: 'Lineage', c: C.teal },
  ];
  return (
    <svg viewBox="0 0 700 180" style={svgStyle} role="img" aria-label="Five pillars of data observability">
      {pillars.map((p, i) => (
        <g key={i}>
          <rect x={20 + i * 134} y={40} width={120} height={80} rx="10" fill={C.box} stroke={p.c} strokeWidth="1.5" />
          <text x={80 + i * 134} y={86} textAnchor="middle" fontSize="13" fontWeight="800" fill={p.c}>{p.n}</text>
        </g>
      ))}
      <text x={350} y={150} textAnchor="middle" fontSize="11" fill={C.sub}>Monitoring these five signals tells you whether data can be trusted — before dashboards break.</text>
    </svg>
  );
};

// ---------- 27. Incident response lifecycle ----------
const IncidentLifecycleDiagram: React.FC = () => {
  const steps = [{ n: 'Detect', c: C.blue }, { n: 'Triage', c: C.amber }, { n: 'Mitigate', c: C.red }, { n: 'Resolve', c: C.green }, { n: 'Postmortem', c: C.purple }];
  return (
    <svg viewBox="0 0 700 150" style={svgStyle} role="img" aria-label="Incident response lifecycle">
      <Defs />
      {steps.map((s, i) => (
        <g key={i}>
          <Box x={12 + i * 138} y={45} w={120} h={46} label={s.n} accent={s.c} />
          {i < steps.length - 1 && <Arrow x1={132 + i * 138} y1={68} x2={148 + i * 138} y2={68} />}
        </g>
      ))}
      <text x={350} y={125} textAnchor="middle" fontSize="11" fill={C.sub}>Alert fires → assess blast radius → stop the bleeding → fix root cause → learn (blamelessly).</text>
    </svg>
  );
};

// ---------- 28. Docker image layers ----------
const DockerLayersDiagram: React.FC = () => {
  const layers = [{ n: 'CMD ["python","job.py"]', c: C.purple }, { n: 'COPY . /app', c: C.amber }, { n: 'RUN pip install -r req.txt', c: C.green }, { n: 'FROM python:3.12-slim', c: C.blue }];
  return (
    <svg viewBox="0 0 700 210" style={svgStyle} role="img" aria-label="Docker image layers">
      {layers.map((l, i) => (
        <g key={i}>
          <rect x={180} y={30 + i * 40} width={340} height={34} rx="6" fill={C.box} stroke={l.c} strokeWidth="1.4" />
          <text x={350} y={52 + i * 40} textAnchor="middle" fontSize="11.5" fontFamily="ui-monospace, monospace" fill={C.text}>{l.n}</text>
        </g>
      ))}
      <text x={350} y={200} textAnchor="middle" fontSize="11" fill={C.sub}>Each instruction adds a cached layer. Order least→most volatile so rebuilds reuse the cache.</text>
    </svg>
  );
};

// ---------- 29. Kubernetes ----------
const KubernetesDiagram: React.FC = () => (
  <svg viewBox="0 0 700 210" style={svgStyle} role="img" aria-label="Kubernetes deployment, pods and service">
    <Defs />
    <Box x={270} y={20} w={160} h={40} label="Service" sub="stable endpoint" accent={C.teal} />
    <rect x={40} y={90} width={620} height={90} rx="10" fill="none" stroke={C.boxStroke} strokeDasharray="5 4" />
    <text x={52} y={84} fontSize="11" fontWeight="800" fill={C.blue}>Deployment (replicas: 3)</text>
    {[70, 290, 510].map((x, i) => (
      <g key={i}>
        <Arrow x1={350} y1={62} x2={x + 70} y2={106} color={C.teal} />
        <Box x={x} y={108} w={140} h={54} label={`Pod ${i + 1}`} sub="container(s)" accent={C.blue} />
      </g>
    ))}
    <text x={350} y={198} textAnchor="middle" fontSize="11" fill={C.sub}>A Deployment keeps N identical Pods running; the Service load-balances a stable address across them.</text>
  </svg>
);

// ---------- 30. CI/CD pipeline ----------
const CicdPipelineDiagram: React.FC = () => {
  const steps = [{ n: 'Commit', c: C.blue }, { n: 'Build', c: C.amber }, { n: 'Test / dbt test', c: C.green }, { n: 'Deploy', c: C.purple }, { n: 'Monitor', c: C.teal }];
  return (
    <svg viewBox="0 0 700 150" style={svgStyle} role="img" aria-label="CI/CD pipeline for data">
      <Defs />
      {steps.map((s, i) => (
        <g key={i}>
          <Box x={12 + i * 138} y={45} w={122} h={46} label={s.n} accent={s.c} />
          {i < steps.length - 1 && <Arrow x1={134 + i * 138} y1={68} x2={150 + i * 138} y2={68} />}
        </g>
      ))}
      <text x={350} y={125} textAnchor="middle" fontSize="11" fill={C.sub}>Every change is built, tested (incl. data tests), and promoted automatically — repeatable, low-risk releases.</text>
    </svg>
  );
};

// ---------- 31. DR: RPO / RTO timeline ----------
const DrTimelineDiagram: React.FC = () => (
  <svg viewBox="0 0 700 180" style={svgStyle} role="img" aria-label="Disaster recovery RPO and RTO timeline">
    <line x1={40} y1={90} x2={660} y2={90} stroke={C.boxStroke} strokeWidth="2" />
    <circle cx={280} cy={90} r={7} fill={C.blue} />
    <text x={280} y={120} textAnchor="middle" fontSize="11" fill={C.blue}>last backup</text>
    <circle cx={360} cy={90} r={7} fill={C.red} />
    <text x={360} y={72} textAnchor="middle" fontSize="11" fontWeight={700} fill={C.red}>outage</text>
    <circle cx={560} cy={90} r={7} fill={C.green} />
    <text x={560} y={120} textAnchor="middle" fontSize="11" fill={C.green}>recovered</text>
    <line x1={280} y1={50} x2={360} y2={50} stroke={C.amber} strokeWidth="2" markerEnd="url(#deArrow)" />
    <text x={320} y={42} textAnchor="middle" fontSize="11" fontWeight={700} fill={C.amber}>RPO (data loss)</text>
    <line x1={360} y1={135} x2={560} y2={135} stroke={C.purple} strokeWidth="2" markerEnd="url(#deArrow)" />
    <text x={460} y={152} textAnchor="middle" fontSize="11" fontWeight={700} fill={C.purple}>RTO (downtime)</text>
    <Defs />
  </svg>
);

// ---------- 32. INTERACTIVE: Error budget ----------
const ErrorBudgetWidget: React.FC = () => {
  const [slo, setSlo] = useState(99.9);
  const downMinutesMonth = Math.round((1 - slo / 100) * 30 * 24 * 60);
  const color = slo >= 99.95 ? C.red : slo >= 99.9 ? C.amber : C.green;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12.5, color: C.sub }}>Target SLO:</span>
        <input type="range" min={99} max={99.99} step={0.01} value={slo} onChange={e => setSlo(Number(e.target.value))} style={{ flex: 1, minWidth: 180 }} aria-label="SLO target" />
        <code style={{ fontSize: 13, background: C.box, border: `1px solid ${C.boxStroke}`, borderRadius: 6, padding: '3px 8px', color: C.text }}>{slo.toFixed(2)}%</code>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 150, border: `1.5px solid ${color}`, borderRadius: 10, padding: 14, background: 'var(--bg-inner)' }}>
          <div style={{ fontSize: 26, fontWeight: 800, color }}>{downMinutesMonth} min</div>
          <div style={{ fontSize: 12, color: C.muted }}>error budget / 30 days</div>
        </div>
        <div style={{ flex: 2, minWidth: 200, display: 'flex', alignItems: 'center', fontSize: 12.5, color: C.sub, lineHeight: 1.6 }}>
          The error budget is the allowed unreliability (100% − SLO). Spend it on shipping fast; when it&apos;s exhausted, freeze changes and focus on reliability. Chasing an extra “nine” shrinks the budget dramatically — often not worth the cost.
        </div>
      </div>
    </div>
  );
};

// ---------- 33. SQL window functions ----------
const WindowFunctionDiagram: React.FC = () => (
  <svg viewBox="0 0 700 210" style={svgStyle} role="img" aria-label="SQL window function partitions">
    <Defs />
    <text x={20} y={22} fontSize="12" fontWeight="800" fill={C.text}>ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)</text>
    <rect x={20} y={40} width={200} height={140} rx="10" fill="none" stroke={C.blue} strokeWidth="1.5" />
    <text x={120} y={60} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.blue}>PARTITION: Sales</text>
    {['Ann 90k → 1', 'Bob 80k → 2', 'Cy 70k → 3'].map((r, i) => <text key={i} x={36} y={90 + i * 26} fontSize="12" fill={C.sub}>{r}</text>)}
    <rect x={250} y={40} width={200} height={140} rx="10" fill="none" stroke={C.amber} strokeWidth="1.5" />
    <text x={350} y={60} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.amber}>PARTITION: Eng</text>
    {['Dee 120k → 1', 'El 110k → 2'].map((r, i) => <text key={i} x={266} y={90 + i * 26} fontSize="12" fill={C.sub}>{r}</text>)}
    <rect x={480} y={40} width={200} height={140} rx="10" fill="none" stroke={C.green} strokeWidth="1.5" />
    <text x={580} y={60} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.green}>PARTITION: Ops</text>
    {['Fi 95k → 1', 'Gil 60k → 2'].map((r, i) => <text key={i} x={496} y={90 + i * 26} fontSize="12" fill={C.sub}>{r}</text>)}
    <text x={350} y={200} textAnchor="middle" fontSize="11" fill={C.sub}>The window resets per partition; rows keep their detail (unlike GROUP BY, which collapses them).</text>
  </svg>
);

// ---------- 34. B-tree index ----------
const BTreeIndexDiagram: React.FC = () => (
  <svg viewBox="0 0 700 210" style={svgStyle} role="img" aria-label="B-tree index structure">
    <Defs />
    <Box x={290} y={20} w={120} h={38} label="[ 50 | 100 ]" accent={C.blue} />
    {[{ x: 90, l: '[10|30]' }, { x: 300, l: '[60|80]' }, { x: 510, l: '[120|150]' }].map((n, i) => (
      <g key={i}>
        <Arrow x1={350} y1={58} x2={n.x + 60} y2={86} />
        <Box x={n.x} y={88} w={120} h={36} label={n.l} accent={C.amber} />
        <Arrow x1={n.x + 60} y1={124} x2={n.x + 60} y2={150} />
        <rect x={n.x + 10} y={152} width={100} height={30} rx="5" fill="rgba(16,185,129,0.1)" stroke={C.green} />
        <text x={n.x + 60} y={172} textAnchor="middle" fontSize="10.5" fill={C.green}>row pointers</text>
      </g>
    ))}
    <text x={350} y={202} textAnchor="middle" fontSize="11" fill={C.sub}>Sorted tree gives O(log n) lookups &amp; range scans — turning full-table scans into targeted seeks.</text>
  </svg>
);

// ---------- 35. SQL joins (Venn) ----------
const SqlJoinsDiagram: React.FC = () => {
  const venn = (cx: number, title: string, left: boolean, right: boolean, inter: boolean) => (
    <g>
      <text x={cx} y={30} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.text}>{title}</text>
      <circle cx={cx - 18} cy={90} r={38} fill={left ? 'rgba(59,130,246,0.25)' : 'none'} stroke={C.blue} strokeWidth="1.5" />
      <circle cx={cx + 18} cy={90} r={38} fill={right ? 'rgba(16,185,129,0.25)' : 'none'} stroke={C.green} strokeWidth="1.5" />
      {inter && <path d={`M${cx},${58} A38,38 0 0,1 ${cx},${122} A38,38 0 0,1 ${cx},${58}`} fill="rgba(168,85,247,0.4)" />}
    </g>
  );
  return (
    <svg viewBox="0 0 700 160" style={svgStyle} role="img" aria-label="SQL join types as Venn diagrams">
      {venn(110, 'INNER', false, false, true)}
      {venn(300, 'LEFT', true, false, true)}
      {venn(490, 'FULL OUTER', true, true, true)}
      <text x={350} y={148} textAnchor="middle" fontSize="11" fill={C.sub}>Which rows survive depends on match + which side is preserved when there&apos;s no match (NULLs fill gaps).</text>
    </svg>
  );
};

// ---------- 36. Data contract ----------
const DataContractDiagram: React.FC = () => (
  <svg viewBox="0 0 700 160" style={svgStyle} role="img" aria-label="Data contract between producer and consumer">
    <Defs />
    <Box x={30} y={54} w={140} h={48} label="Producer" sub="upstream team" accent={C.blue} />
    <Arrow x1={172} y1={78} x2={214} y2={78} />
    <Box x={216} y={44} w={170} h={68} label="Data Contract" sub="schema · SLAs · semantics" accent={C.purple} />
    <Arrow x1={388} y1={78} x2={430} y2={78} />
    <Box x={432} y={54} w={140} h={48} label="Consumer" sub="downstream team" accent={C.green} />
    <text x={350} y={140} textAnchor="middle" fontSize="11" fill={C.sub}>An enforced agreement: breaking changes fail CI, so consumers aren&apos;t silently broken.</text>
  </svg>
);

// ---------- 37. BigQuery Dremel / slots ----------
const DremelDiagram: React.FC = () => (
  <svg viewBox="0 0 700 200" style={svgStyle} role="img" aria-label="BigQuery Dremel tree execution">
    <Defs />
    <Box x={290} y={20} w={120} h={38} label="Root server" accent={C.blue} />
    {[200, 350, 500].map((x, i) => {
      void i; return <Arrow key={x} x1={350} y1={58} x2={x} y2={82} />;
    })}
    {[140, 290, 440].map((x, i) => <Box key={i} x={x} y={84} w={120} h={36} label="Mixer" accent={C.amber} />)}
    {[60, 190, 320, 450, 580].map((x, i) => { void i; return <Arrow key={x} x1={350} y1={120} x2={x + 40} y2={146} color={C.muted} />; })}
    {[40, 170, 300, 430, 560].map((x, i) => <Box key={i} x={x} y={148} w={100} h={34} label={`Leaf ${i + 1}`} accent={C.green} />)}
    <text x={350} y={196} textAnchor="middle" fontSize="10.5" fill={C.sub}>Queries fan out across a tree of slots; leaves scan columnar data in parallel, results aggregate up.</text>
  </svg>
);

// ---------- 38. Object storage layout ----------
const ObjectStorageDiagram: React.FC = () => (
  <svg viewBox="0 0 700 190" style={svgStyle} role="img" aria-label="Object storage bucket, prefix, object">
    <Defs />
    <rect x={20} y={30} width={660} height={110} rx="10" fill="none" stroke={C.teal} strokeWidth="1.5" />
    <text x={34} y={50} fontSize="12" fontWeight="800" fill={C.teal}>bucket: shopflow-lake</text>
    <Box x={40} y={64} w={300} h={60} label="prefix: /events/dt=2024-06-01/" sub="logical partition path" accent={C.blue} />
    <Box x={360} y={64} w={140} h={60} label="part-000.parquet" sub="object" accent={C.amber} />
    <Box x={512} y={64} w={150} h={60} label="Storage class" sub="Standard → IA → Glacier" accent={C.purple} />
    <text x={350} y={170} textAnchor="middle" fontSize="11" fill={C.sub}>Flat key-value store, not a filesystem: “folders” are key prefixes; lifecycle rules tier objects to cut cost.</text>
  </svg>
);

// ---------- 39. IAM ----------
const IamDiagram: React.FC = () => (
  <svg viewBox="0 0 700 150" style={svgStyle} role="img" aria-label="IAM principal policy resource">
    <Defs />
    <Box x={30} y={50} w={150} h={48} label="Principal" sub="user / role / service" accent={C.blue} />
    <Arrow x1={182} y1={74} x2={224} y2={74} />
    <Box x={226} y={40} w={180} h={68} label="Policy" sub="allow/deny + conditions" accent={C.amber} />
    <Arrow x1={408} y1={74} x2={450} y2={74} />
    <Box x={452} y={50} w={150} h={48} label="Resource" sub="bucket / table / key" accent={C.green} />
    <text x={350} y={134} textAnchor="middle" fontSize="11" fill={C.sub}>Grant the least privilege needed — who can do what action on which resource, under what conditions.</text>
  </svg>
);

// ---------- 40. Great Expectations validation flow ----------
const ValidationFlowDiagram: React.FC = () => (
  <svg viewBox="0 0 700 180" style={svgStyle} role="img" aria-label="Data validation flow with quarantine">
    <Defs />
    <Box x={20} y={66} w={120} h={48} label="Incoming data" accent={C.blue} />
    <Arrow x1={142} y1={90} x2={173} y2={90} />
    <Box x={175} y={56} w={150} h={68} label="Expectation suite" sub="null / range / schema" accent={C.amber} />
    <Arrow x1={327} y1={78} x2={360} y2={60} color={C.green} />
    <Arrow x1={327} y1={102} x2={360} y2={124} color={C.red} />
    <Box x={362} y={36} w={150} h={40} label="Pass → publish" accent={C.green} />
    <Box x={362} y={110} w={150} h={40} label="Fail → quarantine" accent={C.red} />
    <text x={350} y={172} textAnchor="middle" fontSize="11" fill={C.sub}>Validate at the gate: good data flows on; bad data is quarantined and alerted — before it corrupts marts.</text>
  </svg>
);

// ---------- 41. Autoscaling ----------
const AutoscalingDiagram: React.FC = () => (
  <svg viewBox="0 0 700 180" style={svgStyle} role="img" aria-label="Autoscaling workers based on load">
    <Defs />
    <Box x={20} y={70} w={120} h={48} label="Load / lag" sub="metric" accent={C.blue} />
    <Arrow x1={142} y1={94} x2={178} y2={94} />
    <Box x={180} y={60} w={150} h={68} label="Autoscaler" sub="target threshold" accent={C.amber} />
    <Arrow x1={332} y1={80} x2={368} y2={64} color={C.green} />
    <Arrow x1={332} y1={108} x2={368} y2={124} color={C.red} />
    <Box x={370} y={40} w={170} h={40} label="Scale out (+workers)" accent={C.green} />
    <Box x={370} y={110} w={170} h={40} label="Scale in (−workers)" accent={C.red} />
    <text x={350} y={172} textAnchor="middle" fontSize="11" fill={C.sub}>Add capacity when the metric exceeds target, remove it when idle — match cost to real demand.</text>
  </svg>
);

// ---------- 42. Row vs columnar storage ----------
const ColumnarStorageDiagram: React.FC = () => (
  <svg viewBox="0 0 700 220" style={svgStyle} role="img" aria-label="Row-oriented versus columnar storage">
    <text x="10" y="22" fontSize="12" fontWeight="800" fill={C.blue}>Row storage — whole rows together</text>
    {[0, 1, 2].map(r => (
      <g key={r}>{['id', 'name', 'amt'].map((_c, ci) => (
        <rect key={ci} x={20 + ci * 60 + r * 190} y={34} width={54} height={26} rx="4" fill={C.box} stroke={C.blue} />
      ))}</g>
    ))}
    <text x="10" y="110" fontSize="12" fontWeight="800" fill={C.green}>Columnar — each column together (Parquet/ORC)</text>
    {['id', 'id', 'id', 'name', 'name', 'name', 'amt', 'amt', 'amt'].map((_c, i) => {
      const grp = Math.floor(i / 3);
      const fill = ['rgba(59,130,246,0.12)', 'rgba(245,158,11,0.12)', 'rgba(16,185,129,0.12)'][grp];
      const stroke = [C.blue, C.amber, C.green][grp];
      return <rect key={i} x={20 + i * 60 + grp * 12} y={124} width={54} height={26} rx="4" fill={fill} stroke={stroke} />;
    })}
    <text x={350} y={200} textAnchor="middle" fontSize="11" fill={C.sub}>Columnar reads only needed columns + compresses similar values — huge win for analytics scans.</text>
  </svg>
);

// ---------- 43. PK / FK relationship ----------
const PkFkDiagram: React.FC = () => (
  <svg viewBox="0 0 700 200" style={svgStyle} role="img" aria-label="Primary key and foreign key relationship">
    <Defs />
    <rect x={40} y={40} width={230} height={120} rx="8" fill={C.box} stroke={C.blue} strokeWidth="1.5" />
    <text x={155} y={62} textAnchor="middle" fontSize="13" fontWeight="800" fill={C.text}>customers</text>
    <text x={56} y={90} fontSize="12" fill={C.amber} fontWeight="700">🔑 customer_id (PK)</text>
    <text x={56} y={116} fontSize="12" fill={C.sub}>name</text>
    <text x={56} y={140} fontSize="12" fill={C.sub}>city</text>
    <rect x={430} y={40} width={230} height={120} rx="8" fill={C.box} stroke={C.green} strokeWidth="1.5" />
    <text x={545} y={62} textAnchor="middle" fontSize="13" fontWeight="800" fill={C.text}>orders</text>
    <text x={446} y={90} fontSize="12" fill={C.amber} fontWeight="700">🔑 order_id (PK)</text>
    <text x={446} y={116} fontSize="12" fill={C.purple} fontWeight="700">🔗 customer_id (FK)</text>
    <text x={446} y={140} fontSize="12" fill={C.sub}>amount</text>
    <path d="M270,116 C350,116 350,116 430,116" fill="none" stroke={C.purple} strokeWidth="2" markerEnd="url(#deArrow)" />
    <text x={350} y={188} textAnchor="middle" fontSize="11" fill={C.sub}>The FK in orders references the PK in customers — enforcing referential integrity.</text>
  </svg>
);

// ---------- 44. RDBMS vs NoSQL ----------
const RdbmsNosqlDiagram: React.FC = () => {
  const col = (x: number, title: string, color: string, rows: string[]) => (
    <g>
      <rect x={x} y={30} width={310} height={170} rx="10" fill={C.box} stroke={color} strokeWidth="1.5" />
      <rect x={x} y={30} width={310} height={34} rx="10" fill={color} opacity="0.15" />
      <text x={x + 155} y={52} textAnchor="middle" fontSize="13" fontWeight="800" fill={C.text}>{title}</text>
      {rows.map((r, i) => <text key={i} x={x + 16} y={88 + i * 26} fontSize="12" fill={C.sub}>• {r}</text>)}
    </g>
  );
  return (
    <svg viewBox="0 0 700 220" style={svgStyle} role="img" aria-label="RDBMS versus NoSQL">
      {col(20, 'RDBMS', C.blue, ['Fixed schema, tables', 'Strong ACID, joins', 'Vertical scale', 'SQL — OLTP/analytics'])}
      {col(370, 'NoSQL', C.purple, ['Flexible / schemaless', 'BASE, denormalized', 'Horizontal scale', 'Key-value / doc / wide-col'])}
    </svg>
  );
};

// ---------- 45. Sharding ----------
const ShardingDiagram: React.FC = () => (
  <svg viewBox="0 0 700 200" style={svgStyle} role="img" aria-label="Sharding data across nodes by hash of key">
    <Defs />
    <Box x={270} y={20} w={160} h={44} label="hash(shard_key)" accent={C.amber} />
    {[40, 290, 540].map((x, i) => (
      <g key={i}>
        <Arrow x1={350} y1={66} x2={x + 60} y2={104} />
        <Box x={x} y={106} w={120} h={54} label={`Shard ${i + 1}`} sub={`keys → ${i}`} accent={C.blue} />
      </g>
    ))}
    <text x={350} y={188} textAnchor="middle" fontSize="11" fill={C.sub}>A shard key routes each row to one node — spreading data & load horizontally (watch for hot keys).</text>
  </svg>
);

// ---------- 46. Snowflake schema ----------
const SnowflakeSchemaDiagram: React.FC = () => (
  <svg viewBox="0 0 700 240" style={svgStyle} role="img" aria-label="Snowflake schema with normalized dimensions">
    <Defs />
    <Box x={280} y={100} w={140} h={54} label="fact_sales" accent={C.blue} />
    <Box x={80} y={100} w={130} h={44} label="dim_product" accent={C.green} />
    <Box x={490} y={100} w={130} h={44} label="dim_store" accent={C.teal} />
    <Box x={80} y={30} w={130} h={40} label="dim_category" accent={C.green} />
    <Box x={490} y={30} w={130} h={40} label="dim_region" accent={C.teal} />
    <Arrow x1={210} y1={122} x2={278} y2={126} /><Arrow x1={490} y1={122} x2={422} y2={126} />
    <Arrow x1={145} y1={100} x2={145} y2={72} color={C.muted} /><Arrow x1={555} y1={100} x2={555} y2={72} color={C.muted} />
    <text x={350} y={210} textAnchor="middle" fontSize="11" fill={C.sub}>Dimensions are normalized into sub-tables (product→category) — less redundancy, more joins than a star.</text>
  </svg>
);

// ---------- 47. Fact vs dimension ----------
const FactDimensionDiagram: React.FC = () => (
  <svg viewBox="0 0 700 210" style={svgStyle} role="img" aria-label="Fact table versus dimension table">
    <rect x={30} y={30} width={300} height={150} rx="10" fill={C.box} stroke={C.blue} strokeWidth="1.5" />
    <text x={180} y={54} textAnchor="middle" fontSize="13" fontWeight="800" fill={C.blue}>Fact (fct_sales)</text>
    {['date_key (FK)', 'product_key (FK)', 'store_key (FK)', 'quantity  (measure)', 'revenue   (measure)'].map((r, i) => <text key={i} x={48} y={84 + i * 20} fontSize="11.5" fill={C.sub}>{r}</text>)}
    <rect x={370} y={30} width={300} height={150} rx="10" fill={C.box} stroke={C.green} strokeWidth="1.5" />
    <text x={520} y={54} textAnchor="middle" fontSize="13" fontWeight="800" fill={C.green}>Dimension (dim_product)</text>
    {['product_key (PK)', 'name', 'category', 'brand', 'price_tier'].map((r, i) => <text key={i} x={388} y={84 + i * 20} fontSize="11.5" fill={C.sub}>{r}</text>)}
    <text x={350} y={200} textAnchor="middle" fontSize="11" fill={C.sub}>Facts hold numeric measures + FKs (many rows); dimensions hold descriptive attributes (few rows).</text>
  </svg>
);

// ---------- 48. Message queue vs log ----------
const QueueVsLogDiagram: React.FC = () => (
  <svg viewBox="0 0 700 230" style={svgStyle} role="img" aria-label="Message queue versus append-only log">
    <Defs />
    <text x="10" y="22" fontSize="12" fontWeight="800" fill={C.amber}>Queue — consumed message is removed</text>
    {[0, 1, 2].map(i => <rect key={i} x={20 + i * 60} y={34} width={52} height={28} rx="5" fill={C.box} stroke={C.amber} />)}
    <Arrow x1={205} y1={48} x2={245} y2={48} color={C.amber} /><Box x={247} y={30} w={110} h={34} label="Consumer" accent={C.green} />
    <text x={380} y={52} fontSize="10.5" fill={C.muted}>once consumed → gone</text>

    <text x="10" y="130" fontSize="12" fontWeight="800" fill={C.blue}>Log — retained; consumers track offsets</text>
    {[0, 1, 2, 3, 4].map(i => <rect key={i} x={20 + i * 60} y={142} width={52} height={28} rx="5" fill={i < 3 ? 'rgba(59,130,246,0.12)' : C.box} stroke={C.blue} />)}
    <text x={330} y={160} fontSize="10.5" fill={C.blue}>← Consumer A (offset 3)</text>
    <text x={330} y={182} fontSize="10.5" fill={C.purple}>← Consumer B (offset 1)</text>
    <text x={350} y={214} textAnchor="middle" fontSize="11" fill={C.sub}>Kafka is a replayable log: many consumers read independently and can re-read history.</text>
  </svg>
);

// ---------- 49. Spark caching / storage levels ----------
const SparkCacheDiagram: React.FC = () => (
  <svg viewBox="0 0 700 190" style={svgStyle} role="img" aria-label="Spark caching a reused dataset">
    <Defs />
    <Box x={20} y={70} w={120} h={46} label="Read + transform" accent={C.blue} />
    <Arrow x1={142} y1={93} x2={178} y2={93} />
    <Box x={180} y={64} w={130} h={58} label="cache() / persist()" sub="held in memory" accent={C.amber} />
    <Arrow x1={312} y1={80} x2={360} y2={50} color={C.green} /><Box x={362} y={30} w={150} h={38} label="Action 1 (reuses)" accent={C.green} />
    <Arrow x1={312} y1={104} x2={360} y2={134} color={C.green} /><Box x={362} y={116} w={150} h={38} label="Action 2 (reuses)" accent={C.green} />
    <text x={350} y={180} textAnchor="middle" fontSize="11" fill={C.sub}>Cache a dataset reused by multiple actions to skip recomputation; choose storage level for memory vs disk.</text>
  </svg>
);

// ---------- 50. Structured streaming micro-batch ----------
const MicroBatchDiagram: React.FC = () => (
  <svg viewBox="0 0 700 170" style={svgStyle} role="img" aria-label="Structured streaming micro-batch loop">
    <Defs />
    <Box x={20} y={60} w={110} h={46} label="Source" sub="Kafka/files" accent={C.blue} />
    <Arrow x1={132} y1={83} x2={162} y2={83} />
    <Box x={164} y={54} w={140} h={58} label="Micro-batch" sub="incremental query" accent={C.amber} />
    <Arrow x1={306} y1={83} x2={336} y2={83} />
    <Box x={338} y={60} w={110} h={46} label="Sink" sub="exactly-once" accent={C.green} />
    <Box x={470} y={60} w={210} h={46} label="Checkpoint (offsets + state)" accent={C.purple} />
    <Arrow x1={234} y1={112} x2={470} y2={100} color={C.purple} />
    <text x={350} y={150} textAnchor="middle" fontSize="11" fill={C.sub}>Streaming = a series of small incremental batches; checkpoints persist progress for exactly-once recovery.</text>
  </svg>
);

// ---------- 51. Auto Loader ----------
const AutoLoaderDiagram: React.FC = () => (
  <svg viewBox="0 0 700 170" style={svgStyle} role="img" aria-label="Databricks Auto Loader incremental ingestion">
    <Defs />
    <Box x={20} y={60} w={140} h={48} label="Cloud storage" sub="new files land" accent={C.teal} />
    <Arrow x1={162} y1={84} x2={198} y2={84} />
    <Box x={200} y={52} w={160} h={64} label="Auto Loader" sub="cloudFiles + schema infer" accent={C.amber} />
    <Arrow x1={362} y1={84} x2={398} y2={84} />
    <Box x={400} y={60} w={130} h={48} label="Bronze table" accent={C.bronze} />
    <Box x={560} y={60} w={120} h={48} label="Checkpoint" sub="tracks seen files" accent={C.purple} />
    <text x={350} y={150} textAnchor="middle" fontSize="11" fill={C.sub}>Auto Loader incrementally ingests only new files (no re-scan), with schema inference &amp; evolution.</text>
  </svg>
);

// ---------- 52. Unity Catalog namespace ----------
const UnityCatalogDiagram: React.FC = () => (
  <svg viewBox="0 0 700 180" style={svgStyle} role="img" aria-label="Unity Catalog three-level namespace">
    <Defs />
    <Box x={40} y={70} w={150} h={48} label="Catalog" sub="prod" accent={C.blue} />
    <Arrow x1={192} y1={94} x2={228} y2={94} />
    <Box x={230} y={70} w={150} h={48} label="Schema" sub="sales" accent={C.amber} />
    <Arrow x1={382} y1={94} x2={418} y2={94} />
    <Box x={420} y={70} w={150} h={48} label="Table / View" sub="orders" accent={C.green} />
    <text x={305} y={40} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.text}>prod.sales.orders</text>
    <text x={350} y={158} textAnchor="middle" fontSize="11" fill={C.sub}>One governance layer across workspaces: 3-level namespace + grants, lineage &amp; audit.</text>
  </svg>
);

// ---------- 53. Control plane vs data plane ----------
const ControlDataPlaneDiagram: React.FC = () => (
  <svg viewBox="0 0 700 200" style={svgStyle} role="img" aria-label="Databricks control plane and data plane">
    <Defs />
    <rect x={30} y={30} width={280} height={140} rx="10" fill="none" stroke={C.purple} strokeWidth="1.5" strokeDasharray="5 4" />
    <text x={170} y={52} textAnchor="middle" fontSize="12" fontWeight="800" fill={C.purple}>Control plane (Databricks)</text>
    <Box x={60} y={66} w={220} h={38} label="Web UI, jobs, notebooks" accent={C.purple} />
    <Box x={60} y={116} w={220} h={38} label="Cluster manager, metadata" accent={C.purple} />
    <rect x={390} y={30} width={280} height={140} rx="10" fill="none" stroke={C.blue} strokeWidth="1.5" strokeDasharray="5 4" />
    <text x={530} y={52} textAnchor="middle" fontSize="12" fontWeight="800" fill={C.blue}>Data plane (your cloud)</text>
    <Box x={420} y={66} w={220} h={38} label="Compute clusters (VMs)" accent={C.blue} />
    <Box x={420} y={116} w={220} h={38} label="Your data in object storage" accent={C.teal} />
    <Arrow x1={310} y1={100} x2={388} y2={100} />
    <text x={350} y={190} textAnchor="middle" fontSize="11" fill={C.sub}>Databricks orchestrates from the control plane; compute &amp; data stay in your cloud account (data plane).</text>
  </svg>
);

// ---------- 54. DLT pipeline ----------
const DltPipelineDiagram: React.FC = () => (
  <svg viewBox="0 0 700 170" style={svgStyle} role="img" aria-label="Delta Live Tables declarative pipeline">
    <Defs />
    <Box x={20} y={60} w={140} h={48} label="Bronze" sub="@dlt.table" accent={C.bronze} />
    <Arrow x1={162} y1={84} x2={198} y2={84} />
    <Box x={200} y={60} w={150} h={48} label="Silver" sub="expectations" accent={C.silver} />
    <Arrow x1={352} y1={84} x2={388} y2={84} />
    <Box x={390} y={60} w={140} h={48} label="Gold" sub="materialized" accent={C.gold} />
    <text x={275} y={135} textAnchor="middle" fontSize="11" fill={C.sub}>You declare tables + data-quality expectations; DLT builds the DAG, runs, and manages quality/retries.</text>
  </svg>
);

// ---------- 55. Data lake zones ----------
const DataLakeZonesDiagram: React.FC = () => (
  <svg viewBox="0 0 700 180" style={svgStyle} role="img" aria-label="Data lake zones on object storage">
    <Defs />
    <Box x={30} y={60} w={170} h={54} label="Raw / Landing" sub="as-ingested" accent={C.bronze} />
    <Arrow x1={202} y1={87} x2={238} y2={87} />
    <Box x={240} y={60} w={170} h={54} label="Curated / Cleansed" sub="validated" accent={C.silver} />
    <Arrow x1={412} y1={87} x2={448} y2={87} />
    <Box x={450} y={60} w={170} h={54} label="Consumption" sub="analytics-ready" accent={C.gold} />
    <text x={350} y={150} textAnchor="middle" fontSize="11" fill={C.sub}>Zones on cheap object storage; open formats + a catalog turn a lake into a governed, query-ready platform.</text>
  </svg>
);

// ---------- 56. OLTP vs OLAP ----------
const OltpOlapDiagram: React.FC = () => {
  const col = (x: number, title: string, color: string, rows: string[]) => (
    <g>
      <rect x={x} y={30} width={310} height={168} rx="10" fill={C.box} stroke={color} strokeWidth="1.5" />
      <rect x={x} y={30} width={310} height={34} rx="10" fill={color} opacity="0.15" />
      <text x={x + 155} y={52} textAnchor="middle" fontSize="13" fontWeight="800" fill={C.text}>{title}</text>
      {rows.map((r, i) => <text key={i} x={x + 16} y={88 + i * 24} fontSize="12" fill={C.sub}>• {r}</text>)}
    </g>
  );
  return (
    <svg viewBox="0 0 700 220" style={svgStyle} role="img" aria-label="OLTP versus OLAP">
      {col(20, 'OLTP (transactional)', C.blue, ['Many small reads/writes', 'Row-oriented, normalized', 'Current state, low latency', 'Runs the business'])}
      {col(370, 'OLAP (analytical)', C.purple, ['Few large scans', 'Columnar, denormalized', 'History, aggregates', 'Understands the business'])}
    </svg>
  );
};

// ---------- 57. Modern data stack ----------
const ModernDataStackDiagram: React.FC = () => (
  <svg viewBox="0 0 700 150" style={svgStyle} role="img" aria-label="Modern data stack layers">
    <Defs />
    {[{ n: 'Sources', c: C.blue }, { n: 'Ingest (EL)', c: C.amber }, { n: 'Warehouse / Lake', c: C.teal }, { n: 'Transform (dbt)', c: C.purple }, { n: 'BI / ML', c: C.green }].map((s, i) => (
      <g key={i}>
        <Box x={12 + i * 138} y={50} w={122} h={46} label={s.n} accent={s.c} />
        {i < 4 && <Arrow x1={134 + i * 138} y1={73} x2={150 + i * 138} y2={73} />}
      </g>
    ))}
    <text x={350} y={128} textAnchor="middle" fontSize="11" fill={C.sub}>Cloud-native, modular tools connected by the warehouse — extract-load first, transform in-place with dbt.</text>
  </svg>
);

// ---------- 58. Data lifecycle ----------
const DataLifecycleDiagram: React.FC = () => (
  <svg viewBox="0 0 700 150" style={svgStyle} role="img" aria-label="Data lifecycle stages">
    <Defs />
    {[{ n: 'Generate', c: C.blue }, { n: 'Ingest', c: C.amber }, { n: 'Store', c: C.teal }, { n: 'Process', c: C.purple }, { n: 'Serve', c: C.green }, { n: 'Archive', c: C.silver }].map((s, i) => (
      <g key={i}>
        <Box x={10 + i * 115} y={50} w={100} h={44} label={s.n} accent={s.c} />
        {i < 5 && <Arrow x1={110 + i * 115} y1={72} x2={124 + i * 115} y2={72} />}
      </g>
    ))}
    <text x={350} y={126} textAnchor="middle" fontSize="11" fill={C.sub}>Data flows through predictable stages; governance &amp; quality apply at every step.</text>
  </svg>
);

// ---------- 59. Schema registry ----------
const SchemaRegistryDiagram: React.FC = () => (
  <svg viewBox="0 0 700 180" style={svgStyle} role="img" aria-label="Schema registry between producer and consumer">
    <Defs />
    <Box x={20} y={70} w={120} h={46} label="Producer" accent={C.blue} />
    <Arrow x1={142} y1={93} x2={250} y2={93} />
    <Box x={252} y={70} w={110} h={46} label="Kafka" accent={C.amber} />
    <Arrow x1={364} y1={93} x2={472} y2={93} />
    <Box x={474} y={70} w={120} h={46} label="Consumer" accent={C.green} />
    <Box x={250} y={12} w={200} h={40} label="Schema Registry" sub="Avro/Protobuf + compatibility" accent={C.purple} />
    <Arrow x1={140} y1={80} x2={250} y2={44} color={C.purple} />
    <Arrow x1={534} y1={80} x2={450} y2={44} color={C.purple} />
    <text x={350} y={160} textAnchor="middle" fontSize="11" fill={C.sub}>Producers register schemas; consumers fetch them. Compatibility rules prevent breaking changes.</text>
  </svg>
);

// ---------- 60. Schema evolution ----------
const SchemaEvolutionDiagram: React.FC = () => (
  <svg viewBox="0 0 700 180" style={svgStyle} role="img" aria-label="Schema evolution adding a column">
    <Defs />
    <Box x={40} y={60} w={200} h={60} label="v1: {id, name}" accent={C.blue} />
    <Arrow x1={242} y1={90} x2={288} y2={90} />
    <Box x={290} y={54} w={220} h={72} label="v2: {id, name, email?}" sub="new nullable column added" accent={C.green} />
    <text x={150} y={150} fontSize="11" fill={C.sub}>Old readers ignore new column</text>
    <text x={400} y={150} fontSize="11" fill={C.sub}>New readers default missing values</text>
    <text x={350} y={172} textAnchor="middle" fontSize="11" fill={C.muted}>Additive, nullable changes are backward/forward compatible; renames &amp; drops are breaking.</text>
  </svg>
);

// ---------- 61. Spark deploy modes ----------
const DeployModesDiagram: React.FC = () => (
  <svg viewBox="0 0 700 200" style={svgStyle} role="img" aria-label="Spark client versus cluster deploy mode">
    <Defs />
    <text x="10" y="22" fontSize="12" fontWeight="800" fill={C.blue}>client mode — driver on the submit machine</text>
    <Box x={20} y={34} w={150} h={40} label="Driver (local)" accent={C.blue} />
    <Arrow x1={172} y1={54} x2={210} y2={54} />
    <Box x={212} y={34} w={130} h={40} label="Executors (cluster)" accent={C.green} />
    <text x="10" y="120" fontSize="12" fontWeight="800" fill={C.purple}>cluster mode — driver runs inside the cluster</text>
    <Box x={20} y={132} w={150} h={40} label="Submit → exits" accent={C.silver} />
    <Arrow x1={172} y1={152} x2={210} y2={152} />
    <Box x={212} y={126} w={150} h={52} label="Driver + Executors" sub="all in cluster" accent={C.purple} />
    <text x={350} y={194} textAnchor="middle" fontSize="11" fill={C.sub}>Client mode is great for interactive/dev; cluster mode is standard for production submits.</text>
  </svg>
);

// ---------- 62. Adaptive Query Execution ----------
const AqeDiagram: React.FC = () => (
  <svg viewBox="0 0 700 160" style={svgStyle} role="img" aria-label="Adaptive query execution re-optimizes at runtime">
    <Defs />
    <Box x={20} y={56} w={130} h={48} label="Plan" accent={C.blue} />
    <Arrow x1={152} y1={80} x2={188} y2={80} />
    <Box x={190} y={50} w={150} h={60} label="Run stage" sub="collect real stats" accent={C.amber} />
    <Arrow x1={342} y1={80} x2={378} y2={80} />
    <Box x={380} y={50} w={170} h={60} label="Re-optimize" sub="coalesce / skew / broadcast" accent={C.green} />
    <path d="M465,110 C465,140 250,140 265,112" fill="none" stroke={C.muted} strokeWidth="2" markerEnd="url(#deArrow)" />
    <text x={350} y={150} textAnchor="middle" fontSize="11" fill={C.sub}>AQE adjusts the plan mid-flight using actual data sizes — fixing skew and shuffle-partition counts.</text>
  </svg>
);

// ---------- 63. Wide vs narrow transformations ----------
const WideNarrowDiagram: React.FC = () => (
  <svg viewBox="0 0 700 190" style={svgStyle} role="img" aria-label="Narrow versus wide transformations">
    <text x="10" y="22" fontSize="12" fontWeight="800" fill={C.green}>Narrow — no shuffle (map/filter)</text>
    {[0, 1, 2].map(i => <g key={i}><rect x={30 + i * 120} y={34} width={60} height={26} rx="4" fill={C.box} stroke={C.green} /><line x1={60 + i * 120} y1={60} x2={60 + i * 120} y2={80} stroke={C.green} strokeWidth="2" /><rect x={30 + i * 120} y={82} width={60} height={26} rx="4" fill={C.box} stroke={C.green} /></g>)}
    <text x="10" y="140" fontSize="12" fontWeight="800" fill={C.red}>Wide — shuffle (groupBy/join)</text>
    {[0, 1, 2].map(i => <rect key={i} x={30 + i * 120} y={150} width={60} height={24} rx="4" fill={C.box} stroke={C.red} />)}
    {[0, 1, 2].map(i => [0, 1, 2].map(j => <line key={`${i}-${j}`} x1={60 + i * 120} y1={150} x2={430 + j * 60} y2={130} stroke={C.red} strokeWidth="0.7" opacity="0.5" />))}
    {[0, 1, 2].map(j => <rect key={j} x={430 + j * 60} y={106} width={52} height={24} rx="4" fill={C.box} stroke={C.red} />)}
    <text x={555} y={170} textAnchor="middle" fontSize="10.5" fill={C.muted}>data crosses partitions</text>
  </svg>
);

// ---------- 64. Lineage graph ----------
const LineageGraphDiagram: React.FC = () => (
  <svg viewBox="0 0 700 180" style={svgStyle} role="img" aria-label="Data lineage graph">
    <Defs />
    <Box x={20} y={30} w={120} h={40} label="raw_orders" accent={C.bronze} />
    <Box x={20} y={110} w={120} h={40} label="raw_users" accent={C.bronze} />
    <Arrow x1={142} y1={50} x2={198} y2={80} /><Arrow x1={142} y1={130} x2={198} y2={92} />
    <Box x={200} y={66} w={140} h={44} label="stg_orders" accent={C.blue} />
    <Arrow x1={342} y1={88} x2={398} y2={88} />
    <Box x={400} y={66} w={140} h={44} label="fct_revenue" accent={C.green} />
    <Arrow x1={542} y1={88} x2={598} y2={88} />
    <Box x={600} y={66} w={90} h={44} label="Dashboard" accent={C.purple} />
    <text x={350} y={172} textAnchor="middle" fontSize="11" fill={C.sub}>Lineage maps how data flows table-to-table — for impact analysis and root-cause when something breaks.</text>
  </svg>
);

// ---------- 65. Backfill ----------
const BackfillDiagram: React.FC = () => (
  <svg viewBox="0 0 700 160" style={svgStyle} role="img" aria-label="Backfilling missed partitions">
    {['06-01', '06-02', '06-03', '06-04', '06-05', '06-06'].map((d, i) => {
      const filled = i >= 3;
      const back = i === 1 || i === 2;
      return (
        <g key={i}>
          <rect x={40 + i * 105} y={50} width={90} height={44} rx="6" fill={back ? 'rgba(245,158,11,0.15)' : filled ? 'rgba(16,185,129,0.12)' : C.box} stroke={back ? C.amber : filled ? C.green : C.boxStroke} strokeWidth="1.5" />
          <text x={85 + i * 105} y={70} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.text}>{d}</text>
          <text x={85 + i * 105} y={86} textAnchor="middle" fontSize="9.5" fill={C.muted}>{back ? 'backfill' : filled ? 'loaded' : 'gap'}</text>
        </g>
      );
    })}
    <text x={350} y={130} textAnchor="middle" fontSize="11" fill={C.sub}>Re-run past date partitions to fill gaps — idempotent, partition-scoped loads make this safe.</text>
  </svg>
);

// ---------- 66. Deploy strategies ----------
const DeployStrategiesDiagram: React.FC = () => (
  <svg viewBox="0 0 700 170" style={svgStyle} role="img" aria-label="Blue-green and canary deployment">
    <Defs />
    <text x="10" y="22" fontSize="12" fontWeight="800" fill={C.blue}>Blue-green — switch all traffic at once</text>
    <Box x={20} y={32} w={110} h={38} label="Blue (live)" accent={C.blue} />
    <Box x={150} y={32} w={110} h={38} label="Green (new)" accent={C.green} />
    <text x={280} y={55} fontSize="10.5" fill={C.muted}>flip router → instant rollback</text>
    <text x="10" y="112" fontSize="12" fontWeight="800" fill={C.amber}>Canary — shift traffic gradually</text>
    <Box x={20} y={122} w={110} h={34} label="v1 (95%)" accent={C.silver} />
    <Box x={150} y={122} w={110} h={34} label="v2 (5% → 100%)" accent={C.amber} />
    <text x={300} y={143} fontSize="10.5" fill={C.muted}>watch metrics, then ramp</text>
  </svg>
);

// ---------- 67. Access control (RBAC / masking / RLS) ----------
const AccessControlDiagram: React.FC = () => (
  <svg viewBox="0 0 700 190" style={svgStyle} role="img" aria-label="Access control: RBAC, masking, row-level security">
    <Defs />
    <Box x={20} y={70} w={120} h={48} label="User / Role" accent={C.blue} />
    <Arrow x1={142} y1={94} x2={188} y2={94} />
    <Box x={190} y={40} w={150} h={38} label="RBAC grants" sub="table/column access" accent={C.amber} />
    <Box x={190} y={86} w={150} h={38} label="Column masking" sub="hide PII" accent={C.purple} />
    <Box x={190} y={132} w={150} h={38} label="Row-level security" sub="filter rows" accent={C.teal} />
    <Arrow x1={342} y1={94} x2={430} y2={94} />
    <Box x={432} y={70} w={150} h={48} label="Governed data" accent={C.green} />
    <text x={350} y={184} textAnchor="middle" fontSize="11" fill={C.sub}>Layered controls: who can access (RBAC), which columns (masking), and which rows (RLS).</text>
  </svg>
);

// ---------- 68. Retry + DLQ ----------
const RetryDlqDiagram: React.FC = () => (
  <svg viewBox="0 0 700 170" style={svgStyle} role="img" aria-label="Retry with backoff and dead-letter queue">
    <Defs />
    <Box x={20} y={60} w={120} h={46} label="Process record" accent={C.blue} />
    <Arrow x1={142} y1={83} x2={188} y2={83} />
    <Box x={190} y={54} w={130} h={58} label="Retry w/ backoff" sub="transient errors" accent={C.amber} />
    <Arrow x1={322} y1={70} x2={368} y2={54} color={C.green} /><Box x={370} y={34} w={120} h={38} label="Success" accent={C.green} />
    <Arrow x1={322} y1={96} x2={368} y2={120} color={C.red} /><Box x={370} y={104} w={150} h={40} label="Dead-letter queue" sub="poison messages" accent={C.red} />
    <text x={350} y={162} textAnchor="middle" fontSize="11" fill={C.sub}>Retry transient failures with backoff; route repeatedly-failing "poison" records to a DLQ for inspection.</text>
  </svg>
);

// ============================================================
// Registry
// ============================================================

interface DiagramDef {
  title: string;
  caption?: string;
  Component: React.FC;
}

const defs: Record<string, DiagramDef> = {
  'etl-elt': { title: 'ETL vs ELT', Component: EtlEltDiagram, caption: 'Where transformation happens is the core difference.' },
  medallion: { title: 'Medallion Architecture', Component: MedallionDiagram },
  'star-schema': { title: 'Star Schema', Component: StarSchemaDiagram },
  'kafka-partitions': { title: 'Topics, Partitions & Consumer Groups', Component: KafkaPartitionsDiagram },
  cdc: { title: 'Change Data Capture Pipeline', Component: CdcPipelineDiagram },
  'wh-lake-lakehouse': { title: 'Warehouse vs Lake vs Lakehouse', Component: WarehouseLakeLakehouseDiagram },
  'partition-pruning': { title: 'Partition Pruning (interactive)', Component: PartitionPruningWidget, caption: 'Interactive — change the filter to see which partitions are read.' },
  'windowing-watermark': { title: 'Event-Time Windows & Watermarks (interactive)', Component: WindowingWatermarkWidget, caption: 'Interactive — drag the watermark to advance event-time.' },
  'spark-cluster': { title: 'Spark Cluster Architecture', Component: SparkClusterDiagram },
  'repartition-coalesce': { title: 'Repartition vs Coalesce', Component: RepartitionCoalesceDiagram },
  normalization: { title: 'Normalized vs Denormalized', Component: NormalizationDiagram },
  scd2: { title: 'Slowly Changing Dimension (Type 2)', Component: Scd2Diagram },
  'lambda-kappa': { title: 'Lambda vs Kappa Architecture', Component: LambdaKappaDiagram },
  'delta-log': { title: 'Delta Transaction Log & Time Travel', Component: DeltaLogDiagram },
  shuffle: { title: 'Shuffle: Key Redistribution (interactive)', Component: ShuffleWidget, caption: 'Interactive — run the shuffle to see rows regroup by key.' },
  'broadcast-join': { title: 'Broadcast vs Shuffle Join (interactive)', Component: BroadcastJoinWidget, caption: 'Interactive — toggle the join strategy.' },
  'dag-stages': { title: 'DAG & Stages', Component: DagStagesDiagram },
  'delivery-semantics': { title: 'Delivery Semantics', Component: DeliverySemanticsDiagram },
  offsets: { title: 'Offsets & Rebalancing', Component: OffsetsRebalanceDiagram },
  'batch-streaming': { title: 'Batch vs Streaming', Component: BatchVsStreamingDiagram },
  'query-plan': { title: 'Catalyst Query Planning', Component: QueryPlanDiagram },
  'dbt-layers': { title: 'dbt Model Layering', Component: DbtLayersDiagram },
  'virtual-warehouses': { title: 'Storage/Compute Separation', Component: VirtualWarehousesDiagram },
  'kafka-replication': { title: 'Replication & In-Sync Replicas', Component: KafkaReplicationDiagram },
  'kafka-connect': { title: 'Kafka Connect', Component: KafkaConnectDiagram },
  'observability-pillars': { title: 'Five Pillars of Data Observability', Component: ObservabilityPillarsDiagram },
  'incident-lifecycle': { title: 'Incident Response Lifecycle', Component: IncidentLifecycleDiagram },
  'docker-layers': { title: 'Docker Image Layers', Component: DockerLayersDiagram },
  kubernetes: { title: 'Kubernetes: Deployment, Pods & Service', Component: KubernetesDiagram },
  cicd: { title: 'CI/CD Pipeline', Component: CicdPipelineDiagram },
  'dr-timeline': { title: 'Disaster Recovery: RPO vs RTO', Component: DrTimelineDiagram },
  'error-budget': { title: 'Error Budget (interactive)', Component: ErrorBudgetWidget, caption: 'Interactive — drag the SLO to see the budget shrink.' },
  'window-function': { title: 'Window Functions', Component: WindowFunctionDiagram },
  'btree-index': { title: 'B-Tree Index', Component: BTreeIndexDiagram },
  'sql-joins': { title: 'SQL Join Types', Component: SqlJoinsDiagram },
  'data-contract': { title: 'Data Contract', Component: DataContractDiagram },
  dremel: { title: 'BigQuery Dremel Execution', Component: DremelDiagram },
  'object-storage': { title: 'Object Storage Layout', Component: ObjectStorageDiagram },
  iam: { title: 'IAM: Principal · Policy · Resource', Component: IamDiagram },
  'validation-flow': { title: 'Data Validation & Quarantine', Component: ValidationFlowDiagram },
  autoscaling: { title: 'Autoscaling', Component: AutoscalingDiagram },
  'columnar-storage': { title: 'Row vs Columnar Storage', Component: ColumnarStorageDiagram },
  'pk-fk': { title: 'Primary Key / Foreign Key', Component: PkFkDiagram },
  'rdbms-nosql': { title: 'RDBMS vs NoSQL', Component: RdbmsNosqlDiagram },
  sharding: { title: 'Sharding', Component: ShardingDiagram },
  'snowflake-schema': { title: 'Snowflake Schema', Component: SnowflakeSchemaDiagram },
  'fact-dimension': { title: 'Fact vs Dimension Tables', Component: FactDimensionDiagram },
  'queue-vs-log': { title: 'Message Queue vs Log', Component: QueueVsLogDiagram },
  'spark-cache': { title: 'Caching & Persistence', Component: SparkCacheDiagram },
  'micro-batch': { title: 'Structured Streaming Micro-Batch', Component: MicroBatchDiagram },
  'auto-loader': { title: 'Auto Loader', Component: AutoLoaderDiagram },
  'unity-catalog': { title: 'Unity Catalog Namespace', Component: UnityCatalogDiagram },
  'control-data-plane': { title: 'Control Plane vs Data Plane', Component: ControlDataPlaneDiagram },
  dlt: { title: 'Delta Live Tables Pipeline', Component: DltPipelineDiagram },
  'data-lake-zones': { title: 'Data Lake Zones', Component: DataLakeZonesDiagram },
  'oltp-olap': { title: 'OLTP vs OLAP', Component: OltpOlapDiagram },
  'modern-data-stack': { title: 'Modern Data Stack', Component: ModernDataStackDiagram },
  'data-lifecycle': { title: 'Data Lifecycle', Component: DataLifecycleDiagram },
  'schema-registry': { title: 'Schema Registry', Component: SchemaRegistryDiagram },
  'schema-evolution': { title: 'Schema Evolution', Component: SchemaEvolutionDiagram },
  'deploy-modes': { title: 'spark-submit Deploy Modes', Component: DeployModesDiagram },
  aqe: { title: 'Adaptive Query Execution', Component: AqeDiagram },
  'wide-narrow': { title: 'Wide vs Narrow Transformations', Component: WideNarrowDiagram },
  'lineage-graph': { title: 'Data Lineage', Component: LineageGraphDiagram },
  backfill: { title: 'Backfilling Partitions', Component: BackfillDiagram },
  'deploy-strategies': { title: 'Blue-Green & Canary Deploys', Component: DeployStrategiesDiagram },
  'access-control': { title: 'Access Control (RBAC / Masking / RLS)', Component: AccessControlDiagram },
  'retry-dlq': { title: 'Retry & Dead-Letter Queue', Component: RetryDlqDiagram },
};

// topic id -> diagram key (one diagram can serve several related topics)
const byTopic: Record<string, string> = {
  'data-engineering-beginner-30': 'etl-elt',
  'data-engineering-beginner-31': 'etl-elt',
  'data-engineering-advanced-8': 'medallion',
  'databricks-advanced-16': 'medallion',
  'data-engineering-intermediate-2': 'star-schema',
  'streaming-beginner-3': 'kafka-partitions',
  'streaming-beginner-5': 'kafka-partitions',
  'streaming-intermediate-4': 'kafka-partitions',
  'data-engineering-advanced-20': 'cdc',
  'streaming-intermediate-7': 'cdc',
  'databricks-advanced-15': 'cdc',
  'data-engineering-beginner-29': 'wh-lake-lakehouse',
  'warehousing-beginner-5': 'wh-lake-lakehouse',
  'data-engineering-intermediate-24': 'partition-pruning',
  'data-engineering-advanced-5': 'partition-pruning',
  'pyspark-advanced-6': 'partition-pruning',
  'warehousing-intermediate-8': 'partition-pruning',
  'pyspark-advanced-16': 'windowing-watermark',
  'streaming-advanced-5': 'windowing-watermark',
  'pyspark-beginner-2': 'spark-cluster',
  'pyspark-beginner-3': 'spark-cluster',
  'pyspark-beginner-4': 'spark-cluster',
  'pyspark-beginner-5': 'spark-cluster',
  'pyspark-advanced-4': 'repartition-coalesce',
  'pyspark-advanced-5': 'repartition-coalesce',
  'data-engineering-beginner-24': 'normalization',
  'data-engineering-beginner-25': 'normalization',
  'data-engineering-advanced-23': 'normalization',
  'data-engineering-intermediate-7': 'scd2',
  'orchestration-intermediate-2': 'scd2',
  'data-engineering-advanced-6': 'lambda-kappa',
  'data-engineering-advanced-7': 'lambda-kappa',
  'databricks-beginner-9': 'delta-log',
  'databricks-beginner-10': 'delta-log',
  'databricks-intermediate-2': 'delta-log',
  'databricks-intermediate-3': 'delta-log',
  'pyspark-advanced-11': 'shuffle',
  'pyspark-advanced-12': 'shuffle',
  'pyspark-advanced-20': 'shuffle',
  'pyspark-advanced-9': 'broadcast-join',
  'pyspark-advanced-21': 'broadcast-join',
  'pyspark-advanced-1': 'dag-stages',
  'pyspark-advanced-18': 'dag-stages',
  'data-engineering-intermediate-16': 'dag-stages',
  'orchestration-intermediate-8': 'dag-stages',
  'streaming-intermediate-3': 'delivery-semantics',
  'streaming-advanced-1': 'delivery-semantics',
  'sre-intermediate-4': 'delivery-semantics',
  'streaming-beginner-6': 'offsets',
  'streaming-intermediate-9': 'offsets',
  'data-engineering-beginner-32': 'batch-streaming',
  'pyspark-advanced-2': 'query-plan',
  'orchestration-beginner-1': 'dbt-layers',
  'orchestration-beginner-5': 'dbt-layers',
  'warehousing-intermediate-2': 'virtual-warehouses',
  'warehousing-beginner-1': 'virtual-warehouses',
  'cloud-intermediate-2': 'virtual-warehouses',
  'streaming-intermediate-1': 'kafka-replication',
  'streaming-intermediate-2': 'kafka-replication',
  'data-engineering-advanced-3': 'kafka-replication',
  'streaming-intermediate-6': 'kafka-connect',
  'dataquality-beginner-4': 'observability-pillars',
  'dataquality-beginner-5': 'observability-pillars',
  'dataquality-advanced-3': 'observability-pillars',
  'sre-intermediate-1': 'incident-lifecycle',
  'dataquality-intermediate-8': 'incident-lifecycle',
  'sre-beginner-6': 'incident-lifecycle',
  'devops-beginner-2': 'docker-layers',
  'devops-beginner-3': 'docker-layers',
  'devops-beginner-5': 'docker-layers',
  'devops-intermediate-1': 'kubernetes',
  'devops-intermediate-2': 'kubernetes',
  'devops-advanced-4': 'kubernetes',
  'devops-intermediate-6': 'cicd',
  'devops-intermediate-7': 'cicd',
  'databricks-advanced-19': 'cicd',
  'sre-advanced-1': 'dr-timeline',
  'cloud-advanced-4': 'dr-timeline',
  'sre-beginner-2': 'error-budget',
  'sre-beginner-4': 'error-budget',
  'dataquality-advanced-1': 'error-budget',
  'sql-intermediate-16': 'window-function',
  'pyspark-intermediate-9': 'window-function',
  'sql-advanced-4': 'btree-index',
  'sql-advanced-5': 'btree-index',
  'data-engineering-advanced-15': 'btree-index',
  'sql-intermediate-1': 'sql-joins',
  'pyspark-intermediate-1': 'sql-joins',
  'dataquality-intermediate-6': 'data-contract',
  'warehousing-intermediate-4': 'dremel',
  'cloud-beginner-4': 'object-storage',
  'cloud-beginner-8': 'iam',
  'dataquality-intermediate-1': 'validation-flow',
  'dataquality-beginner-3': 'validation-flow',
  'data-engineering-intermediate-11': 'validation-flow',
  'sre-advanced-6': 'autoscaling',
  'data-engineering-beginner-15': 'columnar-storage',
  'data-engineering-beginner-17': 'columnar-storage',
  'warehousing-beginner-2': 'columnar-storage',
  'pyspark-intermediate-14': 'columnar-storage',
  'python-advanced-5': 'columnar-storage',
  'data-engineering-beginner-21': 'pk-fk',
  'data-engineering-beginner-22': 'pk-fk',
  'data-engineering-intermediate-1': 'pk-fk',
  'data-engineering-beginner-19': 'rdbms-nosql',
  'data-engineering-beginner-20': 'rdbms-nosql',
  'data-engineering-advanced-4': 'sharding',
  'data-engineering-intermediate-3': 'snowflake-schema',
  'data-engineering-intermediate-4': 'fact-dimension',
  'data-engineering-intermediate-5': 'fact-dimension',
  'data-engineering-intermediate-29': 'queue-vs-log',
  'data-engineering-intermediate-28': 'queue-vs-log',
  'streaming-beginner-7': 'queue-vs-log',
  'streaming-beginner-1': 'queue-vs-log',
  'pyspark-advanced-7': 'spark-cache',
  'pyspark-advanced-8': 'spark-cache',
  'pyspark-advanced-15': 'micro-batch',
  'streaming-advanced-4': 'micro-batch',
  'databricks-advanced-17': 'auto-loader',
  'databricks-advanced-21': 'unity-catalog',
  'databricks-advanced-1': 'control-data-plane',
  'databricks-advanced-2': 'control-data-plane',
  'databricks-advanced-18': 'dlt',
  'data-engineering-intermediate-21': 'data-lake-zones',
  'data-engineering-beginner-28': 'data-lake-zones',
  'cloud-intermediate-5': 'data-lake-zones',
  'data-engineering-beginner-10': 'oltp-olap',
  'data-engineering-beginner-5': 'modern-data-stack',
  'data-engineering-beginner-6': 'data-lifecycle',
  'streaming-intermediate-5': 'schema-registry',
  'databricks-intermediate-14': 'schema-evolution',
  'dataquality-intermediate-4': 'schema-evolution',
  'pyspark-advanced-22': 'deploy-modes',
  'pyspark-advanced-10': 'aqe',
  'pyspark-advanced-19': 'wide-narrow',
  'data-engineering-advanced-9': 'lineage-graph',
  'data-engineering-advanced-10': 'lineage-graph',
  'dataquality-advanced-2': 'lineage-graph',
  'orchestration-intermediate-4': 'lineage-graph',
  'sre-intermediate-5': 'backfill',
  'orchestration-intermediate-9': 'backfill',
  'devops-advanced-1': 'deploy-strategies',
  'sre-intermediate-9': 'deploy-strategies',
  'databricks-advanced-11': 'access-control',
  'databricks-advanced-12': 'access-control',
  'databricks-advanced-13': 'access-control',
  'warehousing-advanced-5': 'access-control',
  'data-engineering-advanced-12': 'access-control',
  'data-engineering-intermediate-12': 'retry-dlq',
  'data-engineering-intermediate-13': 'retry-dlq',
};

const getDiagram = (topicId?: string): DiagramDef | null => {
  if (!topicId) return null;
  const key = byTopic[topicId];
  return key ? defs[key] : null;
};

// Wrapper: renders a titled, themed figure for the topic, or the provided
// fallback (e.g. the text arrow-flow) when the topic has no custom diagram.
export const TopicDiagram: React.FC<{ topicId?: string; fallback?: React.ReactNode }> = ({ topicId, fallback = null }) => {
  const d = getDiagram(topicId);
  if (!d) return <>{fallback}</>;
  const Comp = d.Component;
  return (
    <figure style={{ margin: '0 0 8px 0', border: `1px solid ${C.boxStroke}`, borderRadius: 12, padding: 18, background: 'var(--bg-secondary)' }}>
      <figcaption style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>{d.title}</figcaption>
      <Comp />
      {d.caption && <p style={{ margin: '12px 0 0 0', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>{d.caption}</p>}
    </figure>
  );
};
