import api from './api';

const AUTH_ENDPOINT = '/auth';

const authService = {
  login: async (email, password) => {
    const response = await api.post(`${AUTH_ENDPOINT}/login`, { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post(`${AUTH_ENDPOINT}/register`, userData);
    return response.data;
  },

  registerNGO: async (ngoData) => {
    const response = await api.post(`${AUTH_ENDPOINT}/register/ngo`, ngoData);
    return response.data;
  },

  registerVolunteer: async (volunteerData) => {
    const response = await api.post(`${AUTH_ENDPOINT}/register/volunteer`, volunteerData);
    return response.data;
  },

  verifyOTP: async (email, otp) => {
    const response = await api.post(`${AUTH_ENDPOINT}/verify-otp`, { email, otp });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post(`${AUTH_ENDPOINT}/forgot-password`, { email });
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await api.post(`${AUTH_ENDPOINT}/reset-password`, { token, password });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get(`${AUTH_ENDPOINT}/me`);
    return response.data;
  },
};

export default authService;