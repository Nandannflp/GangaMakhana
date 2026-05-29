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
