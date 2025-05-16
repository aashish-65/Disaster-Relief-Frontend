import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  AlertCircle, Calendar, Users, Map, FileText, 
  AlertTriangle, BarChart2, Package, Activity
} from 'lucide-react';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    reportedIncidents: 0,
    resourceRequests: 0,
    nearbyIncidents: 0,
    pendingAssistance: 0
  });
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [nearbyResources, setNearbyResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data fetch - replace with actual API calls
    const fetchDashboardData = async () => {
      try {
        // In a real implementation, you would fetch this data from your API
        // const response = await userService.getDashboardStats(currentUser.id);
        // setStats(response.data.stats);
        // setRecentIncidents(response.data.recentIncidents);
        
        // Simulated data for development
        setTimeout(() => {
          setStats({
            reportedIncidents: 5,
            resourceRequests: 3,
            nearbyIncidents: 8,
            pendingAssistance: 2
          });
          
          setRecentIncidents([
            {
              id: '1',
              title: 'Flooding in Downtown Area',
              type: 'flood',
              severity: 'high',
              status: 'active',
              createdAt: '2023-04-20T15:32:00Z',
              location: 'Main St & 5th Ave',
            },
            {
              id: '2',
              title: 'Power Outage After Storm',
              type: 'infrastructure',
              severity: 'medium',
              status: 'monitoring',
              createdAt: '2023-04-21T09:15:00Z',
              location: 'Westside District',
            },
            {
              id: '3',
              title: 'Building Damage from Earthquake',
              type: 'earthquake',
              severity: 'critical',
              status: 'active',
              createdAt: '2023-04-19T11:45:00Z',
              location: 'Downtown, 3rd Avenue',
            }
          ]);
          
          setNearbyResources([
            {
              id: '1',
              name: 'Emergency Water Supply',
              type: 'water',
              quantity: 500,
              location: 'Central Community Center',
              distance: '1.2 km'
            },
            {
              id: '2',
              name: 'Medical Supplies',
              type: 'medical',
              quantity: 200,
              location: 'St. Mary Hospital',
              distance: '2.5 km'
            }
          ]);
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to get severity color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'monitoring':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get resource type icon
  const getResourceTypeIcon = (type) => {
    switch (type) {
      case 'water':
        return <span className="text-blue-500">💧</span>;
      case 'food':
        return <span className="text-green-500">🍲</span>;
      case 'medical':
        return <span className="text-red-500">🩺</span>;
      case 'shelter':
        return <span className="text-orange-500">🏠</span>;
      default:
        return <span className="text-gray-500">📦</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {currentUser?.name || 'User'}
        </h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of your activity and nearby incidents
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Reported Incidents</p>
              <p className="text-2xl font-bold text-gray-900">{stats.reportedIncidents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Resource Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.resourceRequests}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <Map className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Nearby Incidents</p>
              <p className="text-2xl font-bold text-gray-900">{stats.nearbyIncidents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center">
            <div className="rounded-full bg-orange-100 p-3 mr-4">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Assistance</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingAssistance}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/incidents/report" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="rounded-full bg-blue-100 p-3 mb-2">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Report Incident</span>
          </Link>
          
          <Link to="/resources/request" className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="rounded-full bg-green-100 p-3 mb-2">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Request Resources</span>
          </Link>
          
          <Link to="/incidents/nearby" className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="rounded-full bg-purple-100 p-3 mb-2">
              <Map className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">View Nearby</span>
          </Link>
          
          <Link to="/user/reports" className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <div className="rounded-full bg-orange-100 p-3 mb-2">
              <Activity className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">My Reports</span>
          </Link>
        </div>
      </div>

      {/* Recent incidents */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Incidents</h2>
          <Link to="/incidents" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : recentIncidents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Incident
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            <Link to={`/incidents/${incident.id}`} className="hover:text-blue-600">
                              {incident.title}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-500">{incident.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{incident.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(incident.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No recent incidents found
          </div>
        )}
      </div>

      {/* Nearby resources */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Nearby Resources</h2>
          <Link to="/resources" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : nearbyResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyResources.map((resource) => (
              <div key={resource.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3 text-2xl">
                    {getResourceTypeIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{resource.name}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="truncate">{resource.location}</span>
                      <span className="ml-1 flex-shrink-0 font-medium text-gray-400">
                        • {resource.distance}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">
                        Quantity: {resource.quantity}
                      </span>
                      <Link 
                        to={`/resources/request?resourceId=${resource.id}`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Request
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No nearby resources found
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;