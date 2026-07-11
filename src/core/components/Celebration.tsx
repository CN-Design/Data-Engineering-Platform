import React, { useEffect, useRef, useState } from 'react';
import { Trophy, CheckCircle2, Star, Zap } from 'lucide-react';
import { CELEBRATE_EVENT, type CelebrateDetail, type CelebrateKind } from '../lib/celebrate';

// Mounted once at the app root. Listens for celebrate() events and renders a
// stacked toast + a one-shot confetti burst. Honors prefers-reduced-motion
// (confetti is skipped; the toast still shows).

interface Toast extends CelebrateDetail { id: number; }

const ICON: Record<CelebrateKind, React.ComponentType<{ size?: number; color?: string }>> = {
  topic: CheckCircle2,
  challenge: Zap,
  level: Star,
  achievement: Trophy,
};
const ACCENT: Record<CelebrateKind, string> = {
  topic: '#10b981',
  challenge: '#8b5cf6',
  level: '#f59e0b',
  achievement: '#f59e0b',
};

const prefersReducedMotion = () => {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
};

function fireConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);
  const W = window.innerWidth, H = window.innerHeight;
  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];
  const N = 120;
  const parts = Array.from({ length: N }, () => ({
    x: W / 2 + (Math.random() - 0.5) * 120,
    y: H * 0.32,
    vx: (Math.random() - 0.5) * 11,
    vy: Math.random() * -13 - 4,
    size: Math.random() * 6 + 4,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    color: colors[(Math.random() * colors.length) | 0],
    life: 0,
  }));
  const start = performance.now();
  const tick = (now: number) => {
    const t = now - start;
    ctx.clearRect(0, 0, W, H);
    let alive = 0;
    for (const p of parts) {
      p.vy += 0.32; // gravity
      p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life = t;
      const alpha = Math.max(0, 1 - t / 1600);
      if (alpha <= 0 || p.y > H + 20) continue;
      alive++;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }
    if (alive > 0 && t < 1800) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, W, H);
  };
  requestAnimationFrame(tick);
}

export const Celebration: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    const onCelebrate = (e: Event) => {
      const detail = (e as CustomEvent<CelebrateDetail>).detail;
      if (!detail || !detail.title) return;
      const id = nextId.current++;
      setToasts((cur) => [...cur, { ...detail, id }].slice(-3));
      setTimeout(() => setToasts((cur) => cur.filter((t) => t.id !== id)), 3200);
      // Confetti only for the big moments, and only if motion is allowed.
      const kind = detail.kind ?? 'topic';
      if (!prefersReducedMotion() && canvasRef.current && (kind === 'level' || kind === 'achievement' || kind === 'challenge')) {
        fireConfetti(canvasRef.current);
      }
    };
    window.addEventListener(CELEBRATE_EVENT, onCelebrate as EventListener);
    return () => window.removeEventListener(CELEBRATE_EVENT, onCelebrate as EventListener);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9998 }} />
      <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 9999, pointerEvents: 'none', width: 'min(92vw, 360px)' }}>
        {toasts.map((t) => {
          const kind = t.kind ?? 'topic';
          const Icon = ICON[kind];
          const accent = ACCENT[kind];
          return (
            <div key={t.id} className="cn-toast" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 14, border: `1px solid ${accent}55`, background: 'var(--bg-glass, rgba(20,20,30,0.9))', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', boxShadow: '0 12px 40px rgba(0,0,0,0.35)' }}>
              <span style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${accent}22`, border: `1px solid ${accent}55` }}>
                <Icon size={20} color={accent} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 14.5, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.title}</div>
                {t.subtitle && <div style={{ fontSize: 12.5, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.subtitle}</div>}
              </div>
              {typeof t.xp === 'number' && t.xp > 0 && (
                <span style={{ flexShrink: 0, fontWeight: 800, fontSize: 12.5, color: accent, background: `${accent}18`, borderRadius: 999, padding: '4px 10px' }}>+{t.xp} XP</span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
