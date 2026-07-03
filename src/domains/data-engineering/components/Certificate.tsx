import React, { useState } from 'react';
import { X, Download, Award } from 'lucide-react';
import { useEscapeToClose } from '../utils/useEscapeToClose';

interface CertificateProps {
  label: string;               // e.g. "Advanced SQL" or "Data Engineering"
  kind?: 'track' | 'domain';
  onClose: () => void;
}

const NAME_KEY = 'de_cert_name';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Self-contained SVG (fixed colors so the downloaded file renders anywhere).
const buildCertSvg = (name: string, label: string, kind: 'track' | 'domain', dateStr: string): string => {
  const who = esc(name.trim() || 'Data Engineering Learner');
  const line = kind === 'domain'
    ? 'has completed the Data Engineering curriculum'
    : 'has completed the track';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 580" width="820" height="580" font-family="Georgia, 'Times New Roman', serif">
  <rect width="820" height="580" fill="#0b1220"/>
  <rect x="24" y="24" width="772" height="532" rx="14" fill="#0f172a" stroke="#c8a24a" stroke-width="3"/>
  <rect x="38" y="38" width="744" height="504" rx="10" fill="none" stroke="#1e293b" stroke-width="1.5"/>
  <text x="410" y="120" text-anchor="middle" fill="#c8a24a" font-size="20" letter-spacing="4">CERTIFICATE OF COMPLETION</text>
  <line x1="300" y1="140" x2="520" y2="140" stroke="#c8a24a" stroke-width="1.5"/>
  <text x="410" y="200" text-anchor="middle" fill="#94a3b8" font-size="16">This certifies that</text>
  <text x="410" y="256" text-anchor="middle" fill="#f8fafc" font-size="40" font-weight="bold">${who}</text>
  <text x="410" y="300" text-anchor="middle" fill="#94a3b8" font-size="16">${line}</text>
  <text x="410" y="352" text-anchor="middle" fill="#60a5fa" font-size="30" font-weight="bold">${esc(label)}</text>
  <text x="410" y="430" text-anchor="middle" fill="#64748b" font-size="14">Issued ${esc(dateStr)}</text>
  <text x="410" y="500" text-anchor="middle" fill="#475569" font-size="13" letter-spacing="2">DATA ENGINEERING LEARNING PLATFORM</text>
</svg>`;
};

export const Certificate: React.FC<CertificateProps> = ({ label, kind = 'track', onClose }) => {
  const [name, setName] = useState<string>(() => {
    try { return localStorage.getItem(NAME_KEY) || ''; } catch { return ''; }
  });
  useEscapeToClose(onClose);
  const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const svg = buildCertSvg(name, label, kind, dateStr);

  const download = () => {
    try { localStorage.setItem(NAME_KEY, name); } catch { /* ignore */ }
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.svg`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Certificate"
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 210, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div onClick={e => e.stopPropagation()} className="glass-panel animate-slide-up"
        style={{ width: '100%', maxWidth: 560, padding: 22, background: 'var(--bg-secondary)', position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <button onClick={onClose} aria-label="Close" autoFocus style={{ position: 'absolute', top: 14, right: 14, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Award size={20} color="#c8a24a" />
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>Your certificate</h3>
        </div>

        <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border-glass)' }}
          dangerouslySetInnerHTML={{ __html: svg }} />

        <label style={{ fontSize: 12.5, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          Name on certificate
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            style={{ background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', borderRadius: 8, padding: '9px 12px', color: 'var(--text-primary)', fontSize: 14 }}
          />
        </label>

        <button onClick={download} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '9px 16px' }}>
          <Download size={15} /> Download (SVG)
        </button>
        <p style={{ margin: 0, fontSize: 11.5, color: 'var(--text-muted)' }}>Open the SVG in any browser and print to PDF, or attach it directly to your portfolio.</p>
      </div>
    </div>
  );
};
