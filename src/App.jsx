import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import TitleUpdater from "./components/TitleUpdater";
import WhatsAppButton from "./components/WhatsAppButton";

// Lazy load all route components for better performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Events = lazy(() => import("./pages/Events"));
const Services = lazy(() => import("./pages/Services"));
const EPR = lazy(() => import("./pages/EPR"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f3f0e6]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-[#1A0185] mx-auto mb-4"></div>
      <p className="text-gray-600 text-sm">Loading...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <WhatsAppButton />
      <ScrollToTop />
      <TitleUpdater />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/events" element={<Events />} />
          <Route path="/epr" element={<EPR />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
