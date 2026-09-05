import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../assets/avatar.webp";
import Tilt from "react-parallax-tilt";
import ReactMarkdown from "react-markdown";
import { useSiteProfile } from "../../hooks/useSiteProfile.js";
import { getImageUrl, getPictureSources } from "../../lib/imageUtils.js";

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
              {(() => {
                const avatarPath = profile.avatar_url || myImg;
                const { sources, fallback } = getPictureSources(avatarPath, {
                  widths: [200, 400, 600],
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
                      width={400}
                      height={400}
                      loading="lazy"
                    />
                  </picture>
                );
              })()}
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
