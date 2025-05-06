import { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import './App.css';
import Preloader from "./components/Pre.jsx";
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Certificate from "./components/Certificate/Certificate.jsx";
import ResumeNew from "./components/Resume/ResumeNew.jsx"; 
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Game from "./components/play/Game.jsx";
import Footer from "./components/Footer.jsx";
import Chatbot from "./components/chatEngine/index.jsx";
import Particle from "./components/Particle.jsx";

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Particle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Game />} />
          <Route path="/resume" element={<ResumeNew />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;
