import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CgWebsite } from 'react-icons/cg';
import { BsGithub } from 'react-icons/bs';
import './ProjectCard.css';

const ProjectCard = ({ imgPath, isBlog, title, description, ghLink, demoLink }) => {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={imgPath} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{ textAlign: 'justify' }}>
          {description}
        </Card.Text>
        <Button variant="primary" href={ghLink} target="_blank" style={{ marginLeft: '10px' }}>
          <BsGithub /> &nbsp;
          {isBlog ? 'Blog' : 'Code'}
        </Button>
        {demoLink && (
          <Button variant="primary" href={demoLink} target="_blank" style={{ marginLeft: '10px' }}>
            <CgWebsite /> &nbsp;
            Demo
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;