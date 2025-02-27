import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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

  // Fetch current user with better error handling
  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      // Real API call using the correct endpoint
      const response = await axios.get(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data) {
        setCurrentUser(response.data);
        setError(null);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Failed to fetch user:', err);
      
      // Handle different types of errors
      if (err.response) {
        if (err.response.status === 401) {
          // Unauthorized - token invalid or expired
          localStorage.removeItem('token');
          // Don't show toast here, it can be annoying on initial load
        } else {
          console.error('Server error:', err.response.status, err.response.data);
        }
      } else if (err.request) {
        // Request made but no response received
        console.error('No response received:', err.request);
      } else {
        // Error in setting up the request
        console.error('Error setting up request:', err.message);
      }
      
      // Clear user state
      setCurrentUser(null);
      setError('Authentication failed');
      
      // Remove token if it's invalid
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Login function with improved error handling
  const login = async (username, password) => {
    setLoading(true);
    try {
      // Clear any previous errors
      setError(null);
      
      // Real API call to the token endpoint
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
        return response.data;
      } else {
        throw new Error('No access token received');
      }
    } catch (err) {
      console.error('Login failed:', err);
      
      // Handle different error scenarios
      if (err.response) {
        // Server responded with an error
        if (err.response.status === 401) {
          setError('Invalid username or password');
          toast.error('Invalid username or password');
        } else if (err.response.status === 422) {
          setError('Validation error. Please check your inputs.');
          toast.error('Validation error. Please check your inputs.');
        } else {
          setError(err.response.data?.detail || 'Login failed');
          toast.error(err.response.data?.detail || 'Login failed');
        }
      } else if (err.request) {
        // Request made but no response received
        setError('Server not responding. Please try again later.');
        toast.error('Server not responding. Please try again later.');
      } else {
        // Error in setting up the request
        setError('Login failed: ' + err.message);
        toast.error('Login failed: ' + err.message);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setError(null);
    toast.info('You have been logged out');
  };

  // Refresh user data
  const refresh = async () => {
    await fetchCurrentUser();
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
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
