import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import HowItWorks from '../../components/HowItWorks';
import About from '../../components/About';
import TechStack from '../../components/TechStack';
import FAQ from '../../components/FAQ';
import Footer from '../../components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F4F8F2] text-text-dark font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <About />
      <TechStack />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Landing;
