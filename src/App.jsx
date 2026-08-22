import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";
import Chatbot from "./components/chatEngine/index.jsx";
import Particle from "./components/Particle.jsx";
import Preloader from "./components/Pre.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
import useTracking from "./hooks/useTracking.js";

const Home = lazy(() => import("./components/Home/Home.jsx"));
const About = lazy(() => import("./components/About/About.jsx"));
const Projects = lazy(() => import("./components/Projects/Projects.jsx"));
const Certificate = lazy(() => import("./components/Certificate/Certificate.jsx"));
const ResumeNew = lazy(() => import("./components/Resume/ResumeNew.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));

const AdminLogin = lazy(() => import("./pages/dashboard/Login.jsx"));
const RequireAuth = lazy(() => import("./pages/dashboard/RequireAuth.jsx"));
const DashboardLayout = lazy(() => import("./pages/dashboard/DashboardLayout.jsx"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome.jsx"));
const ManageProfile = lazy(() => import("./pages/dashboard/ManageProfile.jsx"));
const ManageProjects = lazy(() => import("./pages/dashboard/ManageProjects.jsx"));
const ManagePosts = lazy(() => import("./pages/dashboard/ManagePosts.jsx"));
const ManageExperience = lazy(() => import("./pages/dashboard/ManageExperience.jsx"));
const ManageCertifications = lazy(() => import("./pages/dashboard/ManageCertifications.jsx"));
const ManageTestimonials = lazy(() => import("./pages/dashboard/ManageTestimonials.jsx"));
const ManageMessages = lazy(() => import("./pages/dashboard/ManageMessages.jsx"));
const DashboardAnalytics = lazy(() => import("./pages/dashboard/DashboardAnalytics.jsx"));

const SuspenseFallback = () => <div style={{ minHeight: "60vh" }} aria-hidden="true" />;

function AdminArea() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<RequireAuth />}>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<ManageProfile />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="posts" element={<ManagePosts />} />
          <Route path="experience" element={<ManageExperience />} />
          <Route path="certifications" element={<ManageCertifications />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
          <Route path="inbox" element={<ManageMessages />} />
          <Route path="analytics" element={<DashboardAnalytics />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

function PublicArea({ load }) {
  useTracking();
  return (
    <>
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <Particle />
        <Suspense fallback={<SuspenseFallback />}>
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
    </>
  );
}

function Shell({ load }) {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminArea && <Preloader load={load} />}
      <ScrollToTop />
      <Suspense fallback={<SuspenseFallback />}>
        {isAdminArea ? <AdminArea /> : <PublicArea load={load} />}
      </Suspense>
    </>
  );
}

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
      <AuthProvider>
        <Shell load={load} />
      </AuthProvider>
    </Router>
  );
}

export default App;
