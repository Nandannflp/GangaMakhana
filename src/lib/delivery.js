/**
 * Calculates a delivery estimate based on a pincode.
 * In a real application, this would call a shipping API (like Shiprocket or Delhivery).
 * For this implementation, we simulate rules based on Indian pincodes.
 *
 * @param {string} pincode - The delivery pincode
 * @returns {object} - Object containing estimated days and formatted date string.
 */
export function getDeliveryEstimate(pincode) {
  if (!pincode || pincode.length !== 6) {
    return {
      daysMin: 5,
      daysMax: 7,
      formattedText: "5-7 Business Days"
    };
  }

  const prefix = pincode.substring(0, 2);
  let daysMin = 3;
  let daysMax = 5;

  // Simulate regional logic based on first 2 digits of Indian Pincode
  // Assuming origin is Bihar (80-85)
  if (prefix >= '80' && prefix <= '85') {
    // Local / Nearby
    daysMin = 1;
    daysMax = 2;
  } else if (['11', '12', '40', '41', '50', '56', '60', '70'].includes(prefix)) {
    // Metros (Delhi, Mumbai, Hyderabad, Bangalore, Chennai, Kolkata)
    daysMin = 2;
    daysMax = 4;
  } else if (prefix >= '79') {
    // North East
    daysMin = 7;
    daysMax = 10;
  } else {
    // Rest of India
    daysMin = 4;
    daysMax = 6;
  }

  // Calculate actual dates
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + daysMin);
  
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + daysMax);

  const options = { day: 'numeric', month: 'short' };
  const formattedText = `Expected Delivery: ${minDate.toLocaleDateString('en-IN', options)} - ${maxDate.toLocaleDateString('en-IN', options)}`;

  return {
    daysMin,
    daysMax,
    formattedText
  };
}

/**
 * Calculates a mock distance based on city/country string hash.
 */
export function getMockDistance(city, country = 'India') {
  if (!city) return 0;
  const str = (city + country).toLowerCase().replace(/\s/g, '');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; 
  }
  hash = Math.abs(hash);
  
  if (country.toLowerCase() === 'india' || country.toLowerCase() === 'in') {
    // 50km to 2500km for domestic
    return 50 + (hash % 2450);
  } else {
    // 2500km to 15000km for international
    return 2500 + (hash % 12500);
  }
}

/**
 * Calculates delivery dates and costs based on distance.
 */
export function calculateShipping(distance, isInternational) {
  let minDays, maxDays, minCost, maxCost;
  
  if (!isInternational) {
    minDays = Math.max(1, Math.floor(distance / 400)); // ~1 day per 400km
    maxDays = minDays + 2;
    minCost = Math.max(40, Math.floor(distance / 20)); // Base ₹40 + ₹1 per 20km
    maxCost = minCost + 30; // ₹30 variance
  } else {
    minDays = Math.max(5, Math.floor(distance / 1200)); 
    maxDays = minDays + 5;
    minCost = Math.max(1200, Math.floor(distance / 4)); // Base ₹1200
    maxCost = minCost + 800; // Large variance for international
  }

  // Calculate actual dates
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + minDays);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + maxDays);
  
  const options = { day: 'numeric', month: 'short' };
  const dateRange = `${minDate.toLocaleDateString('en-IN', options)} - ${maxDate.toLocaleDateString('en-IN', options)}`;

  return {
    distance,
    minDays,
    maxDays,
    dateRange,
    minCost,
    maxCost
  };
}
