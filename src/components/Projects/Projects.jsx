import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
// import Particle from "../Particle";

import { projectData } from "./projectsData";
import { useContent } from "../../hooks/useContent";
import { SEO } from "../SEO";

const staticByTitle = Object.fromEntries(projectData.map((p) => [p.title, p]));

function Projects() {
  const { content } = useContent("projects");
  return (
    <>
      <SEO
        title="Machine Learning & Computer Vision Projects | Mohamed Bekheet"
        description="Explore featured projects in Computer Vision, OCR, Generative AI, and MLOps. CopticTrans, CardioAI, and more."
        canonical="https://bekheet.com/project"
      />
      <Container fluid className="project-section">
        {/* <Particle /> */}
        <Container>
        <h1 className="project-heading">
          Featured <strong className="purple">Projects </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are selected projects showcasing my expertise and experience.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {(content ?? []).map((project, index) => {
            const fallback = staticByTitle[project.title] ?? {};
            return (
              <Col md={4} className="project-card" key={project.id ?? index}>
                <ProjectCard
                  imgPath={project.imgPath || project.image_url || fallback.imgPath}
                  isBlog={project.isBlog ?? false}
                  title={project.title}
                  description={project.description}
                  ghLink={project.ghLink || project.gh_link}
                  demoLink={project.demoLink || project.demo_link}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Container>
  </>
  );
}

export default Projects;
