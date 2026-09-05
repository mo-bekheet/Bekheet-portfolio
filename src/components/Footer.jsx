import { Container } from 'react-bootstrap';
import { FaWhatsapp, FaDev } from 'react-icons/fa';
import { AiOutlineGithub } from 'react-icons/ai';
import { ImLinkedin } from 'react-icons/im';
import { SiKaggle } from 'react-icons/si';

const SocialLinks = () => (
  <div className="social-icons">
    <a href="https://chatwith.io/s/mohamed-bekheet" target="_blank" rel="noopener noreferrer" className="icon-circle" aria-label="Chat on WhatsApp">
      <FaWhatsapp />
    </a>
    <a href="https://github.bekheet.com" target="_blank" rel="noopener noreferrer" className="icon-circle" aria-label="Follow on GitHub">
      <AiOutlineGithub />
    </a>
    <a href="https://linkedin.bekheet.com" target="_blank" rel="noopener noreferrer" className="icon-circle" aria-label="Connect on LinkedIn">
      <ImLinkedin />
    </a>
    <a href="https://kaggle.bekheet.com" target="_blank" rel="noopener noreferrer" className="icon-circle" aria-label="Follow on Kaggle">
      <SiKaggle />
    </a>
    <a href="https://dev.to/mohamed-bekheet" target="_blank" rel="noopener noreferrer" className="icon-circle" aria-label="Read articles on Dev.to">
      <FaDev />
    </a>
  </div>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-glass-effect" />
      <Container>
        <div className="footer-content">
          <p className="footer-text">
            Crafted with 💜 by
            <a href="https://github.bekheet.com" target="_blank" rel="noopener noreferrer">
              {" "}Mohamed Bekheet
            </a>
          </p>
          <SocialLinks />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;