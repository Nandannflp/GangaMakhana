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
  
  // Initialize cart from localStorage for guests
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('gangaCart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loadingCart, setLoadingCart] = useState(true);
  
  // Ref to prevent initial fetch from overwriting state immediately loop
  const initialFetchDone = useRef(false);

  // Fetch cart when user logs in, clear when logged out
  useEffect(() => {
    async function fetchCart() {
      if (currentUser) {
        initialFetchDone.current = false; // Block sync immediately during fetch
        setLoadingCart(true);
        try {
          const cartRef = doc(db, 'users', currentUser.uid, 'cart', 'data');
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            setCart(cartSnap.data().items || []);
          } else {
            // If user has no cart in DB but has local cart, we can keep the local cart!
            // Wait, to keep it simple, just initialize if empty
            if (cart.length === 0) setCart([]);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
        setLoadingCart(false);
        initialFetchDone.current = true;
      } else {
        // Guest user: don't clear cart, keep it from localStorage
        setLoadingCart(false);
        initialFetchDone.current = true;
      }
    }
    
    fetchCart();
  }, [currentUser]);

  // Sync cart to Firestore or localStorage when it changes
  useEffect(() => {
    if (initialFetchDone.current && !loadingCart) {
      if (currentUser) {
        // Sync to Firestore
        const syncCart = async () => {
          try {
            const cartRef = doc(db, 'users', currentUser.uid, 'cart', 'data');
            await setDoc(cartRef, { items: cart });
          } catch (error) {
            console.error("Error saving cart to Firestore:", error);
          }
        };
        syncCart();
      } else {
        // Sync to localStorage for guests
        localStorage.setItem('gangaCart', JSON.stringify(cart));
      }
    }
  }, [cart, currentUser, loadingCart]);

  const addToCart = (product, quantity = 1) => {
    // We now allow guests to add to cart! No requireLogin.

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
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
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
