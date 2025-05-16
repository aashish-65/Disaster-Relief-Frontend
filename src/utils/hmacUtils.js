// src/utils/hmacUtils.js
import crypto from 'crypto-js';

// These should match your backend configuration
// In production, use environment variables
const API_KEY = import.meta.env.VITE_API_KEY || 'your-api-key';
const SECRET_KEY = import.meta.env.VITE_CLIENT_SECRET || 'your-client-secret';

/**
 * Generates HMAC signature for API requests
 * @returns {Object} Headers with API key, timestamp and signature
 */
export const generateHMACHeaders = () => {
  const timestamp = Date.now().toString();
  const data = API_KEY + timestamp;
  
  // Create HMAC SHA-256 signature using the secret key
  const signature = crypto.HmacSHA256(data, SECRET_KEY).toString(crypto.enc.Hex);
  
  return {
    'api-key': API_KEY,
    'timestamp': timestamp,
    'signature': signature
  };
};