// Tiny event bus for celebratory moments. Any component can fire a celebration
// with one line — no prop drilling — and the single mounted <Celebration/>
// listener renders the toast + confetti.

export type CelebrateKind = 'topic' | 'challenge' | 'level' | 'achievement';

export interface CelebrateDetail {
  title: string;
  subtitle?: string;
  xp?: number;
  kind?: CelebrateKind;
}

export const CELEBRATE_EVENT = 'cn-celebrate';

export function celebrate(detail: CelebrateDetail): void {
  try {
    window.dispatchEvent(new CustomEvent<CelebrateDetail>(CELEBRATE_EVENT, { detail }));
  } catch { /* non-browser / SSR — ignore */ }
}
