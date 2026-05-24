import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ShopSection from './components/ShopSection';
import FlavorShowcase from './components/FlavorShowcase';
import AboutSection from './components/AboutSection';
import DistributorSection from './components/DistributorSection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FlavorShowcase />
        <ShopSection />
        <AboutSection />
        <DistributorSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
