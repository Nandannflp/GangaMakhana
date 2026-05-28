import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import './CartPage.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { formatPrice } = useCurrency();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = getCartTotal();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 50;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Your Cart is Empty</h2>
          <p style={{ color: 'var(--color-text-light)', margin: '20px 0 40px 0' }}>Looks like you haven't added any delicious makhana yet.</p>
          <Link to="/#shop" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <Link to="/#shop" className="back-link">
            <ArrowLeft size={20} /> Continue Shopping
          </Link>
          <h1>Your Shopping Cart</h1>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            <div className="cart-items-header">
              <span className="col-product">Product</span>
              <span className="col-price">Price</span>
              <span className="col-qty">Quantity</span>
              <span className="col-total">Total</span>
            </div>

            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="col-product item-product">
                  <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={18} />
                  </button>
                  <img src={item.imgFront || item.image} alt={item.flavor || item.name} className="item-img" />
                  <div className="item-details">
                    <h3>{item.flavor || item.name}</h3>
                    <p>{item.variant || [item.size, item.weight].filter(Boolean).join(' / ') || item.weight}</p>
                  </div>
                </div>
                
                <div className="col-price item-price">
                  {formatPrice(item.price)}
                </div>
                
                <div className="col-qty item-qty">
                  <div className="qty-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14}/></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14}/></button>
                  </div>
                </div>
                
                <div className="col-total item-total">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="shipping-note">Free shipping on orders over {formatPrice(999)}</p>
            )}

            <div className="summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button className="btn-primary btn-checkout">Proceed to Checkout</button>
            
            <div className="secure-checkout">
              <p>🔒 Secure Encrypted Checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
