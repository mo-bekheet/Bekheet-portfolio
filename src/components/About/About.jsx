import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Particle from "../Particle";
import Github from "./Github";
import Aboutcard from "./AboutCard.jsx";
import animationData from "../../assets/lotties/q2.json"; 
import Lottie from "react-lottie-player";
import Education from "./education.jsx";
import ExperienceJourney from "./experience.jsx";
import Skills from "./skills.jsx";
import { programmingLanguages, programmingLanguageImages, frameworksAndLibraries, frameworksAndLibrariesImages, tools, toolImages } from "./skillsContent";

function About() {
  return (
    <Container fluid className="about-section">
      {/* <Particle /> */}
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              About <strong className="purple">Me</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
          >
            <Lottie
              loop
              play
              animationData={animationData}
              rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
              style={{ height: 400, width: 400 }}
            />
          </Col>
        </Row>
        <ExperienceJourney />
        <Education />

        <h1 className="project-heading">
          <strong className="purple">Technical </strong>Skills
        </h1>
        <Skills skillsData={programmingLanguages} images={programmingLanguageImages} />
        <h1 className="project-heading">
          <strong className="purple">Frameworks</strong> & Libraries
        </h1>
        <Skills skillsData={frameworksAndLibraries} images={frameworksAndLibrariesImages} />
        <h1 className="project-heading">
          <strong className="purple">Developer Tools</strong> & Technologies
        </h1>
        <Skills skillsData={tools} images={toolImages} />
        <Github />
      </Container>
    </Container>
  );
}

export default About;
