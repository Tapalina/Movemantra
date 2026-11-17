import { useEffect } from 'react';

/** Prevents background scrolling while `locked` is true (e.g. mobile menu open). */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
}
