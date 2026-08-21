import { useEffect, useState } from 'react';
import useAppStore from '../store/useAppStore';
import { staticSections } from '../content/index.js';
import { sectionApis } from '../lib/api';

export const useContent = (section) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cachedContent = useAppStore((state) => state.content[section]);
  const setCachedContent = useAppStore((state) => state.setContent);

  useEffect(() => {
    let mounted = true;

    if (cachedContent) {
      setLoading(false);
      return undefined;
    }

    sectionApis[section]
      .list()
      .then((data) => {
        if (!mounted) return;
        setCachedContent(section, data?.length ? data : staticSections[section]);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setCachedContent(section, staticSections[section]);
        setError(err);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [section, cachedContent, setCachedContent]);

  return { content: cachedContent, loading, error };
};

export const useAllContent = () => {
  return { content: staticSections, loading: false, error: null };
};
