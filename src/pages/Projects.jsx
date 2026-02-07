import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useFirestore } from '../hooks/useFirestore';
import ProjectCard from '../components/ui/ProjectCard'; // We'll create this next
import './Projects.css';

const Projects = () => {
  const { documents: projects, loading, error } = useFirestore('projects');

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">Error loading projects: {error.message}</div>;

  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: 'white' }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: 'center', paddingBottom: '10px' }}>
          {projects.map((project, index) => (
            <Col md={4} className="project-card" key={index}>
              <ProjectCard
                imgPath={project.imageUrl}
                isBlog={false}
                title={project.title}
                description={project.description}
                ghLink={project.githubUrl}
                demoLink={project.demoUrl}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Projects;