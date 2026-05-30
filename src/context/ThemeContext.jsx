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
  
  const [theme, setTheme] = useState('light');
  const [autoThemeEnabled, setAutoThemeEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Load initial theme from localStorage for guests
  useEffect(() => {
    if (!currentUser) {
      const savedTheme = localStorage.getItem('gangaTheme') || 'light';
      setTheme(savedTheme);
      applyTheme(savedTheme);
      
      const savedAuto = localStorage.getItem('gangaAutoTheme');
      setAutoThemeEnabled(savedAuto === 'true');
    }
  }, [currentUser]);

  // Load theme from Firestore for authenticated users
  useEffect(() => {
    if (currentUser && userProfile) {
      const userTheme = userProfile.theme || 'light';
      setTheme(userTheme);
      applyTheme(userTheme);
      
      setAutoThemeEnabled(userProfile.autoThemeEnabled ?? false);
      
      // Clean up localStorage for guests to avoid conflicts
      localStorage.removeItem('gangaTheme');
      localStorage.removeItem('gangaAutoTheme');
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

  const checkAutoTheme = async () => {
    if (!autoThemeEnabled) return;
    const consent = localStorage.getItem('gangaConsent');
    if (consent !== 'accepted') return; // Cannot check location without consent

    try {
      // Use IP to get location
      const res = await fetch('https://ipapi.co/json/');
      if (!res.ok) return;
      const data = await res.json();
      
      if (!data.timezone) return;
      
      setUserLocation({ ip: data.ip, city: data.city, timezone: data.timezone });

      // Calculate time in that timezone
      const timeOpts = { timeZone: data.timezone, hour: 'numeric', hour12: false };
      const formatter = new Intl.DateTimeFormat([], timeOpts);
      const hour = parseInt(formatter.format(new Date()), 10);

      // Evening is from 18:00 (6 PM) to 06:00 (6 AM)
      const isEvening = hour >= 18 || hour < 6;
      
      const targetTheme = isEvening ? 'dark' : 'light';
      if (theme !== targetTheme) {
        setTheme(targetTheme);
        applyTheme(targetTheme);
        
        // We don't save auto-toggled theme to preferences automatically 
        // to not overwrite user's manual preference if they turn off auto mode later
      }
    } catch (e) {
      console.error('Failed to fetch IP location for auto theme', e);
    }
  };

  // Run auto theme check on mount, when enabled, or periodically
  useEffect(() => {
    checkAutoTheme();
    // Re-check every 5 minutes
    const interval = setInterval(checkAutoTheme, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [autoThemeEnabled, theme]); // theme in deps so interval has fresh state

  // Listen to consent change
  useEffect(() => {
    const handleConsent = () => checkAutoTheme();
    window.addEventListener('consentChanged', handleConsent);
    return () => window.removeEventListener('consentChanged', handleConsent);
  }, [autoThemeEnabled, theme]);

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

  const toggleAutoTheme = async (enabled) => {
    setAutoThemeEnabled(enabled);
    if (currentUser) {
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, { autoThemeEnabled: enabled });
      } catch (error) {
        console.error("Error updating autoTheme in Firestore:", error);
      }
    } else {
      localStorage.setItem('gangaAutoTheme', enabled ? 'true' : 'false');
    }
    
    // Check immediately if enabled
    if (enabled) {
      checkAutoTheme();
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, autoThemeEnabled, toggleAutoTheme, userLocation }}>
      {children}
    </ThemeContext.Provider>
  );
}
