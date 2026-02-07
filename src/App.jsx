import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './hooks/useAuth';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Layout from './components/layout/Layout';
import './App.css';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Certificate from './pages/Certificate';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Import legacy components that haven't been migrated yet
import Preloader from "./components/Pre.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
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
    <ErrorBoundary>
      <AppProvider>
        <AuthProvider>
          <Router>
            <Preloader load={load} />
            <div className="App" id={load ? "no-scroll" : "scroll"}>
              <Layout>
                <ScrollToTop />
                <Particle />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/certificates" element={<Certificate />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Legacy routes that haven't been migrated yet */}
                  <Route path="/play" element={<Game />} />
                  <Route path="/project" element={<Projects />} />
                  <Route path="/certificate" element={<Certificate />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </div>
            <Chatbot />
            <Footer />
          </Router>
        </AuthProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;