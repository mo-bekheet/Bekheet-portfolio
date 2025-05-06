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
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              🚀 I am a passionate{" "}
              <b className="purple">Machine Learning Engineer</b> with a deep
              love for
              <b className="purple">
                {" "}
                AI, MLOps, Data Science, Computer Vision,
              </b>{" "}
              and <b className="purple">Generative AI</b>.
              <br />
              <br />
              💻 Proficient in
              <i>
                <b className="purple"> Python, C++, Java, JavaScript,</b> and{" "}
                <b className="purple">R</b>.
              </i>
              <br />
              <br />
              🤖 I specialize in
              <i>
                <b className="purple">
                  Computer Vision, Optical Character Recognition (OCR),
                  Generative AI, Retrieval-Augmented Generation (RAG) systems,
                </b>{" "}
                and <b className="purple">AI Agents</b>.
              </i>
              <br />
              <br />
              ☁️ My expertise includes
              <b className="purple"> cloud architecture</b> and building
              <i>
                <b className="purple"> scalable ML solutions</b>.
              </i>
              <br />
              <br />
              🛠️ I have hands-on experience deploying models using
              <b className="purple"> AWS services</b> like
              <i>
                <b className="purple"> SageMaker</b> and{" "}
                <b className="purple">Bedrock</b>,
              </i>{" "}
              alongside other cloud platforms,
              <b className="purple"> on-premise infrastructure</b>, and{" "}
              <b className="purple">edge devices</b>.
              <br />
              <br />
              🔍 I am always eager to explore
              <b className="purple"> new technologies</b> and continuously
              <i>
                <b className="purple"> optimize systems</b> for
                <b className="purple"> peak performance</b>.
              </i>
            </p>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
