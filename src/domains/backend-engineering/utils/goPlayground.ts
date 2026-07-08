// Open Go code in the official Go Playground (go.dev/play) — free, no backend.
//
// The Playground's share endpoint (go.dev/_/share) sends
// `Access-Control-Allow-Origin: *`, so from the browser we can POST the code,
// get a snippet id back, and open a real deep link (one click). If that fails
// (offline / network / policy change), we fall back to copying the code and
// opening a blank Playground for a manual paste.
//
// Note: the Go Playground runs the STANDARD LIBRARY only — great for the core
// language + the stdlib coding challenges, but it will not build snippets that
// import third-party modules (gin, gorm, go-redis, …). Those must be run locally.

export type PlaygroundResult = 'shared' | 'copied';

export async function openInGoPlayground(code: string): Promise<PlaygroundResult> {
  // Open the tab synchronously (inside the click handler) so it isn't treated
  // as a blocked popup; we navigate it once we have a URL.
  const tab = window.open('about:blank', '_blank');

  try {
    const res = await fetch('https://go.dev/_/share', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: code,
    });
    if (res.ok) {
      const id = (await res.text()).trim();
      if (id) {
        const url = `https://go.dev/play/p/${id}`;
        if (tab) tab.location.href = url;
        else window.open(url, '_blank', 'noopener,noreferrer');
        return 'shared';
      }
    }
  } catch {
    /* CORS/network/policy — fall through to the copy+open fallback */
  }

  // Fallback: copy the code and open a blank Playground to paste into.
  try { await navigator.clipboard.writeText(code); } catch { /* clipboard may be unavailable */ }
  if (tab) tab.location.href = 'https://go.dev/play/';
  else window.open('https://go.dev/play/', '_blank', 'noopener,noreferrer');
  return 'copied';
}
