import { useEffect, useState } from 'react';

interface UseClipboardGuardProps {
  onViolation: (reason: string) => void;
  enabled: boolean;
}

export function useClipboardGuard({
  onViolation,
  enabled,
}: UseClipboardGuardProps) {
  const [clipboardAttemptDetected, setClipboardAttemptDetected] =
    useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleClipboardEvent = (event: ClipboardEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (!clipboardAttemptDetected) {
        setClipboardAttemptDetected(true);
        onViolation('Clipboard action attempted (copy/cut/paste blocked)');
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();

      if (!clipboardAttemptDetected) {
        setClipboardAttemptDetected(true);
        onViolation('Context menu (right-click) attempted');
      }
    };

    document.addEventListener('copy', handleClipboardEvent, true);
    document.addEventListener('cut', handleClipboardEvent, true);
    document.addEventListener('paste', handleClipboardEvent, true);
    document.addEventListener('contextmenu', handleContextMenu, true);

    return () => {
      document.removeEventListener('copy', handleClipboardEvent, true);
      document.removeEventListener('cut', handleClipboardEvent, true);
      document.removeEventListener('paste', handleClipboardEvent, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
    };
  }, [enabled, onViolation, clipboardAttemptDetected]);

  return {
    clipboardAttemptDetected,
  };
}
