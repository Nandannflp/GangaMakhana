import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BenefitsStrip from './components/BenefitsStrip';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ConsentBanner from './components/ConsentBanner';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import WholesalePage from './pages/WholesalePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import StoryPage from './pages/StoryPage';
import ProductPage from './pages/ProductPage';
import FAQPage from './pages/FAQPage';
import HealthBenefitsPage from './pages/HealthBenefitsPage';
import ShippingPage from './pages/ShippingPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import TrackOrderPage from './pages/TrackOrderPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <BenefitsStrip />
      <Navbar />
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/wholesale" element={<WholesalePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/health" element={<HealthBenefitsPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/track" element={<TrackOrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      <ConsentBanner />
    </Router>
  );
}

export default App;
