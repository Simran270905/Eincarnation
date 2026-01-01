import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutServicesSection from "./components/AboutServiceSection";
import Client from "./components/Client";
import Review from "./components/Review";
import ContactForm  from "./components/ContactForm";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div className="bg-[#F7F6F2] min-h-screen">
      <Navbar />
      <Hero />
      <AboutServicesSection />
      <Client/>
      <Review/>
      <ContactForm/>
      <Footer/>
    </div>
  );
};

export default App;
