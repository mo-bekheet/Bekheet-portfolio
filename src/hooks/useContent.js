import { useEffect, useState } from 'react';
import useAppStore from '../store/useAppStore';
import { content as staticContent } from '../content/index.js';

/**
 * Hook to manage pulling content. 
 * Designed to cleanly switch to a real API fetch in the future if needed, 
 * but currently uses the static centralized content imported from /src/content.
 */
export const useContent = (section) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const cachedContent = useAppStore(state => state.content[section]);
  const setCachedContent = useAppStore(state => state.setContent);

  useEffect(() => {
    let isMounted = true;

    if (cachedContent) {
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        // Simulate a small network delay for smooth suspense/transitions 
        // OR mock if fetching from a real headless CMS eventually
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (isMounted) {
          const data = staticContent[section];
          if (!data) throw new Error(`Content section ${section} not found.`);
          setCachedContent(section, data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      isMounted = false;
    };
  }, [section, cachedContent, setCachedContent]);

  return { content: cachedContent, loading, error };
};

export const useAllContent = () => {
  return { content: staticContent, loading: false, error: null };
};
