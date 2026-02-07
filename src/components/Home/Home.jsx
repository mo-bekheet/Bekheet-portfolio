import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../assets/home-main.png";
// import Particle from "../Particle";
import Home2 from "./Home2.jsx";
import Type from "./Type";
// import { addResponseMessage } from 'react-chat-widget';
import Testimonials from './Testimonials.jsx'
import Contact from './Contact.jsx'
import { FaWhatsapp, FaDev } from 'react-icons/fa';
import { AiOutlineGithub } from 'react-icons/ai';
import { ImLinkedin } from 'react-icons/im';
import { SiKaggle } from 'react-icons/si';
import Tilt from "react-parallax-tilt";
import { profile } from '../../content/index.js';
import "./style.css";

function Home() {
  const [sessionId, setSessionId] = useState('');
  const { personalInfo, socialLinks } = profile;

  const processWithLangChain = async (message, sessionId) => {
    const response = `Processed message "${message}" for session: ${sessionId}`;
    return response;
  };

  // Map icon names to actual icon components
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'FaWhatsapp': return <FaWhatsapp />;
      case 'AiOutlineGithub': return <AiOutlineGithub />;
      case 'ImLinkedin': return <ImLinkedin />;
      case 'SiKaggle': return <SiKaggle />;
      case 'FaDev': return <FaDev />;
      default: return null;
    }
  };

  return (
    <section>
      <Container fluid className="home-section" id="home">
        {/* <Particle /> */}
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{paddingBottom: 15}} className="heading">
                {personalInfo.tagline}{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> {personalInfo.name}</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>

              <div className="social-links-container">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    data-tooltip={link.tooltip}
                  >
                    {getIconComponent(link.icon)}
                  </a>
                ))}
              </div>

            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
            <Tilt>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "800px" }}
              />
              </Tilt>
            </Col>
          </Row>
          <Home2 />
          <Testimonials />
          <Contact />
        </Container>
      </Container>


    </section>
  );
}

export default Home;
