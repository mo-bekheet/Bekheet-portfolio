import { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import './App.css';
import Preloader from "./components/Pre.jsx";
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Certificate from "./components/Certificate/Certificate.jsx";
// import ResumeNew from "./components/Resume/ResumeNew.jsx"; 
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import { loadSlim } from "@tsparticles/slim";
// import About from "./components/About/About.js";
import Projects from "./components/Projects/Projects.jsx";

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const [init, setInit] = useState(false);

  // This should run only once per application lifetime
  useEffect(() => {
    const initParticlesEngine = async (engine) => {
      // You can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      await loadSlim(engine);
    };

    initParticlesEngine().then(() => {
      setInit(true);
    });
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/resume" element={<ResumeNew />} /> */}
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
