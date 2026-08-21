import { useState, useEffect, useContext, createContext } from 'react';
import { onAuthChange } from '../lib/auth';
import { profileApi } from '../lib/api';
import useAppStore from '../store/useAppStore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const setUserProfile = useAppStore((state) => state.setUserProfile);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    let mounted = true;
    profileApi
      .get()
      .then((profile) => {
        if (mounted) setUserProfile(profile ?? null);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [setUserProfile]);

  const value = { currentUser };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
