import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import ShippingPage from './pages/ShippingPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import TrackOrderPage from './pages/TrackOrderPage';
import HealthBenefitsPage from './pages/HealthBenefitsPage';
import FAQPage from './pages/FAQPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <CurrencyProvider>
    <CartProvider>
      <Router>
        <Navbar />
        <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/health" element={<HealthBenefitsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/track" element={<TrackOrderPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </Router>
    </CartProvider>
    </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
