import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../assets/avatar.png";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              ABOUT <span className="purple"> ME </span>
            </h1>
            <p className="home-about-body">
              I'm Mohamed Bekheet, a <b className="purple">Machine Learning Engineer</b> specializing in designing and deploying production-grade AI systems that solve real business problems.
              <br />
              <br />
              My work focuses on applied AI across <b className="purple">Computer Vision, Generative AI, MLOps, and Data Science</b>, where I build scalable solutions that transform complex workflows into automated, intelligent processes.
              <br />
              <br />
              I'm proficient in <b className="purple">Python</b> as my primary development language, with additional experience in 
              <i><b className="purple"> C++, Java, JavaScript, and R</b></i>, enabling me to design end-to-end systems from data pipelines to model deployment.
              <br />
              <br />
              My core expertise includes <b className="purple">Computer Vision, Optical Character Recognition (OCR), Generative AI, Retrieval-Augmented Generation (RAG), and AI Agents</b>—allowing me to deliver advanced AI applications for real-world environments.
              <br />
              <br />
              I have hands-on experience architecting scalable ML solutions on <b className="purple">AWS</b>, including 
              <i><b className="purple"> SageMaker and Bedrock</b></i>, as well as deploying models across cloud, on-premise, and edge environments to meet performance, latency, and reliability requirements.
              <br />
              <br />
              Driven by continuous learning, I actively explore <b className="purple">emerging AI technologies</b> and 
              <i><b className="purple">optimize systems</b> for efficiency, scalability, and long-term maintainability</i>.
            </p>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="Mohamed Bekheet - Machine Learning Engineer" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
