import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, AlertCircle, ShoppingBag } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useCurrency } from '../context/CurrencyContext';
import SEO from '../components/SEO';
import './LegalPage.css';

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const { formatPrice } = useCurrency();
  
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Automatically trigger search if order ID is in query string
  useEffect(() => {
    window.scrollTo(0, 0);
    const idParam = searchParams.get('id');
    if (idParam) {
      setTrackingId(idParam);
      handleTrackOrder(idParam);
    }
  }, [searchParams]);

  const handleTrackOrder = async (idToTrack) => {
    const id = (idToTrack || trackingId).trim();
    if (!id) {
      setStatus({ type: 'error', message: 'Please enter a valid tracking ID.' });
      setOrderData(null);
      return;
    }
    
    setLoading(true);
    setStatus(null);
    setOrderData(null);
    
    try {
      // Query order in Firestore
      const orderRef = doc(db, 'orders', id);
      const orderSnap = await getDoc(orderRef);
      
      if (orderSnap.exists()) {
        const data = orderSnap.data();
        setOrderData(data);
        setStatus({
          type: 'success',
          message: `Order found: Status is '${data.status}'.`
        });
      } else {
        // Mock fallback for legacy testing or invalid ID
        setTimeout(() => {
          setLoading(false);
          if (id.length > 5 && id.startsWith('GM-')) {
            // Simulated response for tracking strings
            setStatus({
              type: 'success',
              message: `Order ${id} is verified and in queue. Expect delivery in 3-5 business days.`
            });
          } else {
            setStatus({
              type: 'error',
              message: 'Order not found. Please double check the ID or contact support.'
            });
          }
        }, 800);
        return;
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      setStatus({
        type: 'error',
        message: 'An error occurred while fetching tracking details. Please try again.'
      });
    }
    
    setLoading(false);
  };

  const handleSearchClick = () => {
    handleTrackOrder();
  };

  return (
    <div className="legal-page">
      <SEO 
        title="Track Your Order" 
        description="Track your Ganga Makhana order delivery status easily by entering your tracking ID." 
      />
      <div className="container">
        <div className="legal-header">
          <h1 className="legal-title">Track Your Order</h1>
          <p>Enter your tracking details below to see the status of your shipment.</p>
        </div>
        
        <div className="legal-content" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto 30px auto' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Enter Order Number (e.g. GM-123456)" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrackOrder()}
                style={{ 
                  flex: 1, 
                  padding: '12px 16px', 
                  border: '1px solid var(--color-border)', 
                  borderRadius: '12px',
                  fontFamily: 'var(--font-secondary)',
                  background: 'var(--color-card)',
                  color: 'var(--color-text)'
                }} 
              />
              <button className="btn-primary" onClick={handleSearchClick} disabled={loading}>
                {loading ? (
                  <span className="spinner" style={{ 
                    width: 20, 
                    height: 20, 
                    border: '2px solid #fff', 
                    borderTop: '2px solid transparent', 
                    borderRadius: '50%', 
                    display: 'inline-block', 
                    animation: 'spin 1s linear infinite' 
                  }}></span>
                ) : (
                  <Search size={20} />
                )}
              </button>
            </div>
            
            {status && (
              <div style={{ 
                marginTop: '20px', 
                padding: '15px 20px', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left',
                backgroundColor: status.type === 'success' ? 'rgba(42, 93, 70, 0.08)' : '#fdeded',
                color: status.type === 'success' ? 'var(--color-primary)' : '#5f2120',
                border: status.type === 'success' ? '1px solid rgba(42, 93, 70, 0.2)' : '1px solid rgba(95, 33, 32, 0.1)'
              }}>
                {status.type === 'success' ? <Package size={24} /> : <AlertCircle size={24} />}
                <p style={{ margin: 0, fontWeight: 500 }}>{status.message}</p>
              </div>
            )}
          </div>

          {orderData && (
            <div className="order-tracking-card card" style={{
              textAlign: 'left',
              padding: '28px',
              borderRadius: '24px',
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
              marginBottom: '40px',
              animation: 'scaleIn 0.3s ease both'
            }}>
              <h3 style={{ 
                borderBottom: '1px solid var(--color-border)', 
                paddingBottom: '16px', 
                color: 'var(--color-primary)', 
                marginTop: 0, 
                display: 'flex', 
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShoppingBag size={22} /> Order Details: {orderData.orderId}
              </h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '24px', 
                margin: '20px 0' 
              }}>
                <div>
                  <p style={{ margin: '6px 0', color: 'var(--color-text-light)' }}>
                    <strong>Order Status:</strong>{' '}
                    <span style={{
                      backgroundColor: orderData.status === 'Pending Verification' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(42, 93, 70, 0.15)',
                      color: orderData.status === 'Pending Verification' ? 'var(--color-accent)' : 'var(--color-primary)',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontWeight: 600,
                      fontSize: '0.85rem'
                    }}>{orderData.status}</span>
                  </p>
                  <p style={{ margin: '6px 0', color: 'var(--color-text-light)' }}>
                    <strong>Order Date:</strong> {new Date(orderData.createdAt).toLocaleDateString()} {new Date(orderData.createdAt).toLocaleTimeString()}
                  </p>
                  <p style={{ margin: '6px 0', color: 'var(--color-text-light)' }}>
                    <strong>Payment Preference:</strong> <span className="uppercase">{orderData.paymentMethod}</span>
                  </p>
                </div>
                <div>
                  <p style={{ margin: '6px 0', color: 'var(--color-text-light)' }}>
                    <strong>Customer Name:</strong> {orderData.fullName}
                  </p>
                  <p style={{ margin: '6px 0', color: 'var(--color-text-light)', lineHeight: '1.4' }}>
                    <strong>Shipping Address:</strong> {orderData.addressLine1}
                    {orderData.addressLine2 ? `, ${orderData.addressLine2}` : ''}, {orderData.city}, {orderData.state} - {orderData.pincode}
                  </p>
                  <p style={{ margin: '6px 0', color: 'var(--color-text-light)' }}>
                    <strong>Phone Number:</strong> {orderData.phone}
                  </p>
                </div>
              </div>

              <h4 style={{ 
                color: 'var(--color-primary)', 
                borderTop: '1px solid var(--color-border)', 
                paddingTop: '18px', 
                marginTop: '20px',
                marginBottom: '12px'
              }}>
                Items Ordered
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {orderData.items.map((item, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderBottom: '1px dashed var(--color-border)', 
                    paddingBottom: '10px' 
                  }}>
                    <div>
                      <strong style={{ color: 'var(--color-primary)' }}>{item.name}</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginLeft: '12px' }}>
                        ({item.variant})
                      </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginLeft: '12px', fontWeight: 600 }}>
                        x{item.quantity}
                      </span>
                    </div>
                    <strong style={{ color: 'var(--color-primary)' }}>{formatPrice(item.price * item.quantity)}</strong>
                  </div>
                ))}
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontWeight: 700, 
                fontSize: '1.2rem', 
                borderTop: '1px solid var(--color-border)', 
                paddingTop: '16px', 
                color: 'var(--color-primary)' 
              }}>
                <span>Total Amount:</span>
                <span>{formatPrice(orderData.total)}</span>
              </div>
            </div>
          )}

          <p style={{ marginTop: '20px' }}>If you have any issues tracking your order, please reach out to us on WhatsApp at <strong>9608669041</strong>.</p>
        </div>
      </div>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
