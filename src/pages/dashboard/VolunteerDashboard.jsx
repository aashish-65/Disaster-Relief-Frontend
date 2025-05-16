import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  AlertCircle, Calendar, Users, Map, 
  FileText, AlertTriangle, BarChart2, 
  Package, Activity, CheckCircle 
} from 'lucide-react';

const VolunteerDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    activeResponses: 0,
    completedResponses: 0,
    nearbyIncidents: 0,
    hoursContributed: 0
  });
  const [nearbyIncidents, setNearbyIncidents] = useState([]);
  const [activeResponses, setActiveResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulated data for development
        setTimeout(() => {
          setStats({
            activeResponses: 2,
            completedResponses: 15,
            nearbyIncidents: 5,
            hoursContributed: 45
          });
          
          setNearbyIncidents([
            {
              id: '1',
              title: 'Flooding in Downtown Area',
              type: 'flood',
              severity: 'high',
              status: 'active',
              createdAt: '2023-04-20T15:32:00Z',
              location: 'Main St & 5th Ave',
              distance: '1.5 km'
            },
            {
              id: '2',
              title: 'Power Outage After Storm',
              type: 'infrastructure',
              severity: 'medium',
              status: 'monitoring',
              createdAt: '2023-04-21T09:15:00Z',
              location: 'Westside District',
              distance: '2.8 km'
            }
          ]);
          
          setActiveResponses([
            {
              id: '1',
              incidentTitle: 'Medical Emergency Response',
              role: 'Medical Assistant',
              startDate: '2023-04-19T08:00:00Z',
              location: 'Central Hospital',
              status: 'in-progress'
            },
            {
              id: '2',
              incidentTitle: 'Evacuation Assistance',
              role: 'Evacuation Coordinator',
              startDate: '2023-04-20T10:30:00Z',
              location: 'Riverside Community',
              status: 'assigned'
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'assigned':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {currentUser?.name || 'Volunteer'}
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your service to the community
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Responses</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeResponses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Responses</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedResponses}</p>
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
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Hours Contributed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.hoursContributed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Responses Section */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Active Responses</h2>
            <Link
              to="/volunteer/responses"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Incident
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activeResponses.map((response) => (
                  <tr key={response.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {response.incidentTitle}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(response.startDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {response.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {response.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(response.status)}`}>
                        {response.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Nearby Incidents Section */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Nearby Incidents</h2>
            <Link
              to="/incidents/nearby"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Map
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyIncidents.map((incident) => (
              <div key={incident.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{incident.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{incident.location}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(incident.severity)}`}>
                    {incident.severity}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{incident.distance} away</span>
                  <Link
                    to={`/incidents/${incident.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;