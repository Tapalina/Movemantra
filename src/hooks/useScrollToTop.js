import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top on route change, or to the #hash target when present.
 * Pages are lazy-loaded, so the hash target may not exist yet – retry briefly before giving up.
 */
export function useScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }

    let attempts = 0;
    let timer;
    const tryScroll = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ block: 'start' });
      } else if (attempts++ < 20) {
        timer = setTimeout(tryScroll, 50);
      }
    };
    tryScroll();
    return () => clearTimeout(timer);
  }, [pathname, hash]);
}
