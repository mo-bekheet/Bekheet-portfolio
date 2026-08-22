import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackLinkClick, trackPageView } from '../lib/api';

const TRACKABLE_HREF = /^(https?:|mailto:|tel:)/i;

export function usePageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return undefined;
    trackPageView(location.pathname);
    return undefined;
  }, [location.pathname]);
}

export function useOutboundClickTracker() {
  const location = useLocation();

  useEffect(() => {
    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (location.pathname.startsWith('/admin')) return;

      const anchor = event.target?.closest?.('a[href]');
      if (!anchor) return;

      const href = anchor.getAttribute('href') ?? '';
      if (!TRACKABLE_HREF.test(href)) return;

      let external = /^(mailto:|tel:)/i.test(href) || /\.pdf($|\?)/i.test(href);
      if (!external) {
        try {
          external = new URL(href, window.location.href).host !== window.location.host;
        } catch {
          external = false;
        }
      }
      if (!external) return;

      trackLinkClick(href, location.pathname);
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [location.pathname]);
}

export default function useTracking() {
  usePageViewTracker();
  useOutboundClickTracker();
}
