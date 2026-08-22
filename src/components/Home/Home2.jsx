import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../assets/avatar.webp";
import Tilt from "react-parallax-tilt";
import ReactMarkdown from "react-markdown";
import { useSiteProfile } from "../../hooks/useSiteProfile.js";

function Home2() {
  const profile = useSiteProfile();

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h2 style={{ fontSize: "2.6em" }}>
              ABOUT <span className="purple"> ME </span>
            </h2>
            <div className="home-about-body">
              <ReactMarkdown>{profile.bio}</ReactMarkdown>
            </div>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt>
              <img
                src={profile.avatar_url || myImg}
                className="img-fluid"
                alt={`${profile.full_name || "Mohamed Bekheet"} - Machine Learning Engineer`}
              />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
