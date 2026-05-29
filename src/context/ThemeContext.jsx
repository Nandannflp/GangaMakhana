import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const { currentUser, userProfile } = useAuth();
  
  // Default to light if nothing is found
  const [theme, setTheme] = useState('light');
  
  // Load initial theme from localStorage for guests
  useEffect(() => {
    if (!currentUser) {
      const savedTheme = localStorage.getItem('gangaTheme') || 'light';
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, [currentUser]);

  // Load theme from Firestore for authenticated users
  useEffect(() => {
    if (currentUser && userProfile) {
      const userTheme = userProfile.theme || 'light';
      setTheme(userTheme);
      applyTheme(userTheme);
      // Clean up localStorage for guests to avoid conflicts
      localStorage.removeItem('gangaTheme');
    }
  }, [currentUser, userProfile]);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);

    if (currentUser) {
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, { theme: newTheme });
      } catch (error) {
        console.error("Error updating theme in Firestore:", error);
      }
    } else {
      localStorage.setItem('gangaTheme', newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
