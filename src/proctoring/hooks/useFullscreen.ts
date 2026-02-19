import { useEffect, useState } from 'react';

interface UseFullscreenProps {
  onViolation: (reason: string) => void;
}

export function useFullscreen({ onViolation }: UseFullscreenProps) {
  const [isFullscreen, setIsFullscreen] = useState(
    () => document.fullscreenElement !== null
  );
  const [error, setError] = useState<string | null>(null);

  const enterFullscreen = async (): Promise<boolean> => {
    try {
      setError(null);

      if (!document.documentElement.requestFullscreen) {
        throw new Error('Fullscreen API not supported');
      }

      await document.documentElement.requestFullscreen();
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unknown fullscreen error';

      console.error('Fullscreen enter error:', err);
      setError(`Failed to enter fullscreen: ${message}`);
      return false;
    }
  };

  const exitFullscreen = async (): Promise<void> => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Exit fullscreen error:', err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const currentlyFullscreen = document.fullscreenElement !== null;
      setIsFullscreen(currentlyFullscreen);

      if (!currentlyFullscreen) {
        onViolation('Exited fullscreen mode');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onViolation]);

  return {
    isFullscreen,
    error,
    enterFullscreen,
    exitFullscreen,
  };
}
