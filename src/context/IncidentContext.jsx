import { createContext, useContext, useState, useEffect } from 'react';
import incidentService from '../services/incidentService';

const IncidentContext = createContext(null);

export const useIncidents = () => useContext(IncidentContext);

export const IncidentProvider = ({ children }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  
  const fetchIncidents = async (newFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const appliedFilters = { ...filters, ...newFilters };
      const response = await incidentService.getIncidents(appliedFilters);
      setIncidents(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch incidents');
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  const reportIncident = async (incidentData, onUploadProgress) => {
    try {
      setLoading(true);
      setError(null);
      const response = await incidentService.reportIncident(incidentData, onUploadProgress);
      // Refresh incidents after adding a new one
      await fetchIncidents();
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to report incident');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const value = {
    incidents,
    loading,
    error,
    filters,
    setFilters,
    fetchIncidents,
    reportIncident,
    // Add more methods as needed
  };
  
  return <IncidentContext.Provider value={value}>{children}</IncidentContext.Provider>;
};