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
import "./style.css";

function Home() {
  const [sessionId, setSessionId] = useState('');

  // useEffect(() => {
  //   const newSessionId = 'session_' + Date.now();
  //   setSessionId(newSessionId);
  //   addResponseMessage('Welcome to our chatbot!');
  // }, []);
  // const handleNewUserMessage = async (message) => {
  //   console.log(`New message from ${sessionId}: ${message}`);

  //   const response = await processWithLangChain(message, sessionId);
  //   addResponseMessage(response);
  // };

  const processWithLangChain = async (message, sessionId) => {
    const response = `Processed message "${message}" for session: ${sessionId}`;
    return response;
  };

  return (
    <section>
      <Container fluid className="home-section" id="home">
        {/* <Particle /> */}
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> Mohamed Bekheet</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
              
              <div className="link1">    
                  <a href="https://chatwith.io/s/mohamed-bekheet" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp />
                  </a>    
                  <a href="https://github.com/mohamedbakhet" target="_blank" rel="noopener noreferrer">
                    <AiOutlineGithub />
                  </a>
                  <a href="https://www.linkedin.com/in/mohamedbekheet-/" target="_blank" rel="noopener noreferrer">
                    <ImLinkedin />
                  </a>
                  <a href="https://www.kaggle.com/mohamedbakhet" target="_blank" rel="noopener noreferrer">
                    <SiKaggle />
                  </a>
                  <a href="https://dev.to/mohamed-bekheet" target="_blank" rel="noopener noreferrer">
                    <FaDev />
                  </a>

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
