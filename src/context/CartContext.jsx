import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  
  // Ref to prevent initial fetch from overwriting state immediately loop
  const initialFetchDone = useRef(false);

  // Fetch cart when user logs in, clear when logged out
  useEffect(() => {
    async function fetchCart() {
      if (currentUser) {
        setLoadingCart(true);
        try {
          const cartRef = doc(db, 'users', currentUser.uid, 'cart', 'data');
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            setCart(cartSnap.data().items || []);
          } else {
            setCart([]);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
          setCart([]);
        }
        setLoadingCart(false);
        initialFetchDone.current = true;
      } else {
        // Guest user: clear cart, remove local storage just in case legacy data exists
        setCart([]);
        localStorage.removeItem('gangaCart');
        setLoadingCart(false);
        initialFetchDone.current = true;
      }
    }
    
    fetchCart();
  }, [currentUser]);

  // Sync cart to Firestore when it changes (only if logged in and fetch is done)
  useEffect(() => {
    if (currentUser && initialFetchDone.current && !loadingCart) {
      const syncCart = async () => {
        try {
          const cartRef = doc(db, 'users', currentUser.uid, 'cart', 'data');
          await setDoc(cartRef, { items: cart });
        } catch (error) {
          console.error("Error saving cart to Firestore:", error);
        }
      };
      // Debounce saving if needed, but for now just save directly
      syncCart();
    }
  }, [cart, currentUser, loadingCart]);

  const addToCart = (product, quantity = 1) => {
    if (!currentUser) {
      return { success: false, requireLogin: true };
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    return { success: true };
  };

  const removeFromCart = (id) => {
    if (!currentUser) return;
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (!currentUser) return;
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    clearCart,
    loadingCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
