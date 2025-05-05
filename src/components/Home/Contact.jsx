import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS


const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_e5ycsfe',
        'template_x0cxs2o',
        {
          from_name: form.name,
          to_name: "Mohamed Bekheet",
          from_email: form.email,
          to_email: "mohamedbekheet33@gmail.com",
          message: form.message,
        },
        'US2HFHJEPrK2NEtJ2',
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };


  return (
    <Container>
      <Row>
        <Col md={6}>
        <br/>
        <br/>
        <br/>
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="w-300 h-300"
            style={{ height: '600px', maxHeight: '800px' }}
          >
            <EarthCanvas />
          </motion.div>
        </Col>
        
        <Col md={6} >
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className=" form-container w-100 h-100"
            

            >
        <p className="section-sub-text">Get in touch</p>
        <h3 className="section-head-text">Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="form"
        >
        <label className="form-label">
          <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="nameinput"
            />
          </label>
          <label className="form-label">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className="nameinput"
            />
          </label>
          <label className="form-label">
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              className="nameinput"
            />
          </label>

          <button type="submit" className="submit-button">
            {loading ? (
                <>
                    <i className="fas fa-spinner fa-spin"></i> {/* Spinner icon for loading state */}
                    Loading...
                </>
            ) : (
                <>
                    <i className="fas fa-paper-plane"></i> {/* Send icon */}
                    Send
                </>
            )}
        </button>
        </form>

          </motion.div>
        </Col>
      </Row>
    </Container>

);

};


// Exporting the component
export default SectionWrapper(Contact, "contact");
