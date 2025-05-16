import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import incidentService from '../../services/incidentService';
import InteractiveMap from '../../components/maps/InteractiveMap';
import DashboardLayout from '../../components/layout/DashboardLayout';

const IncidentDetail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchIncident();
  }, [id]);
  
  const fetchIncident = async () => {
    try {
      setLoading(true);
      const response = await incidentService.getIncidentById(id);
      setIncident(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load incident details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      try {
        await incidentService.deleteIncident(id);
        navigate('/incidents');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete incident');
      }
    }
  };
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!incident) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p className="text-gray-500">Incident not found</p>
        </div>
      </DashboardLayout>
    );
  }
  
  // Prepare map marker
  const marker = {
    lat: incident.location.coordinates[1],
    lng: incident.location.coordinates[0],
    popup: incident.title
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{incident.title}</h1>
            <p className="text-gray-600">Reported on {new Date(incident.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex space-x-2">
            <Link
              to="/incidents"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
            >
              Back to List
            </Link>
            {currentUser && (currentUser.id === incident.reportedBy || currentUser.role === 'admin') && (
              <>
                <Link
                  to={`/incidents/edit/${id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    incident.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    incident.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    incident.status === 'active' ? 'bg-red-100 text-red-800' :
                    incident.status === 'monitoring' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                  </span>
                </div>
                
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700 mb-6">{incident.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="text-gray-900">{incident.address}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">People Affected</h3>
                    <p className="text-gray-900">{incident.peopleAffected || 'Unknown'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Medical Attention Needed</h3>
                    <p className="text-gray-900">{incident.medicalAttentionNeeded ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Reported By</h3>
                    <p className="text-gray-900">{incident.reportedByName || 'Anonymous'}</p>
                  </div>
                </div>
                
                {incident.images && incident.images.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Images</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {incident.images.map((image, index) => (
                        <a 
                          key={index} 
                          href={image} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block h-40 overflow-hidden rounded-lg"
                        >
                          <img 
                            src={image} 
                            alt={`Incident ${index + 1}`} 
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="h-64">
                <InteractiveMap
                  center={[marker.lat, marker.lng]}
                  zoom={14}
                  markers={[marker]}
                  height="100%"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Actions</h2>
                <div className="space-y-3">
                  <Link
                    to={`/resources/request?incidentId=${id}`}
                    className="block w-full bg-green-600 text-white text-center px-4 py-2 rounded-md font-medium hover:bg-green-700"
                  >
                    Request Resources
                  </Link>
                  {currentUser?.role === 'volunteer' && (
                    <Link
                      to={`/volunteer/respond?incidentId=${id}`}
                      className="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-md font-medium hover:bg-blue-700"
                    >
                      Volunteer to Help
                    </Link>
                  )}
                  <button
                    className="block w-full bg-gray-200 text-gray-700 text-center px-4 py-2 rounded-md font-medium hover:bg-gray-300"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IncidentDetail;