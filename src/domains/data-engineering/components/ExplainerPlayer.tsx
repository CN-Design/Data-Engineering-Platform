import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ExplainerScript, ExplainerScene } from '../../../core/types/types';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Volume2, VolumeX, Download } from 'lucide-react';

interface ExplainerPlayerProps {
  script: ExplainerScript;
}

// Curated professional palette — one refined accent per scene (auto-cycled).
const PALETTE = ['#6366f1', '#0ea5b7', '#d99a2b', '#e0607a', '#8b5cf6', '#10b981'];
const TONE: Record<string, string> = { good: '#10b981', bad: '#e0607a', neutral: '#6366f1' };

const STYLE_ID = 'de-explainer-styles-v2';
const CSS = `
.expv-root{--ac:#6366f1}
.expv-wrap{position:relative;aspect-ratio:16/9;overflow:hidden;border-bottom:1px solid var(--border-glass);background:linear-gradient(180deg,var(--bg-secondary),var(--bg-primary))}
.expv-wrap:before{content:"";position:absolute;inset:0;background:radial-gradient(70% 60% at 50% 0%,color-mix(in srgb,var(--ac) 8%,transparent),transparent 72%);pointer-events:none}
.expv-brand{position:absolute;top:14px;left:16px;display:flex;align-items:center;gap:9px;z-index:3}
.expv-brand img{width:26px;height:26px;display:block}
.expv-wm{font-size:12.5px;font-weight:800;letter-spacing:.14em;background:linear-gradient(135deg,#60a5fa,#c084fc);-webkit-background-clip:text;background-clip:text;color:transparent}
.expv-stage{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:56px 44px 40px}
.expv-fit{width:100%;max-width:660px;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;transform-origin:center center}
.expv-a{opacity:0;animation:expv-rise .5s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes expv-rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.expv-kicker{font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--ac)}
.expv-h{font-weight:800;letter-spacing:-.5px;line-height:1.14;color:var(--text-primary)}
.expv-rule{height:2px;width:56px;background:var(--ac);border-radius:2px}
.expv-sub{color:var(--text-secondary);font-size:17px;max-width:58ch;line-height:1.65}
.expv-icon{font-size:34px;line-height:1}
.expv-list{display:flex;flex-direction:column;gap:2px;width:100%;text-align:left}
.expv-li{display:flex;gap:14px;align-items:flex-start;padding:11px 6px;border-bottom:1px solid var(--border-glass)}
.expv-li:last-child{border-bottom:none}
.expv-num{font-family:ui-monospace,monospace;font-size:13px;font-weight:700;color:var(--ac);min-width:22px;padding-top:1px}
.expv-li .t{font-size:15px;color:var(--text-primary);line-height:1.5}
.expv-chips{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px}
.expv-chip{padding:11px 16px;border:1px solid var(--border-glass);border-left:3px solid var(--ac);border-radius:10px;background:var(--bg-inner);font-size:14px;font-weight:600;color:var(--text-primary)}
.expv-arr{color:var(--text-muted);font-size:16px}
.expv-cols{display:flex;gap:18px;flex-wrap:wrap;justify-content:center;width:100%}
.expv-col{flex:1 1 240px;max-width:330px;text-align:left;background:var(--bg-inner);border:1px solid var(--border-glass);border-top:2px solid var(--ac);border-radius:12px;padding:18px}
.expv-col h4{margin:0 0 12px;font-size:14px;font-weight:700;color:var(--text-primary);padding-bottom:8px;border-bottom:1px solid var(--border-glass)}
.expv-col .p{font-size:13px;color:var(--text-secondary);line-height:1.55;margin-bottom:8px;display:flex;gap:8px}
.expv-col .p b{color:var(--ac)}
.expv-win{width:100%;border:1px solid var(--border-glass);border-radius:10px;overflow:hidden}
.expv-wbar{display:flex;align-items:center;gap:6px;padding:9px 12px;background:var(--bg-inner);border-bottom:1px solid var(--border-glass)}
.expv-d3{width:10px;height:10px;border-radius:50%;background:#3a475e}
.expv-pre{margin:0;text-align:left;overflow-x:auto;background:var(--bg-code,#0b111c);padding:16px;font-size:13px;line-height:1.75;font-family:ui-monospace,Menlo,monospace;color:var(--text-code,#dbe4f0)}
.expv-callT{font-size:27px;font-weight:800;color:var(--text-primary);max-width:52ch;line-height:1.4}
.expv-tag{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border-radius:999px;padding:5px 13px}
@media(prefers-reduced-motion:reduce){.expv-a{animation-duration:.01ms}}
`;

