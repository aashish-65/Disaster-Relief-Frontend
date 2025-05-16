import api from './api';

const RESOURCE_ENDPOINT = '/resources';

const resourceService = {
  // Add a new resource
  addResource: async (resourceData) => {
    const response = await api.post(RESOURCE_ENDPOINT, resourceData);
    return response.data;
  },

  // Get all resources with optional filtering
  getResources: async (params) => {
    const response = await api.get(RESOURCE_ENDPOINT, { params });
    return response.data;
  },

  // Get nearby resources based on location
  getNearbyResources: async (longitude, latitude, maxDistance, resourceType) => {
    const response = await api.get(`${RESOURCE_ENDPOINT}/nearby`, {
      params: { longitude, latitude, maxDistance, resourceType }
    });
    return response.data;
  },

  // Request resources
  requestResource: async (requestData) => {
    const response = await api.post(`${RESOURCE_ENDPOINT}/request`, requestData);
    return response.data;
  },

  // Allocate resources to a request
  allocateResource: async (resourceId, allocationData) => {
    const response = await api.put(`${RESOURCE_ENDPOINT}/${resourceId}/allocate`, allocationData);
    return response.data;
  },

  // Update resource request status
  updateRequestStatus: async (requestId, status) => {
    const response = await api.put(`${RESOURCE_ENDPOINT}/requests/${requestId}/status`, { status });
    return response.data;
  }
};

export default resourceService;