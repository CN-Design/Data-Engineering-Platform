// Client-side progress backup/restore for the Data Engineering domain.
// Exports every `de_*` localStorage key to a JSON file and restores from one.
// Purely local — no backend, no accounts. Blunts the "cache clear wipes
// everything" problem and enables moving progress between browsers/devices.

const KEY_PREFIX = 'de_';

export interface BackupPayload {
  app: 'data-engineering-platform';
  version: 1;
  exportedAt: string;
  data: Record<string, string>;
}

const collect = (): Record<string, string> => {
  const data: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(KEY_PREFIX)) {
      const v = localStorage.getItem(k);
      if (v !== null) data[k] = v;
    }
  }
  return data;
};

/** Download a JSON backup of all local DE progress. Returns number of keys saved. */
export const exportProgress = (): number => {
  const data = collect();
  const payload: BackupPayload = {
    app: 'data-engineering-platform',
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `de-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return Object.keys(data).length;
};

/** Restore progress from a backup file. Writes `de_*` keys back to localStorage. */
export const importProgress = async (file: File): Promise<number> => {
  const text = await file.text();
  let payload: unknown;
  try { payload = JSON.parse(text); } catch { throw new Error('That file is not valid JSON.'); }
  const data = (payload as BackupPayload | null)?.data;
  if (!data || typeof data !== 'object') throw new Error('This does not look like a DE progress backup.');
  let restored = 0;
  Object.entries(data).forEach(([k, v]) => {
    if (k.startsWith(KEY_PREFIX) && typeof v === 'string') {
      try { localStorage.setItem(k, v); restored++; } catch { /* ignore */ }
    }
  });
  if (restored === 0) throw new Error('No progress entries found in that file.');
  return restored;
};
