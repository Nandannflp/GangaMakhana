import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useCurrency } from '../../context/CurrencyContext';
import { generateInvoicePDF } from './InvoiceGenerator';
import { Download, FileText, AlertCircle, Package } from 'lucide-react';
import './MyOrders.css';

export default function MyOrders() {
  const { currentUser } = useAuth();
  const { formatPrice } = useCurrency();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generatingId, setGeneratingId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', currentUser.uid),
          // orderBy('createdAt', 'desc') // Need index for orderBy with where, so we sort locally if no index
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort locally to avoid needing immediate Firestore composite index
        fetchedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const handleDownloadInvoice = async (order) => {
    setGeneratingId(order.orderId);
    try {
      await generateInvoicePDF(order, formatPrice);
    } catch (err) {
      console.error("Failed to generate invoice:", err);
      alert("Failed to generate invoice. Please try again.");
    } finally {
      setGeneratingId(null);
    }
  };

  if (loading) {
    return <div className="profile-section"><p>Loading your orders...</p></div>;
  }

  return (
    <div className="profile-section my-orders-section">
      <div className="section-header">
        <h2>My Orders</h2>
        <p>View your past orders and download invoices.</p>
      </div>

      {error && (
        <div className="error-message" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'red', marginBottom: '20px' }}>
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="empty-state">
          <Package size={48} color="#ccc" />
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.orderId}>
              <div className="order-header">
                <div>
                  <span className="order-id">Order #{order.orderId}</span>
                  <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="order-status-badge">
                  {order.status || 'Pending Verification'}
                </div>
              </div>
              
              <div className="order-details">
                <div className="order-items-summary">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''} • {formatPrice(order.total)}
                </div>
                
                <button 
                  className="btn-secondary btn-sm"
                  onClick={() => handleDownloadInvoice(order)}
                  disabled={generatingId === order.orderId}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', padding: '6px 12px' }}
                >
                  {generatingId === order.orderId ? (
                    'Generating...'
                  ) : (
                    <>
                      <Download size={16} /> Download Invoice
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
