import { useEffect } from 'react';

// Accessibility helper for dialogs/overlays: closes on the Escape key.
// Pair with role="dialog" aria-modal and an autofocused control inside.
export function useEscapeToClose(onClose: () => void): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);
}
