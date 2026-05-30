import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, CreditCard, Landmark, MapPin, ShieldCheck, Truck, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
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
  const { cart, getCartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const { currentUser } = useAuth();
  
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

  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [createdOrder, setCreatedOrder] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cart.length === 0 && status !== 'success') {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    
    // Validations
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim() ||
        !formData.addressLine1.trim() || !formData.city.trim() || !formData.state.trim() || !formData.pincode.trim()) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Pincode validation: 6 digits for India
    if (!/^\d{6}$/.test(formData.pincode)) {
      setErrorMessage('Please enter a valid 6-digit PIN code.');
      return;
    }

    // Phone validation: min 10 digits
    if (!/^\+?[\d\s-]{10,14}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      setErrorMessage('Please enter a valid phone number (at least 10 digits).');
      return;
    }

    setStatus('submitting');

    try {
      const orderId = `GM-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderData = {
        orderId,
        userId: currentUser ? currentUser.uid : 'guest',
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        notes: formData.notes,
        paymentMethod,
        items: cart.map(item => ({
          id: item.id,
          name: item.name || item.flavor,
          flavor: item.flavor || item.name,
          quantity: item.quantity,
          price: item.price,
          variant: item.variant || [item.size, item.weight].filter(Boolean).join(' / ') || item.weight
        })),
        subtotal,
        shipping,
        total,
        status: 'Pending Verification',
        createdAt: new Date().toISOString(),
      };

      // Save order to Firestore
      await setDoc(doc(db, 'orders', orderId), orderData);

      setCreatedOrder(orderData);
      setStatus('success');
      clearCart();
    } catch (error) {
      console.error('Error submitting order:', error);
      setErrorMessage('Failed to place order. Please try again or contact support.');
      setStatus('error');
    }
  };

  if (status === 'success' && createdOrder) {
    return (
      <div className="checkout-success-page page-enter">
        <div className="container text-center">
          <div className="success-card card">
            <div className="success-icon-wrapper">
              <BadgeCheck size={56} className="success-icon" />
            </div>
            <h1 className="text-display">Order Confirmed!</h1>
            <p className="success-intro">Thank you for your purchase. Your order has been received and is being processed.</p>
            
            <div className="order-details-box">
              <div className="order-row">
                <span>Order ID:</span>
                <strong>{createdOrder.orderId}</strong>
              </div>
              <div className="order-row">
                <span>Date:</span>
                <span>{new Date(createdOrder.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="order-row">
                <span>Payment Method:</span>
                <span className="uppercase">{createdOrder.paymentMethod}</span>
              </div>
              <div className="order-row">
                <span>Total Amount:</span>
                <strong>{formatPrice(createdOrder.total)}</strong>
              </div>
            </div>

            <div className="success-shipping-info">
              <h3>Shipping Address</h3>
              <p><strong>{createdOrder.fullName}</strong></p>
              <p>{createdOrder.addressLine1}</p>
              {createdOrder.addressLine2 && <p>{createdOrder.addressLine2}</p>}
              <p>{createdOrder.city}, {createdOrder.state} - {createdOrder.pincode}</p>
              <p>Phone: {createdOrder.phone}</p>
            </div>

            <div className="action-buttons">
              <Link to={`/track?id=${createdOrder.orderId}`} className="btn-primary w-100 mb-3" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
                Track Order
              </Link>
              <Link to="/#shop" className="btn-secondary w-100" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
                Continue Shopping
              </Link>
            </div>

            <p className="support-text mt-4">
              Need assistance? WhatsApp us at <a href="https://wa.me/919608669041" target="_blank" rel="noopener noreferrer">9608669041</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

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

        {errorMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px',
            backgroundColor: '#fdeded',
            color: '#5f2120',
            borderRadius: '16px',
            marginBottom: '24px',
            border: '1px solid rgba(95, 33, 32, 0.1)'
          }}>
            <AlertCircle size={20} />
            <p style={{ margin: 0, fontWeight: 500 }}>{errorMessage}</p>
          </div>
        )}

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

            <button type="submit" className="btn-primary checkout-submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Processing Order...' : 'Confirm Order Request'}
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
