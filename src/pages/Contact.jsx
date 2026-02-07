import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the Netlify function for secure contact form submission
      const response = await fetch('/.netlify/functions/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Thank you. I will get back to you as soon as possible.");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert("Ahh, something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Ahh, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="contact-section">
      <Container>
        <h1 className="project-heading">
          Contact <strong className="purple">Me </strong>
        </h1>
        <p>Feel free to reach out if you want to collaborate with me, or simply have a chat.</p>
        <Row style={{ justifyContent: 'center', paddingBottom: '10px' }}>
          <Col md={6} className="contact-form">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Enter your message"
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
                className="mt-3"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Contact;