import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import './Blog.css';
import { samplePosts } from '../content/index.js';
import { postsApi } from '../lib/api';

const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

const sanitizeSchema = {
  tagNames: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'strong', 'em', 'del', 'code', 'pre',
    'a', 'blockquote',
    'ul', 'ol', 'li',
    'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  ],
  attributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    '*': ['className', 'id'],
  },
  clobberPrefix: 'user-content-',
  allowedSchemes: ['http', 'https', 'mailto'],
  requiredAttributes: {
    a: { rel: 'noopener noreferrer', target: '_blank' },
  },
};

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;
    postsApi
      .listPublished()
      .then((rows) => {
        if (!mounted) return;
        if (rows?.length) {
          setPosts(
            rows.map((row) => ({
              id: row.id,
              title: row.title,
              category: row.category,
              date: row.date_label || formatDate(row.created_at),
              content: row.content || '',
              readTime: row.read_time || ''
            }))
          );
        } else {
          setPosts(samplePosts);
        }
      })
      .catch(() => {
        if (mounted) setPosts(samplePosts);
      });
    return () => {
      mounted = false;
    };
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
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}
                      allowDangerousHtml={false}
                    >
                      {post.content}
                    </ReactMarkdown>
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
