import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Preloader from "./components/Pre.jsx";
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";
import Chatbot from "./components/chatEngine/index.jsx";

const Particle = lazy(() => import("./components/Particle.jsx"));

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Home = lazy(() => import("./components/Home/Home.jsx"));
const About = lazy(() => import("./components/About/About.jsx"));
const Projects = lazy(() => import("./components/Projects/Projects.jsx"));
const Certificate = lazy(() => import("./components/Certificate/Certificate.jsx"));
const ResumeNew = lazy(() => import("./components/Resume/ResumeNew.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));

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
        {!prefersReducedMotion && (
          <Suspense fallback={null}>
            <Particle />
          </Suspense>
        )}
        <Suspense fallback={<div style={{ minHeight: "60vh" }} aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<ResumeNew />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;
