import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  AlertCircle, Calendar, Users, Map, FileText, 
  Package, Activity, BarChart2, Truck, Heart
} from 'lucide-react';

const NgoDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalResources: 0,
    pendingRequests: 0,
    peopleHelped: 0,
    activeDeployments: 0
  });
  const [resourceRequests, setResourceRequests] = useState([]);
  const [deployedResources, setDeployedResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data fetch - replace with actual API calls
    const fetchDashboardData = async () => {
      try {
        // In a real implementation, you would fetch this data from your API
        // const response = await ngoService.getDashboardStats(currentUser.id);
        
        // Simulated data for development
        setTimeout(() => {
          setStats({
            totalResources: 1250,
            pendingRequests: 8,
            peopleHelped: 450,
            activeDeployments: 5
          });
          
          setResourceRequests([
            {
              id: '1',
              resourceType: 'Water',
              quantity: 500,
              requestedBy: 'Riverside Community Center',
              status: 'pending',
              urgency: 'high',
              createdAt: '2023-04-20T15:32:00Z',
              location: 'Riverside Area'
            },
            {
              id: '2',
              resourceType: 'Medical Supplies',
              quantity: 200,
              requestedBy: 'Field Hospital Unit 3',
              status: 'pending',
              urgency: 'critical',
              createdAt: '2023-04-21T09:15:00Z',
              location: 'Downtown Medical Camp'
            },
            {
              id: '3',
              resourceType: 'Food Packages',
              quantity: 350,
              requestedBy: 'Evacuation Center',
              status: 'pending',
              urgency: 'medium',
              createdAt: '2023-04-19T11:45:00Z',
              location: 'School Gymnasium'
            }
          ]);
          
          setDeployedResources([
            {
              id: '1',
              resourceType: 'Shelter Kits',
              quantity: 50,
              deployedTo: 'Northern District',
              deployedAt: '2023-04-18T10:30:00Z',
              status: 'in-transit'
            },
            {
              id: '2',
              resourceType: 'Water Purifiers',
              quantity: 20,
              deployedTo: 'Eastern Villages',
              deployedAt: '2023-04-17T14:45:00Z',
              status: 'delivered'
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

  // Helper function to get urgency color
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
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
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {currentUser?.name || 'NGO Dashboard'}
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your resources and coordinate relief efforts
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Resources</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalResources}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">People Helped</p>
              <p className="text-2xl font-bold text-gray-900">{stats.peopleHelped}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <Truck className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Deployments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeDeployments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Requests Section */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Pending Resource Requests</h2>
            <Link
              to="/resources/requests"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : resourceRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resource
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requested By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Urgency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resourceRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{request.resourceType}</div>
                        <div className="text-sm text-gray-500">{request.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{request.requestedBy}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{request.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(request.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/resources/requests/${request.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View
                        </Link>
                        <button className="text-green-600 hover:text-green-900 mr-4">
                          Approve
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No pending resource requests at this time.
            </div>
          )}
        </div>
      </div>

      {/* Deployed Resources Section */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recently Deployed Resources</h2>
            <Link
              to="/resources/deployments"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : deployedResources.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resource
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deployed To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deployedResources.map((resource) => (
                    <tr key={resource.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{resource.resourceType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{resource.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{resource.deployedTo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(resource.status)}`}>
                          {resource.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(resource.deployedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/resources/deployments/${resource.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Track
                        </Link>
                        <button className="text-green-600 hover:text-green-900">
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No deployed resources at this time.
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/resources/add"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
        >
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Add Resources</h3>
            <p className="text-sm text-gray-500">Register new resources for deployment</p>
          </div>
        </Link>
        
        <Link
          to="/resources/requests"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
        >
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Manage Requests</h3>
            <p className="text-sm text-gray-500">Review and respond to resource requests</p>
          </div>
        </Link>
        
        <Link
          to="/ngo/impact"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
        >
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <BarChart2 className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">View Impact</h3>
            <p className="text-sm text-gray-500">See the impact of your relief efforts</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NgoDashboard;