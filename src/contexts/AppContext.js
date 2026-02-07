// Global application context
import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  theme: 'dark',
  loading: false,
  error: null,
  userProfile: null,
  projects: [],
  skills: [],
  experience: [],
  certifications: [],
  testimonials: [],
  notifications: []
};

// Action types
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_PROJECTS = 'SET_PROJECTS';
const SET_SKILLS = 'SET_SKILLS';
const SET_EXPERIENCE = 'SET_EXPERIENCE';
const SET_CERTIFICATIONS = 'SET_CERTIFICATIONS';
const SET_TESTIMONIALS = 'SET_TESTIMONIALS';
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
const TOGGLE_THEME = 'TOGGLE_THEME';

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    case SET_SKILLS:
      return {
        ...state,
        skills: action.payload
      };
    case SET_EXPERIENCE:
      return {
        ...state,
        experience: action.payload
      };
    case SET_CERTIFICATIONS:
      return {
        ...state,
        certifications: action.payload
      };
    case SET_TESTIMONIALS:
      return {
        ...state,
        testimonials: action.payload
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, { id: Date.now(), ...action.payload }]
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      };
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const setLoading = (isLoading) => {
    dispatch({ type: SET_LOADING, payload: isLoading });
  };

  const setError = (error) => {
    dispatch({ type: SET_ERROR, payload: error });
  };

  const setUserProfile = (profile) => {
    dispatch({ type: SET_USER_PROFILE, payload: profile });
  };

  const setProjects = (projects) => {
    dispatch({ type: SET_PROJECTS, payload: projects });
  };

  const setSkills = (skills) => {
    dispatch({ type: SET_SKILLS, payload: skills });
  };

  const setExperience = (experience) => {
    dispatch({ type: SET_EXPERIENCE, payload: experience });
  };

  const setCertifications = (certifications) => {
    dispatch({ type: SET_CERTIFICATIONS, payload: certifications });
  };

  const setTestimonials = (testimonials) => {
    dispatch({ type: SET_TESTIMONIALS, payload: testimonials });
  };

  const addNotification = (notification) => {
    dispatch({ type: ADD_NOTIFICATION, payload: notification });
  };

  const removeNotification = (id) => {
    dispatch({ type: REMOVE_NOTIFICATION, payload: id });
  };

  const toggleTheme = () => {
    dispatch({ type: TOGGLE_THEME });
  };

  const value = {
    ...state,
    setLoading,
    setError,
    setUserProfile,
    setProjects,
    setSkills,
    setExperience,
    setCertifications,
    setTestimonials,
    addNotification,
    removeNotification,
    toggleTheme
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};