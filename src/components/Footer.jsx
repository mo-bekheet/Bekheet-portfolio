import { Container } from 'react-bootstrap';
import { FaWhatsapp, FaDev } from 'react-icons/fa';
import { AiOutlineGithub } from 'react-icons/ai';
import { ImLinkedin } from 'react-icons/im';
import { SiKaggle } from 'react-icons/si';

const SocialLinks = () => (
  <div className="social-icons">
    <a href="https://chatwith.io/s/mohamed-bekheet" target="_blank" rel="noopener noreferrer" className="icon-circle">
      <FaWhatsapp />
    </a>
    <a href="https://github.com/mohamedbakhet" target="_blank" rel="noopener noreferrer" className="icon-circle">
      <AiOutlineGithub />
    </a>
    <a href="https://www.linkedin.com/in/mohamedbekheet-/" target="_blank" rel="noopener noreferrer" className="icon-circle">
      <ImLinkedin />
    </a>
    <a href="https://www.kaggle.com/mohamedbakhet" target="_blank" rel="noopener noreferrer" className="icon-circle">
      <SiKaggle />
    </a>
    <a href="https://dev.to/mohamed-bekheet" target="_blank" rel="noopener noreferrer" className="icon-circle">
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
            <a href="https://github.com/mohamedbakhet" target="_blank" rel="noopener noreferrer">
              {" "}Mohamed Bekheet
            </a>
          </p>
          <SocialLinks />
          <p className="footer-stats">
            Visitors: {' '}
            <img
              className="visitcounter"
              src="https://hitwebcounter.com/counter/counter.php?page=18600318&style=0025&nbdigits=5&type=page&initCount=459"
              title="Visit Counter"
              alt="Visit counter"
              border="0"
            />
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;