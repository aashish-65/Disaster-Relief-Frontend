export const mockIncidents = [
  {
    _id: '1',
    title: 'Flood in Mumbai',
    description: 'Severe flooding in Mumbai suburbs after heavy rainfall',
    type: 'flood',
    severity: 'high',
    status: 'active',
    location: {
      type: 'Point',
      coordinates: [72.8777, 19.0760] // [longitude, latitude]
    },
    address: 'Mumbai, Maharashtra',
    reportedBy: 'user1',
    reportedByName: 'John Doe',
    peopleAffected: 500,
    medicalAttentionNeeded: true,
    createdAt: '2023-07-15T10:30:00Z',
    updatedAt: '2023-07-15T12:45:00Z'
  },
  {
    _id: '2',
    title: 'Earthquake in Delhi',
    description: 'Moderate earthquake felt across Delhi NCR',
    type: 'earthquake',
    severity: 'medium',
    status: 'monitoring',
    location: {
      type: 'Point',
      coordinates: [77.1025, 28.7041] // [longitude, latitude]
    },
    address: 'Delhi, India',
    reportedBy: 'user2',
    reportedByName: 'Jane Smith',
    peopleAffected: 200,
    medicalAttentionNeeded: false,
    createdAt: '2023-07-16T08:15:00Z',
    updatedAt: '2023-07-16T09:30:00Z'
  },
  // Add more mock incidents as needed
];

// Mock implementation of the incident service
const mockIncidentService = {
  getIncidents: async (filters = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Apply basic filtering if needed
    let filteredIncidents = [...mockIncidents];
    
    if (filters.type) {
      filteredIncidents = filteredIncidents.filter(incident => 
        incident.type === filters.type
      );
    }
    
    if (filters.severity) {
      filteredIncidents = filteredIncidents.filter(incident => 
        incident.severity === filters.severity
      );
    }
    
    return { data: filteredIncidents };
  },
  
  getIncidentById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const incident = mockIncidents.find(inc => inc._id === id);
    
    if (!incident) {
      throw new Error('Incident not found');
    }
    
    return { data: incident };
  },
  
  // Implement other methods as needed
};

export default mockIncidentService;