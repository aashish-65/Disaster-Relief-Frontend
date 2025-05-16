import { useState, useEffect } from 'react';
import InteractiveMap from '../../components/maps/InteractiveMap';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Link } from 'react-router-dom';

const IncidentMap = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    severity: '',
    status: ''
  });
  
  const handleMarkerClick = (marker) => {
    setSelectedIncident(marker);
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      type: '',
      severity: '',
      status: ''
    });
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Incident Map</h1>
          <Link
            to="/incidents/report"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Report New Incident
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Incident Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">All Types</option>
                  <option value="flood">Flood</option>
                  <option value="earthquake">Earthquake</option>
                  <option value="cyclone">Cyclone</option>
                  <option value="landslide">Landslide</option>
                  <option value="drought">Drought</option>
                  <option value="fire">Fire</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
                  Severity
                </label>
                <select
                  id="severity"
                  name="severity"
                  value={filters.severity}
                  onChange={handleFilterChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="monitoring">Monitoring</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-[600px]">
            <InteractiveMap
              height="100%"
              onMarkerClick={handleMarkerClick}
              autoFetch={true}
              filters={filters}
            />
          </div>
        </div>
        
        {selectedIncident && (
          <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">{selectedIncident.title}</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <p className="text-gray-900">{selectedIncident.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Severity</p>
                  <p className="text-gray-900">{selectedIncident.severity}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Link
                  to={`/incidents/${selectedIncident.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default IncidentMap;