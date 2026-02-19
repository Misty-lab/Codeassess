import { useEffect, useState } from 'react';

interface UseVisibilityProps {
  onViolation: (reason: string) => void;
}

export function useVisibility({ onViolation }: UseVisibilityProps) {
  const [isVisible, setIsVisible] = useState(
    () => document.visibilityState === 'visible'
  );
  const [hasViolated, setHasViolated] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = document.visibilityState === 'visible';
      setIsVisible(visible);

      if (!visible && !hasViolated) {
        setHasViolated(true);
        onViolation('Tab switched or window minimized');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );
    };
  }, [onViolation, hasViolated]);

  return {
    isVisible,
    hasViolated,
  };
}
