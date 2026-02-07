import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../Assets/logo.png";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CgGitFork } from "react-icons/cg";
import { ImBlog } from "react-icons/im";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";
import { GiGamepad } from 'react-icons/gi';

import { CgFileDocument } from "react-icons/cg";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  useEffect(() => {
    function scrollHandler() {
      if (window.scrollY >= 20) {
        updateNavbar(true);
      } else {
        updateNavbar(false);
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", scrollHandler);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
      aria-label="Main navigation"
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img src={logo} className="img-fluid logo" alt="Mohamed Bekheet's portfolio logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
          aria-label="Toggle navigation menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)} aria-label="Go to home page">
                <AiOutlineHome style={{ marginBottom: "2px" }} aria-hidden="true" /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
                aria-label="Go to about page"
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} aria-hidden="true" /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/project"
                onClick={() => updateExpanded(false)}
                aria-label="Go to projects page"
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                  aria-hidden="true"
                />{" "}
                Projects
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/certificate"
                onClick={() => updateExpanded(false)}
                aria-label="Go to certifications page"
              >
                <ImBlog style={{ marginBottom: "2px" }} aria-hidden="true" /> Certifications
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/play" onClick={() => updateExpanded(false)} aria-label="Go to play page">
                <GiGamepad style={{ marginBottom: "2px" }} aria-hidden="true" /> Let's Play
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/resume"
                onClick={() => updateExpanded(false)}
                aria-label="Go to resume page"
              >
                <CgFileDocument style={{ marginBottom: "2px" }} aria-hidden="true" /> Resume
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="fork-btn">
              <Button
                href="https://github.com/mohamedbakhet/Bekheet.github.io"
                target="_blank"
                className="fork-btn-inner"
                aria-label="View source code on GitHub"
              >
                <CgGitFork style={{ fontSize: "1.2em" }} aria-hidden="true" />{" "}
                <AiFillStar style={{ fontSize: "1.1em" }} aria-hidden="true" />
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
