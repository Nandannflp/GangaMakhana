import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, CreditCard, Landmark, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import SEO from '../components/SEO';
import './CheckoutPage.css';

const paymentOptions = [
  {
    id: 'upi',
    label: 'UPI / QR',
    description: 'Fast checkout for Indian customers',
    icon: <BadgeCheck size={18} />,
  },
  {
    id: 'card',
    label: 'Credit / Debit Card',
    description: 'Visa, Mastercard, RuPay',
    icon: <CreditCard size={18} />,
  },
  {
    id: 'bank',
    label: 'Bank Transfer',
    description: 'For bulk or manual verification orders',
    icon: <Landmark size={18} />,
  },
];

export default function CheckoutPage() {
  const { cart, getCartTotal } = useCart();
  const { formatPrice } = useCurrency();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 999 ? 0 : 50;
  const total = subtotal + shipping;

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="checkout-page">
      <SEO
        title="Checkout"
        description="Complete your Ganga Makhana order with shipping details, payment preference, and a final order summary."
      />

      <div className="container">
        <div className="checkout-header">
          <Link to="/cart" className="back-link">
            <ArrowLeft size={20} /> Back to Cart
          </Link>
          <div>
            <h1>Proceed to Checkout</h1>
            <p>Enter your shipping details and confirm your order.</p>
          </div>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form-card" onSubmit={handleSubmit}>
            <section className="checkout-section">
              <div className="section-heading">
                <MapPin size={20} />
                <h2>Shipping Details</h2>
              </div>

              <div className="checkout-grid two-col">
                <label className="field">
                  <span>Full Name</span>
                  <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required />
                </label>
                <label className="field">
                  <span>Phone Number</span>
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="WhatsApp / mobile number" required />
                </label>
              </div>

              <div className="checkout-grid two-col">
                <label className="field">
                  <span>Email Address</span>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" required />
                </label>
                <label className="field">
                  <span>PIN Code</span>
                  <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Delivery PIN code" required />
                </label>
              </div>

              <label className="field">
                <span>Address Line 1</span>
                <input name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="House number, street, locality" required />
              </label>

              <label className="field">
                <span>Address Line 2</span>
                <input name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Landmark, apartment, optional" />
              </label>

              <div className="checkout-grid two-col">
                <label className="field">
                  <span>City</span>
                  <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                </label>
                <label className="field">
                  <span>State</span>
                  <input name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
                </label>
              </div>

              <label className="field">
                <span>Delivery Notes</span>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Gate code, preferred delivery timing, or gifting note"
                />
              </label>
            </section>

            <section className="checkout-section">
              <div className="section-heading">
                <CreditCard size={20} />
                <h2>Payment Method</h2>
              </div>

              <div className="payment-options">
                {paymentOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`payment-option ${paymentMethod === option.id ? 'active' : ''}`}
                    onClick={() => setPaymentMethod(option.id)}
                  >
                    <div className="payment-icon">{option.icon}</div>
                    <div className="payment-copy">
                      <strong>{option.label}</strong>
                      <span>{option.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <button type="submit" className="btn-primary checkout-submit">
              Confirm Order Request
            </button>
          </form>

          <aside className="checkout-summary-card">
            <h3>Order Summary</h3>

            <div className="summary-items">
              {cart.map((item) => (
                <div className="summary-item" key={item.id}>
                  <img src={item.imgFront || item.image} alt={item.name || item.flavor} />
                  <div className="summary-item-copy">
                    <strong>{item.name || item.flavor}</strong>
                    <span>{item.variant || [item.size, item.weight].filter(Boolean).join(' / ')}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <div className="summary-item-price">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="summary-row summary-row-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <div className="checkout-assurance">
              <div className="assurance-chip">
                <ShieldCheck size={18} />
                <span>Secure Encrypted Checkout</span>
              </div>
              <div className="assurance-chip">
                <Truck size={18} />
                <span>Dispatch support from Bihar</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
