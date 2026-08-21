import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import './Blog.css';

const samplePosts = [
  {
    id: 1,
    title: 'Modernizing React Portfolio with Vite and Custom AI',
    date: 'April 2026',
    category: 'Architecture',
    content: 'Building a modern web presence is no longer just about standard templates. By combining **React**, **Vite**, and **Zustand** state management along with an embedded AI Assistant via **Google Gemini**, you can turn a static brochure into an interactive experience. \n\n### Why Vite?\nVite provides instantaneous hot module replacement (HMR), making development incredibly fast...',
    readTime: '3 min read'
  },
  {
    id: 2,
    title: 'Optimizing Computer Vision at the Edge',
    date: 'March 2026',
    category: 'Machine Learning',
    content: 'Deploying deep learning models to the edge comes with severe resource limitations. During my work, we extensively used OpenVINO and optimized ONNX models to achieve real-time text recognition on embedded devices running minimal Linux distributions.',
    readTime: '5 min read'
  }
];

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Mimic fetching from CMS or Firebase
    setTimeout(() => {
      setPosts(samplePosts);
    }, 400);
  }, []);

  return (
    <Container fluid className="blog-section section-padding py-5 min-vh-100" style={{paddingTop: '120px'}}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="project-heading mb-5">
            My <strong className="purple">Tech Blog</strong>
          </h2>
          <p className="text-secondary mb-5" style={{ color: 'var(--color-text-secondary)' }}>
            Thoughts, tutorials, and insights regarding GenAI, Computer Vision, and Software Engineering.
          </p>
        </motion.div>

        <Row className="g-4">
          {posts.map((post, index) => (
            <Col md={12} key={post.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="blog-card glass-panel h-100 p-4">
                  <div className="blog-meta d-flex justify-content-between mb-3">
                    <span className="badge" style={{ backgroundColor: 'var(--color-primary)' }}>{post.category}</span>
                    <span className="text-muted" style={{ color: 'var(--color-text-muted)' }}>{post.date} • {post.readTime}</span>
                  </div>
                  <h3 style={{ color: 'var(--color-text-primary)' }}>{post.title}</h3>
                  <hr style={{ borderColor: 'var(--color-bg-glass-border)' }} />
                  <div className="blog-content" style={{ color: 'var(--color-text-secondary)' }}>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Blog;
