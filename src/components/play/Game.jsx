import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaRobot, FaBrain, FaChess, FaGamepad } from "react-icons/fa";
import { MdGames } from "react-icons/md";

function Game() {
  const [width, setWidth] = useState(1200);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const games = [
    {
      title: "AI Chess Master",
      icon: <FaChess size={40} />,
      description: "Challenge our advanced AI in a game of chess",
      comingSoon: false,
    },
    {
      title: "Mind Puzzle AI",
      icon: <FaBrain size={40} />,
      description: "Test your problem-solving skills against AI",
      comingSoon: true,
    },
    {
      title: "Robot Runner",
      icon: <FaRobot size={40} />,
      description: "Race against AI-powered opponents",
      comingSoon: true,
    },
    {
      title: "AI Strategy Arena",
      icon: <FaGamepad size={40} />,
      description: "Compete in strategic battles with AI",
      comingSoon: true,
    },
  ];

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically handle the subscription
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div>
      <Container fluid className="game-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Row className="text-center mb-5">
            <Col>
              <h1 className="project-heading">
                AI Game <strong className="purple">Hub</strong>
              </h1>
              <p style={{ color: "white" }}>
                Experience the future of gaming with our AI-powered games
              </p>
            </Col>
          </Row>

          <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
            {games.map((game, idx) => (
              <Col key={idx}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="project-card-view h-100">
                    <Card.Body className="d-flex flex-column">
                      <div className="text-center mb-3" style={{ color: "#c770f0" }}>
                        {game.icon}
                      </div>
                      <Card.Title>{game.title}</Card.Title>
                      <Card.Text>{game.description}</Card.Text>
                      <div className="mt-auto">
                        <Button
                          variant="primary"
                          disabled={game.comingSoon}
                          className="w-100"
                        >
                          {game.comingSoon ? "Coming Soon" : "Play Now"}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          <Row className="justify-content-center mt-5">
            <Col md={6} className="text-center">
              <Card className="project-card-view">
                <Card.Body>
                  <MdGames size={40} style={{ color: "#c770f0" }} className="mb-3" />
                  <Card.Title>Stay Updated</Card.Title>
                  <Card.Text>
                    Subscribe to get notified when new AI games are released!
                  </Card.Text>
                  {!subscribed ? (
                    <Form onSubmit={handleSubscribe}>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            border: "1px solid #c770f0",
                            color: "white"
                          }}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Subscribe Now
                      </Button>
                    </Form>
                  ) : (
                    <div className="text-success">
                      Thanks for subscribing! We'll keep you updated.
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </div>
  );
}

export default Game;
