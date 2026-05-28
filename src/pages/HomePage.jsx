import HeroSection from '../components/HeroSection';
import BenefitsStrip from '../components/BenefitsStrip';
import ShopSection from '../components/ShopSection';
import FlavorShowcase from '../components/FlavorShowcase';
import AboutSection from '../components/AboutSection';
import SEO from '../components/SEO';

export default function HomePage() {
  return (
    <>
      <SEO 
        title="Home" 
        description="Ganga Makhana brings you 100% natural, premium export-quality roasted fox nuts (makhana). Experience the ultimate healthy snack from Bihar." 
      />
      <HeroSection />
      <BenefitsStrip />
      <FlavorShowcase />
      <ShopSection />
      <AboutSection />
    </>
  );
}
