// src/services/api.js
import axios from 'axios';
import { generateHMACHeaders } from '../utils/hmacUtils';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token and HMAC headers to every request
api.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    
    // Add HMAC verification headers
    const hmacHeaders = generateHMACHeaders();
    config.headers['api-key'] = hmacHeaders['api-key'];
    config.headers['timestamp'] = hmacHeaders['timestamp'];
    config.headers['signature'] = hmacHeaders['signature'];
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Handle unauthorized access - clear local storage and redirect to login
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Handle forbidden errors (possibly HMAC validation failures)
      console.error('API access forbidden. Possible issue with API key or signature.');
      
      // Optionally redirect to an error page or show a notification
      // window.location.href = '/error?code=forbidden';
    }
    return Promise.reject(error);
  }
);

export default api;