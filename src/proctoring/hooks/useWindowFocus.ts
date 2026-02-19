import { useEffect, useState } from 'react';

interface UseWindowFocusProps {
  onViolation: (reason: string) => void;
}

export function useWindowFocus({ onViolation }: UseWindowFocusProps) {
  const [isFocused, setIsFocused] = useState(() => document.hasFocus());
  const [hasViolated, setHasViolated] = useState(false);

  useEffect(() => {
    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);

      if (!hasViolated) {
        setHasViolated(true);
        onViolation('Browser window lost focus (alt-tab or app switch)');
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [onViolation, hasViolated]);

  return {
    isFocused,
    hasViolated,
  };
}
