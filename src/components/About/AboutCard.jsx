import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I’m <span className="purple">Mohamed Bekheet Abdelall </span> 
            from <span className="purple">Cairo, Egypt.</span>
            <br />
            I am currently working as a <span className="purple">Machine Learning Engineer</span> at <span className="purple">FORTE CLOUD</span>.
            <br />
            My mission is to harness the power of <span className="purple">AI</span> to enhance and simplify our lives. I specialize in <span className="purple">generative AI techniques</span>, including <span className="purple">Retrieval-Augmented Generation (RAG) systems</span>, and other machine learning solutions such as <span className="purple">computer vision</span>, <span className="purple">natural language processing</span>, and <span className="purple">more</span>.
            <br />
            <br />
            Beyond my work, I am passionate about:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> <span className="purple">Revolutionizing Life with AI</span>
            </li>
            <li className="about-activity">
              <ImPointRight /> <span className="purple">Innovative Exploration</span>
            </li>
            <li className="about-activity">
              <ImPointRight /> <span className="purple">Personal Growth</span>
            </li>
            <li className="about-activity">
              <ImPointRight /> <span className="purple">Collaborative Spirit</span>
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Turning AI dreams into reality, making everyday life a little brighter and a lot easier."
          </p>
          <footer className="blockquote-footer">Mohamed Bekheet</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
