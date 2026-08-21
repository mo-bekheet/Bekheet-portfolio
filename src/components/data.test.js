import { describe, it, expect } from 'vitest';
import { certifications } from './Certificate/certificationData.js';
import { projectData } from './Projects/projectsData.js';

describe('certificationData', () => {
  it('contains 13 certifications', () => {
    expect(certifications).toHaveLength(13);
  });

  it('each certification has required fields', () => {
    certifications.forEach((cert) => {
      expect(cert.title).toBeTruthy();
      expect(cert.img).toBeTruthy();
      expect(cert.description).toBeTruthy();
      expect(cert.issueDate === undefined || cert.issueDate.length > 0).toBe(true);
      expect(cert.expiryDate === undefined || cert.expiryDate.length > 0).toBe(true);
    });
  });

  it.todo('every certification declares an issue date (Deep Learning Nanodegree is missing one)');

  it('titles are unique', () => {
    const titles = certifications.map((c) => c.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});

describe('projectData', () => {
  it('contains 9 projects', () => {
    expect(projectData).toHaveLength(9);
  });

  it('each project has title, description and GitHub link', () => {
    projectData.forEach((p) => {
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.ghLink).toMatch(/^https?:\/\//);
    });
  });

  it('titles are unique', () => {
    const titles = projectData.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
