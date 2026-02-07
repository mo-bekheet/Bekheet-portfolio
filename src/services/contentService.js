// Content service for managing portfolio content
import { 
  readCollection, 
  getProfileContent, 
  getProjects, 
  getSkills, 
  getExperience,
  createDocument,
  updateDocument
} from '../lib/db';

// Content retrieval functions
export const fetchProfileContent = async () => {
  try {
    return await getProfileContent();
  } catch (error) {
    console.error('Error fetching profile content:', error);
    throw error;
  }
};

export const fetchProjects = async () => {
  try {
    return await getProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const fetchSkills = async () => {
  try {
    return await getSkills();
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
};

export const fetchExperience = async () => {
  try {
    return await getExperience();
  } catch (error) {
    console.error('Error fetching experience:', error);
    throw error;
  }
};

export const fetchContentByType = async (contentType) => {
  try {
    return await readCollection(contentType);
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    throw error;
  }
};

// Content management functions
export const saveContent = async (contentType, contentData) => {
  try {
    return await createDocument(contentType, contentData);
  } catch (error) {
    console.error(`Error saving ${contentType}:`, error);
    throw error;
  }
};

export const updateContent = async (contentType, docId, contentData) => {
  try {
    return await updateDocument(contentType, docId, contentData);
  } catch (error) {
    console.error(`Error updating ${contentType}:`, error);
    throw error;
  }
};

// Migration helper functions
export const migrateContentToFirestore = async (contentData) => {
  const { profile, projects, skills, experience, certifications, testimonials } = contentData;
  
  try {
    // Migrate profile
    if (profile) {
      await saveContent('profiles', profile);
    }
    
    // Migrate projects
    if (projects && Array.isArray(projects)) {
      for (const project of projects) {
        await saveContent('projects', project);
      }
    }
    
    // Migrate skills
    if (skills && Array.isArray(skills)) {
      for (const skill of skills) {
        await saveContent('skills', skill);
      }
    }
    
    // Migrate experience
    if (experience && Array.isArray(experience)) {
      for (const exp of experience) {
        await saveContent('experience', exp);
      }
    }
    
    // Migrate certifications
    if (certifications && Array.isArray(certifications)) {
      for (const cert of certifications) {
        await saveContent('certifications', cert);
      }
    }
    
    // Migrate testimonials
    if (testimonials && Array.isArray(testimonials)) {
      for (const testimonial of testimonials) {
        await saveContent('testimonials', testimonial);
      }
    }
    
    console.log('Content migration completed successfully');
    return true;
  } catch (error) {
    console.error('Error during content migration:', error);
    throw error;
  }
};