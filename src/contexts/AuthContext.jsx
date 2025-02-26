import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// API URL from environment or fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://135.181.111.246:8000';

// Create the context
const AuthContext = createContext(null);

// Create a custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token and load user on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch current user
  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      // In development, we might use mock data if the API is not available
      if (process.env.NODE_ENV === 'development' && !API_URL.includes('http')) {
        // Mock user for development
        setCurrentUser({
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          is_admin: false
        });
        setError(null);
      } else {
        // Real API call
        const response = await axios.get(`${API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCurrentUser(response.data);
        setError(null);
      }
    } catch (err) {
      console.error('Failed to fetch user:', err);
      setError('Failed to authenticate user');
      localStorage.removeItem('token');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (username, password) => {
    setLoading(true);
    try {
      // In development, we might use mock data if the API is not available
      if (process.env.NODE_ENV === 'development' && !API_URL.includes('http')) {
        // Mock login for development
        localStorage.setItem('token', 'mock_token');
        setCurrentUser({
          id: 1,
          username,
          email: `${username}@example.com`,
          is_admin: username === 'admin'
        });
        return { access_token: 'mock_token' };
      } else {
        // Real API call
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        
        const response = await axios.post(`${API_URL}/token`, formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
          await fetchCurrentUser();
        }
        
        return response.data;
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.detail || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  // Value to be provided to consumers of this context
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.is_admin || false,
    loading,
    error,
    login,
    logout,
    refresh: fetchCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
