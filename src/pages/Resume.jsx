import React from 'react';
import { Container } from 'react-bootstrap';
import './Resume.css';

const Resume = () => {
  return (
    <Container fluid className="resume-section">
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Resume </strong>
        </h1>
        <p>Resume content will be loaded from Firebase.</p>
        <div className="resume-placeholder">
          <p>This section will display the resume fetched from Firestore.</p>
        </div>
      </Container>
    </Container>
  );
};

export default Resume;