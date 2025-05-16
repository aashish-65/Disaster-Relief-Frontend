// src/services/authService.js
import api from './api';

const AUTH_ENDPOINT = '/auth';

const authService = {
  login: async (credentials) => {
    const { email, password } = credentials;
    // Getting role from credentials or defaulting to user
    const role = credentials.role || 'user';
    
    try {
      const response = await api.post(`${AUTH_ENDPOINT}/login`, { 
        email, 
        password, 
        role // Include role parameter as your backend expects it
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    const response = await api.post(`${AUTH_ENDPOINT}/register`, userData);
    return response.data;
  },

  registerNGO: async (ngoData) => {
    const response = await api.post(`${AUTH_ENDPOINT}/ngo/register`, ngoData);
    return response.data;
  },

  registerVolunteer: async (volunteerData) => {
    const response = await api.post(`${AUTH_ENDPOINT}/volunteer/register`, volunteerData);
    return response.data;
  },

  verifyOTP: async (email, otp) => {
    const response = await api.post(`${AUTH_ENDPOINT}/verify-otp`, { email, otp });
    return response.data;
  },

  sendOTP: async (email) => {
    const response = await api.post(`${AUTH_ENDPOINT}/send-otp`, { email });
    return response.data;
  },

  requestPasswordReset: async (email) => {
    const response = await api.post(`${AUTH_ENDPOINT}/reset-password`, { email });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    const response = await api.put(`${AUTH_ENDPOINT}/reset-password`, { 
      token, 
      newPassword 
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get(`${AUTH_ENDPOINT}/me`);
    return response.data;
  },
};

export default authService;