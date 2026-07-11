import React from 'react';

// Shared loading skeleton used across all domains' tabs for a consistent,
// professional loading state (replaces bare "Loading…" spinner text).
export const LoadingBlock: React.FC<{ rows?: number; cards?: number; label?: string }> = ({ rows = 4, cards = 3, label = 'Loading…' }) => (
  <div style={{ maxWidth: 1000, margin: '0 auto', padding: '8px 0', width: '100%' }} aria-busy="true" aria-label={label}>
    <div className="cn-skel" style={{ height: 38, width: '55%', marginBottom: 18 }} />
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="cn-skel" style={{ height: 14, width: `${90 - i * 9}%`, marginBottom: 10 }} />
    ))}
    {cards > 0 && (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 18 }}>
        {Array.from({ length: cards }).map((_, i) => <div key={i} className="cn-skel" style={{ height: 84 }} />)}
      </div>
    )}
  </div>
);
