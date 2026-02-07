import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import pdf from "../../assets/Mohamed-Bekheet.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import resumeImage from "../../assets/Mohamed-Bekheet_page-0001.jpg"; 
import Particle from "../Particle.jsx";

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative", marginBottom: "30px" }}>
          <h1 className="project-heading">
            My <strong className="purple">Resume</strong>
          </h1>
        </Row>
        
        <Row style={{ justifyContent: "center", position: "relative", marginBottom: "30px" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download Full CV
          </Button>
        </Row>

        <Row className="resume justify-content-center" style={{ marginBottom: "30px" }}>
          <img
            src={resumeImage}
            alt="Mohamed Bekheet - Machine Learning Engineer Resume"
            style={{ width: '100%', maxWidth: '900px', height: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', borderRadius: '8px' }}
          />
        </Row>

        <Row style={{ justifyContent: "center", position: "relative", marginTop: "20px" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download Full CV
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
