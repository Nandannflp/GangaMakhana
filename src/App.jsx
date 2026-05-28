import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import StoryPage from './pages/StoryPage';
import ProductPage from './pages/ProductPage';
import FAQPage from './pages/FAQPage';
import HealthBenefitsPage from './pages/HealthBenefitsPage';
import ShippingPage from './pages/ShippingPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import TrackOrderPage from './pages/TrackOrderPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/health" element={<HealthBenefitsPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/track" element={<TrackOrderPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
