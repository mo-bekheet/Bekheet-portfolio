import { create } from 'zustand';

const useAppStore = create((set) => ({
  // UI State
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  
  isChatbotOpen: false,
  toggleChatbot: () => set((state) => ({ isChatbotOpen: !state.isChatbotOpen })),

  // Content Cache
  content: {
    profile: null,
    skills: null,
    projects: null,
    experience: null
  },
  setContent: (section, data) => set((state) => ({
    content: {
      ...state.content,
      [section]: data
    }
  })),

  // Auth / User State
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),

  // Global loading & errors
  loading: false,
  setLoading: (loading) => set({ loading }),
  
  error: null,
  setError: (error) => set({ error, loading: false })
}));

export default useAppStore;
