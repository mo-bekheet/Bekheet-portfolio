import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <Container fluid className="not-found-section">
      <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Col xs={12} className="text-center">
          <h1 className="display-1">404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="btn btn-primary">Go Back Home</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;