// Content index - Centralized export of all content modules
export { profile } from './data/profile.js';
export { skills } from './data/skills.js';
export { education } from './data/education.js';
export { experiences } from './data/experiences.js';
export { projects } from './data/projects.js';
export { certifications } from './data/certifications.js';

// Export all content as a single object
export const content = {
  profile,
  skills,
  education,
  experiences,
  projects,
  certifications
};

// Export content categories
export const contentCategories = {
  PROFILE: 'profile',
  SKILLS: 'skills',
  EDUCATION: 'education',
  EXPERIENCES: 'experiences',
  PROJECTS: 'projects',
  CERTIFICATIONS: 'certifications'
};