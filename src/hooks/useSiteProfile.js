import useAppStore from '../store/useAppStore';
import { staticProfile } from '../content/index.js';

export const useSiteProfile = () => {
  const userProfile = useAppStore((state) => state.userProfile);

  if (!userProfile) return staticProfile;

  const merged = { ...staticProfile };
  for (const [key, value] of Object.entries(userProfile)) {
    if (value !== null && value !== undefined && key !== 'id' && key !== 'updated_at') {
      merged[key] = value;
    }
  }
  return merged;
};
