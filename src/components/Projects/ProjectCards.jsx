import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { getPictureSources } from "../../lib/imageUtils.js";

function ProjectCards(props) {
  const { sources, fallback } = getPictureSources(props.imgPath, {
    widths: [300, 600, 900],
    formats: ['avif', 'webp'],
  });

  return (
    <Card className="project-card-view">
      <picture>
        {sources.map((source, idx) => (
          <source key={idx} type={source.type} srcSet={source.srcSet} />
        ))}
        <img
          src={fallback}
          alt={`${props.title} screenshot`}
          className="card-img-top"
          width={600}
          height={400}
          loading="lazy"
        />
      </picture>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {props.course && (
          <Badge bg="secondary" className="mb-2" style={{ fontSize: "0.7em" }}>
            Coursework — {props.course}
          </Badge>
        )}
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        <Button
          variant="primary"
          href={props.ghLink}
          target="_blank"
          aria-label={`View ${props.title} source code on GitHub`}
        >
          <BsGithub /> &nbsp;
          {props.isBlog ? "Blog" : "GitHub"}
        </Button>
        {"\n"}
        {"\n"}

        {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}

        {!props.isBlog && props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
            aria-label={`Open ${props.title} live demo`}
          >
            <CgWebsite /> &nbsp;
            {"Demo"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