const useStyles = () => {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style'); el.id = STYLE_ID; el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
};

const delay = (n: number): React.CSSProperties => ({ animationDelay: `${0.08 + n * 0.1}s` });

const SceneView: React.FC<{ s: ExplainerScene }> = ({ s }) => {
  switch (s.template) {
    case 'title':
      return (<>
        {s.icon && <div className="expv-icon expv-a" style={delay(0)}>{s.icon}</div>}
        {s.kicker && <div className="expv-kicker expv-a" style={delay(1)}>{s.kicker}</div>}
        <div className="expv-h expv-a" style={{ fontSize: 'clamp(28px,5vw,48px)', ...delay(2) }}>{s.headline}</div>
        <div className="expv-rule expv-a" style={delay(3)} />
        {s.subtitle && <div className="expv-sub expv-a" style={delay(4)}>{s.subtitle}</div>}
      </>);
    case 'bullets':
      return (<>
        <div className="expv-kicker expv-a" style={delay(0)}>{s.kicker || 'Key idea'}</div>
        {s.headline && <div className="expv-h expv-a" style={{ fontSize: 'clamp(20px,4vw,29px)', marginBottom: 4, ...delay(1) }}>{s.headline}</div>}
        <div className="expv-list">
          {(s.items || []).map((it, k) => (
            <div key={k} className="expv-li expv-a" style={delay(k + 2)}>
              <span className="expv-num">{('0' + (k + 1)).slice(-2)}</span><span className="t">{it}</span>
            </div>
          ))}
        </div>
      </>);
    case 'flow':
      return (<>
        {s.headline && <div className="expv-h expv-a" style={{ fontSize: 'clamp(20px,4vw,27px)', ...delay(0) }}>{s.headline}</div>}
        <div className="expv-chips">
          {(s.nodes || []).map((n, k) => (
            <React.Fragment key={k}>
              <div className="expv-chip expv-a" style={delay(k + 1)}>{n}</div>
              {k < (s.nodes!.length - 1) && <span className="expv-arr expv-a" style={delay(k + 1)}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </>);
    case 'compare':
      return (<>
        {s.headline && <div className="expv-h expv-a" style={{ fontSize: 'clamp(20px,4vw,27px)', ...delay(0) }}>{s.headline}</div>}
        <div className="expv-cols">
          {(s.columns || []).map((c, k) => (
            <div key={k} className="expv-col expv-a" style={delay(k + 1)}>
              <h4>{c.title}</h4>
              {c.points.map((p, j) => <div key={j} className="p"><b>—</b>{p}</div>)}
            </div>
          ))}
        </div>
      </>);
    case 'code':
      return (<>
        <div className="expv-kicker expv-a" style={delay(0)}>{s.kicker || 'Example'}</div>
        {s.headline && <div className="expv-h expv-a" style={{ fontSize: 'clamp(18px,3.2vw,23px)', ...delay(1) }}>{s.headline}</div>}
        <div className="expv-win expv-a" style={delay(2)}>
          <div className="expv-wbar">
            <span className="expv-d3" /><span className="expv-d3" /><span className="expv-d3" />
            <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'ui-monospace,monospace' }}>{s.lang || 'python'}</span>
          </div>
          <pre className="expv-pre">
            {(s.code || '').split('\n').map((ln, li) => (
              <div key={li} className="expv-a" style={{ animationDelay: `${0.22 + li * 0.08}s`, whiteSpace: 'pre' }}>{ln || ' '}</div>
            ))}
          </pre>
        </div>
      </>);
    case 'callout': {
      const stmt = s.text || s.headline;
      const tag = s.tag || (s.text ? s.headline : undefined);
      const c = TONE[s.tone || 'neutral'];
      return (<>
        {tag && <div className="expv-tag expv-a" style={{ color: c, border: `1px solid ${c}`, ...delay(0) }}>{tag}</div>}
        <div className="expv-callT expv-a" style={delay(1)}>{stmt}</div>
      </>);
    }
    default:
      return <div className="expv-h">{s.headline}</div>;
  }
};

export const ExplainerPlayer: React.FC<ExplainerPlayerProps> = ({ script }) => {
  useStyles();
  const scenes = script.scenes || [];
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [narrate, setNarrate] = useState(false);
  const [rate, setRate] = useState<number>(() => {
    try { return parseFloat(localStorage.getItem('de_explainer_rate') || '1') || 1; } catch { return 1; }
  });
  const last = scenes.length - 1;
  const fitRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const fit = () => {
    const f = fitRef.current, st = stageRef.current;
    if (!f || !st) return;
    f.style.transform = 'none';
    const cw = f.offsetWidth, ch = f.offsetHeight;
    const aw = st.clientWidth - 88, ah = st.clientHeight - 96;
    const s = Math.min(1, aw / cw, ah / ch);
    f.style.transform = s < 1 ? `scale(${s.toFixed(3)})` : 'none';
  };

  useLayoutEffect(() => { fit(); }, [i]);
  useEffect(() => {
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  // Unified scene timing + narration.
  // - Narration ON: speak the scene; advance only when the voice finishes (so it
  //   never gets cut off). Because rate changes how long the voice takes, the
  //   slide duration follows the chosen speed automatically. A backstop timer
  //   guards against browsers that don't fire `onend`.
  // - Narration OFF: advance on the fixed per-scene `seconds`.
  useEffect(() => {
    const scene = scenes[i];
    const supportsTTS = 'speechSynthesis' in window;
    const canSpeak = narrate && supportsTTS && !!scene?.narration;
    let endGap: number | undefined;
    let backstop: number | undefined;
    let sceneTimer: number | undefined;
    let advanced = false;
    const advance = () => { if (advanced) return; advanced = true; setI(v => (v < last ? v + 1 : v)); };

    if (canSpeak) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(scene!.narration!);
      u.rate = rate;
      if (playing) {
        u.onend = () => { endGap = window.setTimeout(advance, 450); };
        // Backstop: estimate speaking time (scaled by rate) in case onend never fires.
        const words = scene!.narration!.split(/\s+/).length;
        const estSec = (words / (2.6 * rate)) + 2;
        backstop = window.setTimeout(advance, Math.max(estSec * 1.8, 8) * 1000);
      }
      window.speechSynthesis.speak(u);
    } else if (playing) {
      if (i >= last) { setPlaying(false); }
      else { sceneTimer = window.setTimeout(() => setI(v => v + 1), (scene?.seconds || 5) * 1000); }
    }

    return () => {
      if (endGap) window.clearTimeout(endGap);
      if (backstop) window.clearTimeout(backstop);
      if (sceneTimer) window.clearTimeout(sceneTimer);
      if (supportsTTS) window.speechSynthesis.cancel();
    };
  }, [i, playing, narrate, rate, scenes, last]);

  useEffect(() => () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }, []);

  if (scenes.length === 0) return null;
  const scene = scenes[i];
  const accent = scene.accent || PALETTE[i % PALETTE.length];
  const go = (n: number) => { setPlaying(false); setI(Math.max(0, Math.min(last, n))); };
  const togglePlay = () => { if (i >= last) setI(0); setPlaying(p => !p); };
  const caption = scene.narration || scene.headline || '';

  const downloadPdf = () => {
    const esc = (s?: string) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const pages = scenes.map((s, idx) => {
      let body = '';
      if (s.subtitle) body += `<p>${esc(s.subtitle)}</p>`;
      if (s.items) body += '<ul>' + s.items.map(x => `<li>${esc(x)}</li>`).join('') + '</ul>';
      if (s.nodes) body += `<p><b>${s.nodes.map(esc).join('  →  ')}</b></p>`;
      if (s.columns) body += s.columns.map(c => `<p><b>${esc(c.title)}:</b> ${c.points.map(esc).join('; ')}</p>`).join('');
      if (s.code) body += `<pre>${esc(s.code)}</pre>`;
      if (s.text) body += `<p style="font-size:18px;font-weight:700">${esc(s.text)}</p>`;
      return `<div class="pg"><div class="k">${esc(s.kicker || s.tag || s.template)}</div><h2>${idx + 1}. ${esc(s.headline || '')}</h2>${body}<div class="n"><b>Narration:</b> ${esc(s.narration)}</div></div>`;
    }).join('');
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(script.title)} — CN-DESIGN</title>
<style>body{font-family:Inter,system-ui,sans-serif;color:#111;margin:0}
.hd{padding:18px 40px;border-bottom:2px solid #6366f1;font-weight:800;letter-spacing:.1em;color:#6366f1}
.pg{padding:36px 40px;page-break-after:always}.k{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#6366f1;font-weight:700}
h2{margin:4px 0 12px;font-size:22px}ul{margin:8px 0;padding-left:20px}li{margin:4px 0}
pre{background:#f4f4f5;padding:12px;border-radius:8px;overflow:auto;font-size:12px}
.n{margin-top:16px;color:#444;font-size:13px;line-height:1.5;border-top:1px solid #eee;padding-top:10px}
@media print{.hd{position:fixed;top:0;left:0;right:0}.pg{padding-top:70px}}</style></head>
<body><div class="hd">CN-DESIGN · ${esc(script.title)}</div>${pages}</body></html>`;
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(html); w.document.close(); w.focus();
    setTimeout(() => w.print(), 300);
  };

  return (
    <div className="expv-root glass-panel" style={{ overflow: 'hidden', background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', ['--ac' as string]: accent }}>
      <div className="expv-wrap">
        <div className="expv-brand"><img src="/logo.svg" alt="CN-DESIGN" /><span className="expv-wm">CN-DESIGN</span></div>
        <div className="expv-stage" ref={stageRef}>
          <div className="expv-fit" ref={fitRef} key={i}><SceneView s={scene} /></div>
        </div>
        <span style={{ position: 'absolute', top: 16, right: 16, fontSize: 11, color: 'var(--text-muted)', zIndex: 2 }}>{i + 1}/{scenes.length}</span>
      </div>

      <div style={{ height: 3, background: 'var(--bg-inner)' }}>
        <div style={{ height: '100%', width: `${last ? (i / last) * 100 : 0}%`, background: accent, transition: 'width .3s ease' }} />
      </div>

      <div style={{ padding: '13px 18px', minHeight: 48, display: 'flex', alignItems: 'center', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.5, background: 'var(--bg-inner)' }}>{caption}</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', flexWrap: 'wrap' }}>
        <button onClick={togglePlay} className="btn btn-primary" style={{ padding: '7px 14px', fontSize: 13 }}>
          {playing ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Play</>}
        </button>
        <button onClick={() => go(i - 1)} disabled={i === 0} className="btn btn-secondary" style={{ padding: '7px 10px', fontSize: 12, opacity: i === 0 ? 0.5 : 1 }}><SkipBack size={13} /></button>
        <button onClick={() => go(i + 1)} disabled={i === last} className="btn btn-secondary" style={{ padding: '7px 10px', fontSize: 12, opacity: i === last ? 0.5 : 1 }}><SkipForward size={13} /></button>
        <button onClick={() => go(0)} className="btn btn-secondary" style={{ padding: '7px 10px', fontSize: 12 }}><RotateCcw size={13} /></button>
        <button onClick={() => setNarrate(n => !n)} className="btn btn-secondary" style={{ padding: '7px 12px', fontSize: 12 }} title="Read aloud (browser voice)">
          {narrate ? <><Volume2 size={13} /> Narration: On</> : <><VolumeX size={13} /> Narration: Off</>}
        </button>
        <select
          value={rate}
          onChange={(e) => { const v = parseFloat(e.target.value); setRate(v); try { localStorage.setItem('de_explainer_rate', String(v)); } catch { /* ignore */ } }}
          aria-label="Narration speed"
          title="Narration speed"
          style={{ padding: '7px 10px', fontSize: 12, borderRadius: 8, border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color: 'var(--text-primary)', cursor: 'pointer' }}
        >
          <option value={0.5}>0.50×</option>
          <option value={0.75}>0.75×</option>
          <option value={1}>1×</option>
          <option value={1.25}>1.25×</option>
        </select>
        <button onClick={downloadPdf} className="btn btn-secondary" style={{ padding: '7px 12px', fontSize: 12 }} title="Download as PDF slides"><Download size={13} /> PDF</button>
        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
          {scenes.map((_, idx) => (
            <button key={idx} onClick={() => go(idx)} aria-label={`Scene ${idx + 1}`} style={{ width: 8, height: 8, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer', background: idx === i ? accent : 'var(--border-glass)' }} />
          ))}
        </div>
      </div>
    </div>
  );
};
