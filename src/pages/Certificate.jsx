import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useFirestore } from '../hooks/useFirestore';
import './Certificate.css';

const Certificate = () => {
  const { documents: certificates, loading, error } = useFirestore('certifications');

  if (loading) return <div className="loading">Loading certificates...</div>;
  if (error) return <div className="error">Error loading certificates: {error.message}</div>;

  return (
    <Container fluid className="certificate-section">
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Certifications </strong>
        </h1>
        <Row style={{ justifyContent: 'center', paddingBottom: '10px' }}>
          {certificates.map((cert, index) => (
            <Col md={4} key={index} className="certificate-card">
              <div className="certificate-item">
                <h3>{cert.title}</h3>
                <p>Issued by: {cert.issuer}</p>
                <p>Date: {new Date(cert.issueDate).toLocaleDateString()}</p>
                {cert.expirationDate && (
                  <p>Expires: {new Date(cert.expirationDate).toLocaleDateString()}</p>
                )}
                <p>{cert.description}</p>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    View Credential
                  </a>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Certificate;