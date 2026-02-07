import React from "react";
import Lottie from "react-lottie-player";
import animationData from "../../assets/lotties/edu.json";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion.js";
import { Container, Row, Col } from "react-bootstrap";
import { education } from '../../content/index.js';

// lottie config
const defaultOptions = {
  loop: true,
  play: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const FeatureCard = ({ logo, degree, field, duration, institution, description, index }) => (
  <div className={`feature-card ${index === education.length - 1 ? "mb-0" : "mb-6"}`}>
    <div className="icon-wrapper">
      <img src={logo} alt="institution logo" className="icon" />
    </div>
    <div className="feature-content">
      <h4 className="feature-title">{degree}</h4>
      <p className="feature-degree">{field}</p>
      <p className="feature-content-item">{institution}</p>
      <p className="feature-duration">{duration}</p>

      {description && <p className="feature-content-item">● {description}</p>}
    </div>
  </div>
);

const Education = () => {
  return (
    <section id="education">
      <motion.div id="education" variants={textVariant()} style={{ justifyContent: "center", padding: "30px" }}>
        <h1 className="project-heading">
          Educational<strong className="purple"> Background</strong>
        </h1>
      </motion.div>
      <Row style={{ justifyContent: "center", padding: "10px" }}>
        <Col md={6} style={{ justifyContent: "center", paddingTop: "80px", paddingBottom: "50px" }}>
          <Lottie {...defaultOptions} />
        </Col>
        <Col md={6} style={{ paddingTop: "50px", paddingBottom: "80px" }}>
          <motion.div className="sectionReverse" whileInView={{ x: [-60, 0], opacity: [0, 1] }} transition={{ duration: 1 }}>

            <div className="sectionInfo flex-col" style={{ padding: "20px" }}>
              {education.map((edu, index) => (
                <FeatureCard key={edu.id} index={index} {...edu} />
              ))}
            </div>
          </motion.div>
        </Col>
      </Row>
    </section>
  );
};

export default Education;
