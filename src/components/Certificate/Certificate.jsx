import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import { useContent } from "../../hooks/useContent.js";
import { SEO } from "../SEO";

const toCard = (cert) => ({
  key: cert.id ?? cert.title,
  title: cert.title,
  image: cert.image_url ?? cert.img,
  alt: cert.alt || cert.title,
  link: cert.link && cert.link !== "#" ? cert.link : null,
  description: cert.description
});

export default function ProjectPage() {
  const { content } = useContent("certifications");
  const cards = (content ?? []).map(toCard);

  return (
    <>
      <SEO
        title="AI & Machine Learning Certifications | Mohamed Bekheet"
        description="13 cloud & AI certifications across AWS, Azure, and GCP. AWS ML Specialty, Solutions Architect, Generative AI, and more."
        canonical="https://bekheet.com/certificate"
      />
      <section>
        <Container fluid className="project-section">
        <Container>
          <h1 className="project-heading">
            Professional <strong className="purple">Certifications</strong>
          </h1>
          <p style={{ color: "white" }}>
            Industry-recognized credentials demonstrating my expertise.
          </p>
          <div>
            <Container fluid className="certificate-section" id="about">
              <Container>
                <Row>
                  <Col md={12} className="mt-5">
                    <Row className="g-5">
                      {cards.map((cert) => (
                        <Col key={cert.key} md={3} className="col-sm-12 col-md-4">
                          <Fade bottom>
                            <div className="galaxy-glass-card">
                              <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="certification-link"
                                style={cert.link ? undefined : { pointerEvents: "none" }}
                              >
                                <div className="singleProject">
                                  <div className="projectContent">
                                    <h5 className="cert-title">{cert.title}</h5>
                                    <img
                                      src={cert.image}
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
  </>
  );
}
