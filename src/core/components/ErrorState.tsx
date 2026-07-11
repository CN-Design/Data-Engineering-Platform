import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

// Shared, retry-able error state for failed loads across all domains.
export const ErrorState: React.FC<{ onRetry?: () => void; message?: string }> = ({ onRetry, message }) => (
  <div style={{ maxWidth: 520, margin: '48px auto', textAlign: 'center', padding: 28, border: '1px solid rgba(239,68,68,0.3)', borderRadius: 14, background: 'rgba(239,68,68,0.06)' }}>
    <AlertTriangle size={28} color="#ef4444" />
    <h3 style={{ margin: '12px 0 6px', color: 'var(--text-primary)' }}>Couldn't load this</h3>
    <p style={{ margin: '0 0 16px', color: 'var(--text-secondary)', fontSize: 14 }}>{message || 'The request failed — usually a temporary network issue, not missing content.'}</p>
    {onRetry && (
      <button onClick={onRetry} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 10, border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>
        <RefreshCw size={15} /> Try again
      </button>
    )}
  </div>
);
