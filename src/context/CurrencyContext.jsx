import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('INR');
  const [rates, setRates] = useState({ INR: 1 });
  const [loading, setLoading] = useState(true);

  const SUPPORTED_CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'SGD', 'AED'];

  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        // 1. Try to fetch user location/currency
        let userCurrency = 'INR';
        try {
          const locRes = await fetch('https://ipapi.co/json/');
          if (locRes.ok) {
            const locData = await locRes.json();
            if (locData.currency && SUPPORTED_CURRENCIES.includes(locData.currency)) {
              userCurrency = locData.currency;
            } else if (locData.currency && !SUPPORTED_CURRENCIES.includes(locData.currency)) {
               // Fallback to USD if unsupported global currency
               userCurrency = locData.country_code === 'IN' ? 'INR' : 'USD';
            }
          }
        } catch (e) {
          console.error("Location fetch failed, defaulting to INR", e);
        }

        // 2. Fetch live exchange rates against INR
        try {
          const ratesRes = await fetch('https://open.er-api.com/v6/latest/INR');
          if (ratesRes.ok) {
            const ratesData = await ratesRes.json();
            if (ratesData && ratesData.rates) {
              setRates(ratesData.rates);
            }
          }
        } catch (e) {
          console.error("Exchange rate fetch failed, using fallback 1:1 rates", e);
        }

        // Prioritize local storage if user manually selected before
        const savedCurrency = localStorage.getItem('gangaCurrency');
        if (savedCurrency && SUPPORTED_CURRENCIES.includes(savedCurrency)) {
          setCurrency(savedCurrency);
        } else {
          setCurrency(userCurrency);
        }

      } catch (error) {
        console.error("Currency initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeCurrency();
  }, []);

  const handleSetCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('gangaCurrency', newCurrency);
  };

  const formatPrice = (priceInINR) => {
    if (loading || !rates[currency]) {
      return `₹${priceInINR}`;
    }

    const converted = priceInINR * rates[currency];
    
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: currency === 'INR' ? 0 : 2
    }).format(converted);
  };

  const value = {
    currency,
    setCurrency: handleSetCurrency,
    formatPrice,
    loading,
    supportedCurrencies: SUPPORTED_CURRENCIES
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}
