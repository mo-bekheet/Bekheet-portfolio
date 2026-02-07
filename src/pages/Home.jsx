import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useFirestore } from '../hooks/useFirestore';
import { useAppContext } from '../contexts/AppContext';
import Type from '../components/Home/Type'; // Assuming this exists in the new structure
import Tilt from 'react-parallax-tilt';
import './Home.css';

const Home = () => {
  const { documents: profileData, loading, error } = useFirestore('profiles');
  const { addNotification } = useAppContext();
  
  useEffect(() => {
    if (error) {
      addNotification({ type: 'error', message: 'Failed to load profile data' });
    }
  }, [error, addNotification]);

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">Error loading profile: {error.message}</div>;

  const profile = profileData.length > 0 ? profileData[0] : null;

  return (
    <section className="home-section">
      <Container className="home-content">
        <Row>
          <Col md={7} className="home-header">
            <h1 className="heading">
              {profile?.introText || 'Hi There! '}{' '}
              <span className="wave" role="img" aria-label="wave">
                👋🏻
              </span>
            </h1>

            <h1 className="heading-name">
              I'M{' '}
              <strong className="main-name">
                {profile?.name || 'Mohamed Bekheet'}
              </strong>
            </h1>

            <div style={{ padding: 50, textAlign: 'left' }}>
              <Type />
            </div>

            {profile?.social && (
              <div className="social-links-container">
                {profile.social.map((socialLink, index) => (
                  <a
                    key={index}
                    href={socialLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    data-tooltip={socialLink.label}
                    aria-label={socialLink.label}
                  >
                    <span className={`social-icon ${socialLink.platform}`} aria-hidden="true">
                      {socialLink.icon}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </Col>

          <Col md={5} style={{ paddingBottom: 20 }}>
            <Tilt>
              <div className="home-image-placeholder">
                <p>Profile Image</p>
              </div>
            </Tilt>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;