import api from './api';

const USER_ENDPOINT = '/auth/user';

const userService = {
  // Get user profile
  getUserProfile: async () => {
    const response = await api.get(`${USER_ENDPOINT}/profile`);
    return response.data;
  },

  // Update user profile
  updateUserProfile: async (userData) => {
    const response = await api.put(`${USER_ENDPOINT}/update`, userData);
    return response.data;
  },

  // Get all users (admin only)
  getAllUsers: async () => {
    const response = await api.get(`${USER_ENDPOINT}/get-all-users`);
    return response.data;
  },

  // Update user by ID (admin only)
  updateUserById: async (userId, userData) => {
    const response = await api.put(`${USER_ENDPOINT}/update/${userId}`, userData);
    return response.data;
  }
};

export default userService;