import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../assets/home-main.webp";
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
import { useSiteProfile } from "../../hooks/useSiteProfile.js";
import { getImageUrl, getPictureSources } from "../../lib/imageUtils.js";
import { SEO } from "../SEO";

function Home() {
  const profile = useSiteProfile();

  const socialLinks = [
    { key: 'whatsapp', url: profile.whatsapp_url, icon: <FaWhatsapp />, label: 'Chat on WhatsApp' },
    { key: 'github', url: profile.github_url, icon: <AiOutlineGithub />, label: 'Follow on GitHub' },
    { key: 'linkedin', url: profile.linkedin_url, icon: <ImLinkedin />, label: 'Connect on LinkedIn' },
    { key: 'kaggle', url: profile.kaggle_url, icon: <SiKaggle />, label: 'Follow on Kaggle' },
    { key: 'dev', url: profile.dev_url, icon: <FaDev />, label: 'Read my articles on Dev.to' }
  ].filter((link) => link.url);

  return (
    <>
      <SEO
        title="Mohamed Bekheet | Machine Learning Engineer, Computer Vision & Generative AI"
        description="Production-grade AI systems across Computer Vision, OCR, Generative AI and MLOps, built on AWS Bedrock and SageMaker."
        canonical="https://bekheet.com/"
      />
      <section>
      <Container fluid className="home-section" id="home">
        {/* <Particle /> */}
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <p style={{paddingBottom: 15}} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </p>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> {profile.full_name || "Mohamed Bekheet"}</strong>
              </h1>

              <div style={{ padding: "30px 50px", textAlign: "left" }}>
                <Type />
              </div>

              <div className="social-links-container" style={{ marginTop: "40px" }}>
                  {socialLinks.map((link) => (
                    <a key={link.key}
                       href={link.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="social-link"
                       data-tooltip={link.label} aria-label={link.label}>
                      {link.icon}
                    </a>
                  ))}
              </div>
 
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
            <Tilt>
              {(() => {
                const heroPath = profile.hero_image_url || homeLogo;
                const { sources, fallback } = getPictureSources(heroPath, {
                  widths: [400, 800, 1200, 1600],
                  formats: ['avif', 'webp'],
                });
                return (
                  <picture>
                    {sources.map((source, idx) => (
                      <source key={idx} type={source.type} srcSet={source.srcSet} />
                    ))}
                    <img
                      src={fallback}
                      alt={`${profile.full_name || "Mohamed Bekheet"} - Machine Learning Engineer`}
                      className="img-fluid"
                      style={{ maxHeight: "800px" }}
                      width={600}
                      height={800}
                      loading="eager"
                      fetchPriority="high"
                    />
                  </picture>
                );
              })()}
              </Tilt>
            </Col>
          </Row>
          <Home2 />
          <Testimonials />
          <Contact />
        </Container>
      </Container>

    
    </section>
  </>
  );
}

export default Home;
