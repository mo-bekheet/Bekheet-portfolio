import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I'm <span className="purple">Mohamed Bekheet </span>
            from <span className="purple">Cairo, Egypt.</span>
            <br />
            <br />
            I'm a <span className="purple">Machine Learning Engineer</span> who designs and deploys production-grade AI systems — spanning <span className="purple">Computer Vision, OCR, Generative AI, and RAG</span> — on AWS (SageMaker, Bedrock) across cloud, on-premise, and edge environments.
          </p>
          <ul style={{ marginTop: "1rem" }}>
            <li className="about-activity">
              <ImPointRight /> Built ML systems handling <span className="purple">10,000+ requests with low latency</span> in production
            </li>
            <li className="about-activity">
              <ImPointRight /> MSc Computer Science researcher at <span className="purple">Ain Shams University</span>, MEng from <span className="purple">University of Ottawa</span> (A+)
            </li>
            <li className="about-activity">
              <ImPointRight /> <span className="purple">12 cloud & AI certifications</span> across AWS, Azure, GCP, and IBM
            </li>
            <li className="about-activity">
              <ImPointRight /> Open-source contributor — this site's <span className="purple">AI chatbot included</span>
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)", marginTop: "1rem" }}>
            "Turning AI research into systems that survive production."
          </p>
          <footer className="blockquote-footer">Mohamed Bekheet</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
