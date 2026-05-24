import React from 'react';
import HeroSection from '../components/HeroSection';
import ShopSection from '../components/ShopSection';
import FlavorShowcase from '../components/FlavorShowcase';
import AboutSection from '../components/AboutSection';
import DistributorSection from '../components/DistributorSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FlavorShowcase />
      <ShopSection />
      <AboutSection />
      <DistributorSection />
    </>
  );
}
