import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Define navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      { name: 'Dashboard', path: '/dashboard', icon: 'grid' },
      { name: 'Incidents', path: '/incidents', icon: 'alert-circle' },
      { name: 'Resources', path: '/resources', icon: 'package' },
    ];

    if (!currentUser) return baseItems;

    switch (currentUser.role) {
      case 'admin':
        return [
          ...baseItems,
          { name: 'Users', path: '/admin/users', icon: 'users' },
          { name: 'Analytics', path: '/admin/analytics', icon: 'bar-chart' },
          { name: 'Settings', path: '/admin/settings', icon: 'settings' },
        ];
      case 'ngo':
        return [
          ...baseItems,
          { name: 'Add Resources', path: '/resources/add', icon: 'plus-circle' },
          { name: 'Manage Requests', path: '/resources/requests', icon: 'list' },
          { name: 'Impact', path: '/ngo/impact', icon: 'activity' },
        ];
      case 'volunteer':
        return [
          ...baseItems,
          { name: 'Nearby Incidents', path: '/incidents/nearby', icon: 'map-pin' },
          { name: 'My Responses', path: '/volunteer/responses', icon: 'check-circle' },
        ];
      default:
        return [
          ...baseItems,
          { name: 'My Reports', path: '/user/reports', icon: 'file-text' },
          { name: 'My Requests', path: '/user/requests', icon: 'inbox' },
        ];
    }
  };

  const navItems = getNavItems();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside
      className={`bg-gray-800 text-white ${
        collapsed ? 'w-16' : 'w-64'
      } min-h-screen transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <h2 className="text-xl font-bold">DisasterRelief</h2>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-gray-700"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex-1 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${
                isActive(item.path)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } flex items-center px-4 py-3 transition-colors duration-200`}
            >
              <span className="inline-flex items-center justify-center h-6 w-6">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </span>
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {currentUser && !collapsed && (
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-medium">
                {currentUser.name ? currentUser.name.charAt(0) : 'U'}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{currentUser.name || 'User'}</p>
              <p className="text-xs text-gray-300">{currentUser.role}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;