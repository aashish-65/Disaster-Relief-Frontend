import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, Map, LifeBuoy, Home, User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-primary-600 hidden sm:block">DisasterRelief</span>
            </Link>
            <div className="hidden md:flex md:ml-10 md:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'border-primary-500 text-primary-700' 
                    : 'border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-700'
                }`}
              >
                <Home className="h-4 w-4 mr-1" />
                <span>Home</span>
              </Link>
              <Link
                to="/incidents"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  isActive('/incidents') 
                    ? 'border-primary-500 text-primary-700' 
                    : 'border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-700'
                }`}
              >
                <Map className="h-4 w-4 mr-1" />
                <span>Incidents</span>
              </Link>
              <Link
                to="/resources"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  isActive('/resources') 
                    ? 'border-primary-500 text-primary-700' 
                    : 'border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-700'
                }`}
              >
                <LifeBuoy className="h-4 w-4 mr-1" />
                <span>Resources</span>
              </Link>
            </div>
          </div>

          {/* User authentication section */}
          <div className="hidden md:flex md:items-center md:ml-6">
            {currentUser ? (
              <div className="flex items-center space-x-1">
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive('/dashboard') 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-500 hover:bg-primary-50 hover:text-primary-700'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive('/profile') 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-500 hover:bg-primary-50 hover:text-primary-700'
                  }`}
                >
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center ml-2 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-black hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
          <Link
            to="/"
            className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') 
                ? 'bg-primary-50 text-primary-700' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'
            }`}
          >
            <Home className="h-5 w-5 mr-2" />
            Home
          </Link>
          <Link
            to="/incidents"
            className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
              isActive('/incidents') 
                ? 'bg-primary-50 text-primary-700' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'
            }`}
          >
            <Map className="h-5 w-5 mr-2" />
            Incidents
          </Link>
          <Link
            to="/resources"
            className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
              isActive('/resources') 
                ? 'bg-primary-50 text-primary-700' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'
            }`}
          >
            <LifeBuoy className="h-5 w-5 mr-2" />
            Resources
          </Link>
          
          <div className="pt-4 mt-2 border-t border-gray-200">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/dashboard') 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/profile') 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'
                  }`}
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center w-full text-left px-3 py-2 mt-1 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link
                  to="/login"
                  className="flex justify-center items-center px-4 py-2 rounded-md text-base font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex justify-center items-center px-4 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;