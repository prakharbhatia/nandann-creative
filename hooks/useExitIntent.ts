import { useEffect, useRef } from 'react';

interface UseExitIntentOptions {
  enabled?: boolean;
  delay?: number;
  threshold?: number;
  sensitivity?: number;
}

export function useExitIntent(
  callback: () => void,
  options: UseExitIntentOptions = {}
) {
  const {
    enabled = true,
    delay = 0,
    threshold = 75,
    sensitivity = 10
  } = options;

  const mouseY = useRef<number>(0);
  const hasTriggered = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Only track if mouse is moving towards top
      if (e.clientY <= threshold && mouseY.current > e.clientY) {
        const distance = mouseY.current - e.clientY;
        
        // If mouse is moving up fast enough towards top of screen
        if (distance > sensitivity) {
          if (!hasTriggered.current && timeoutRef.current === undefined) {
            // Small delay to avoid false triggers
            timeoutRef.current = setTimeout(() => {
              hasTriggered.current = true;
              callback();
            }, delay);
          }
        }
      }
      
      mouseY.current = e.clientY;
    };

    // Reset trigger after some time
    const resetTrigger = () => {
      hasTriggered.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    };

    const handleMouseLeave = () => {
      resetTrigger();
    };

    const handleFocusOut = () => {
      resetTrigger();
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleFocusOut);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleFocusOut);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, enabled, delay, threshold, sensitivity]);

  // Reset function to manually reset the trigger
  const reset = () => {
    hasTriggered.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  };

  return { reset };
}
