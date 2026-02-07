import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useFirestore } from '../hooks/useFirestore';
import './About.css';

const About = () => {
  const { documents: profileData, loading: profileLoading } = useFirestore('profiles');
  const { documents: skillsData, loading: skillsLoading } = useFirestore('skills');
  const { documents: experienceData, loading: experienceLoading } = useFirestore('experience');
  const { documents: educationData, loading: educationLoading } = useFirestore('education');

  if (profileLoading || skillsLoading || experienceLoading || educationLoading) {
    return <div className="loading">Loading about information...</div>;
  }

  const profile = profileData.length > 0 ? profileData[0] : null;
  const skills = skillsData || [];
  const experience = experienceData || [];
  const education = educationData || [];

  return (
    <Container fluid className="about-section">
      <Container>
        <Row style={{ justifyContent: 'center', padding: '10px' }}>
          <Col
            md={7}
            style={{
              justifyContent: 'center',
              paddingTop: '30px',
              paddingBottom: '50px',
            }}
          >
            <h1 style={{ fontSize: '2.1em', paddingBottom: '20px' }}>
              Discover Who <strong className="purple">I'M</strong>
            </h1>
            <div className="about-card">
              <p>{profile?.bio || 'Loading bio...'}</p>
            </div>
          </Col>
          <Col
            md={5}
            style={{ paddingTop: '120px', paddingBottom: '50px' }}
          >
            <div className="about-animation-placeholder">
              <p>Animation would go here</p>
            </div>
          </Col>
        </Row>

        <h2>Experience</h2>
        {experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.title} at {exp.company}</h3>
            <p>{exp.startDate} - {exp.endDate || 'Present'}</p>
            <p>{exp.description}</p>
          </div>
        ))}

        <h2>Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <span>{skill.name}</span>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Container>
  );
};

export default About;