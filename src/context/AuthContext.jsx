import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData, token) => {
    const user = { ...userData, token };
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Redirect based on user role
    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (user.role === 'ngo') {
      navigate('/ngo/dashboard');
    } else if (user.role === 'volunteer') {
      navigate('/volunteer/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    return currentUser?.role === role;
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    hasRole,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};