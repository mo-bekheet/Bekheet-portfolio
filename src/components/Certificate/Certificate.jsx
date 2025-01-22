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
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <div
                                className="singleProject"
                                style={{
                                  backgroundColor: "rgb(142 70 186 / 31%)",
                                  border: "1px solid",
                                }}
                              >
                                <div className="projectContent">
                                  <h5 style={{ color: "whitesmoke" }}>
                                    {cert.title}
                                  </h5>
                                  <img
                                    src={cert.img}
                                    alt={cert.alt}
                                    style={{ height: "250px" }}
                                  />
                                </div>
                                <h6>
                                  <p
                                    className="project--desc"
                                    style={{
                                      background: "whitesmoke",
                                      color: "#c95bf5",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {cert.description}
                                  </p>
                                </h6>
                              </div>
                            </a>
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
