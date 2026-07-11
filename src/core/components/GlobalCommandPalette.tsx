import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Category } from '../types/types';
import { Search, CornerDownLeft } from 'lucide-react';

export type DomainId = 'frontend' | 'backend-engineering' | 'ai-agents' | 'data-engineering';
export interface PaletteItem { domain: DomainId; tech: Category; id: string; title: string; techTitle: string; }

interface Props {
  onOpen: (item: PaletteItem) => void;
  getIndex: () => Promise<PaletteItem[]>;
}

const DOMAIN_META: Record<DomainId, { label: string; color: string }> = {
  'frontend': { label: 'Frontend', color: '#10b981' },
  'data-engineering': { label: 'Data', color: '#3b82f6' },
  'backend-engineering': { label: 'Backend', color: '#00ADD8' },
  'ai-agents': { label: 'AI', color: '#8b5cf6' },
};

// Global ⌘K / Ctrl-K palette: fuzzy-jump to any lesson across every domain.
export const GlobalCommandPalette: React.FC<Props> = ({ onOpen, getIndex }) => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [items, setItems] = useState<PaletteItem[]>([]);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o); }
      else if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  useEffect(() => {
    if (!open || items.length) return;
    getIndex().then(list => setItems(list)).catch(() => setItems([]));
  }, [open, items.length, getIndex]);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 20); else { setQ(''); setActive(0); } }, [open]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = !needle ? items : items.filter(it =>
      it.title.toLowerCase().includes(needle) || it.techTitle.toLowerCase().includes(needle) || DOMAIN_META[it.domain].label.toLowerCase().includes(needle));
    return list.slice(0, 30);
  }, [q, items]);

  useEffect(() => { setActive(0); }, [q]);

  if (!open) return null;

  const choose = (it?: PaletteItem) => { if (!it) return; onOpen(it); setOpen(false); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(filtered.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(0, a - 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); choose(filtered[active]); }
  };

  return (
    <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '12vh' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 'min(640px, 92vw)', background: 'var(--bg-primary, #0b1220)', border: '1px solid var(--border-glass)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 24px 60px -20px rgba(0,0,0,0.6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: '1px solid var(--border-glass)' }}>
          <Search size={18} color="var(--text-muted)" />
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} onKeyDown={onKey}
            placeholder="Jump to any lesson — search across all domains…"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: 'var(--text-primary)', fontSize: 15 }} />
          <kbd style={{ fontSize: 11, color: 'var(--text-muted)', border: '1px solid var(--border-glass)', borderRadius: 5, padding: '2px 6px' }}>Esc</kbd>
        </div>
        <div style={{ maxHeight: '54vh', overflowY: 'auto', padding: 6 }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>{items.length === 0 ? 'Indexing lessons…' : `No lessons match "${q}".`}</div>
          ) : filtered.map((it, i) => {
            const m = DOMAIN_META[it.domain];
            return (
              <button key={`${it.domain}/${it.id}`} onMouseEnter={() => setActive(i)} onClick={() => choose(it)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', background: i === active ? 'rgba(59,130,246,0.16)' : 'transparent', color: 'var(--text-primary)' }}>
                <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px', color: m.color, minWidth: 60 }}>{m.label}</span>
                <span style={{ fontSize: 11.5, color: 'var(--text-muted)', minWidth: 92, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.techTitle}</span>
                <span style={{ fontSize: 14, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.title}</span>
                {i === active && <CornerDownLeft size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
