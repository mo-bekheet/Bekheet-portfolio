import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import { certifications } from "./certificationData";

export default function ProjectPage() {
  return (
    <section>
      <Container fluid className="project-section">
        <Container>
          <h1 className="project-heading">
            My Recent <strong className="purple">Certifications</strong>
          </h1>
          <p style={{ color: "white" }}>
            Here are a few certifications I’ve recently earned.
          </p>
          <div>
            <Container fluid className="certificate-section" id="about">
              <Container>
                <Row>
                  <Col md={12} className="mt-5">
                    <Row className="g-5">
                      {certifications.map((cert, index) => (
                        <Col key={index} md={3} className="col-sm-12 col-md-4">
                          <Fade bottom>
                            <div className="galaxy-glass-card">
                              <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="certification-link"
                              >
                                <div className="singleProject">
                                  <div className="projectContent">
                                    <h5 className="cert-title">{cert.title}</h5>
                                    <img
                                      src={cert.img}
                                      alt={cert.alt}
                                      className="cert-image"
                                    />

                                  </div>
                                  <div className="project--desc">
                                    <p className="cert-description">
                                      {cert.description}
                                    </p>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </Fade>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Container>
          </div>
        </Container>
      </Container>
    </section>
  );
}
