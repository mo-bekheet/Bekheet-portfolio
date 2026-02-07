// Content Manager Utility
import { 
  profile, 
  skills, 
  education, 
  experiences, 
  projects, 
  certifications,
  contentCategories 
} from './index.js';

class ContentManager {
  constructor() {
    this.content = {
      [contentCategories.PROFILE]: profile,
      [contentCategories.SKILLS]: skills,
      [contentCategories.EDUCATION]: education,
      [contentCategories.EXPERIENCES]: experiences,
      [contentCategories.PROJECTS]: projects,
      [contentCategories.CERTIFICATIONS]: certifications
    };
  }

  /**
   * Get content by category
   * @param {string} category - The content category to retrieve
   * @returns {Object|Array} The content data
   */
  getContent(category) {
    if (!this.content[category]) {
      throw new Error(`Content category '${category}' does not exist`);
    }
    return this.content[category];
  }

  /**
   * Get all content
   * @returns {Object} All content organized by category
   */
  getAllContent() {
    return this.content;
  }

  /**
   * Search content by keyword
   * @param {string} keyword - The keyword to search for
   * @param {string} category - Optional category to search within
   * @returns {Array} Array of matching content items
   */
  search(keyword, category = null) {
    const searchResults = [];
    const searchTerm = keyword.toLowerCase();
    
    const searchInCategory = (cat, data) => {
      if (Array.isArray(data)) {
        data.forEach(item => {
          if (this.matchesSearchTerm(item, searchTerm)) {
            searchResults.push({ category: cat, item });
          }
        });
      } else if (typeof data === 'object') {
        Object.entries(data).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(subItem => {
              if (this.matchesSearchTerm(subItem, searchTerm)) {
                searchResults.push({ category: cat, item: subItem, section: key });
              }
            });
          } else if (typeof value === 'object') {
            if (this.matchesSearchTerm(value, searchTerm)) {
              searchResults.push({ category: cat, item: value, section: key });
            }
          }
        });
      }
    };

    if (category) {
      if (this.content[category]) {
        searchInCategory(category, this.content[category]);
      }
    } else {
      Object.entries(this.content).forEach(([cat, data]) => {
        searchInCategory(cat, data);
      });
    }

    return searchResults;
  }

  /**
   * Helper method to check if an item matches the search term
   * @private
   */
  matchesSearchTerm(item, searchTerm) {
    if (typeof item === 'string') {
      return item.toLowerCase().includes(searchTerm);
    }
    
    if (typeof item === 'object') {
      return Object.values(item).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm);
        } else if (typeof value === 'object') {
          return this.matchesSearchTerm(value, searchTerm);
        } else if (Array.isArray(value)) {
          return value.some(arrItem => this.matchesSearchTerm(arrItem, searchTerm));
        }
        return false;
      });
    }
    
    return false;
  }

  /**
   * Get featured projects
   * @returns {Array} Featured projects
   */
  getFeaturedProjects() {
    return this.getContent(contentCategories.PROJECTS).filter(project => project.featured);
  }

  /**
   * Get certifications by category
   * @param {string} category - Certification category
   * @returns {Array} Certifications in the specified category
   */
  getCertificationsByCategory(category) {
    return this.getContent(contentCategories.CERTIFICATIONS).filter(cert => 
      cert.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Get most recent experiences
   * @param {number} count - Number of experiences to return
   * @returns {Array} Most recent experiences
   */
  getRecentExperiences(count = 3) {
    // Sort experiences by date (assuming we add date parsing logic)
    return this.getContent(contentCategories.EXPERIENCES).slice(0, count);
  }
}

// Create a singleton instance
const contentManager = new ContentManager();

export default contentManager;
export { ContentManager, contentCategories };