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
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
        
        <Row className="resume justify-content-center">
          <img 
            src={resumeImage} 
            alt="Resume" 
            style={{ width: '100%', maxWidth: '800px', height: 'auto' }} 
          />
        </Row>


        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>

        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
