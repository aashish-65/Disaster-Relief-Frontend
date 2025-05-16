import api from './api';

const incidentService = {
  // Get all incidents with optional filters
  getIncidents: async (filters = {}) => {
    try {
      const response = await api.get('/incidents', { params: filters });
      return response;
    } catch (error) {
      console.error('Error fetching incidents:', error);
      throw error;
    }
  },
  
  // Get a single incident by ID
  getIncidentById: async (id) => {
    try {
      const response = await api.get(`/incidents/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching incident ${id}:`, error);
      throw error;
    }
  },
  
  // Report a new incident
  reportIncident: async (incidentData) => {
    try {
      const response = await api.post('/incidents', incidentData);
      return response;
    } catch (error) {
      console.error('Error reporting incident:', error);
      throw error;
    }
  },
  
  // Update an incident
  updateIncident: async (id, incidentData) => {
    try {
      const response = await api.put(`/incidents/${id}`, incidentData);
      return response;
    } catch (error) {
      console.error(`Error updating incident ${id}:`, error);
      throw error;
    }
  },
  
  // Delete an incident
  deleteIncident: async (id) => {
    try {
      const response = await api.delete(`/incidents/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting incident ${id}:`, error);
      throw error;
    }
  },
  
  // Get nearby incidents based on location
  getNearbyIncidents: async (lat, lng, radius = 10) => {
    try {
      const response = await api.get('/incidents/nearby', {
        params: { lat, lng, radius }
      });
      return response;
    } catch (error) {
      console.error('Error fetching nearby incidents:', error);
      throw error;
    }
  }
};

export default incidentService;
