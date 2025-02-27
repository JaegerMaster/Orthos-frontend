import axios from 'axios';

// Set the backend API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://135.181.111.246:8000';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Authentication endpoints
export const authService = {
  login: async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    // Use the correct token endpoint from the OpenAPI spec
    const response = await axios.post(`${API_URL}/token`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  getCurrentUser: async () => {
    return api.get('/api/users/me');
  },
};

// Prediction endpoints
export const predictionService = {
  makePrediction: async (measurements) => {
    // Corrected according to OpenAPI spec
    return api.post('/api/predictions/', { measurements });
  },
  
  getPredictionHistory: async () => {
    return api.get('/api/predictions/history');
  },
};

// Training data endpoints
export const trainingService = {
  getTrainingData: async (skip = 0, limit = 20, verified = null) => {
    // Fixed path to match the actual endpoint
    let url = `/api/training-data/?skip=${skip}&limit=${limit}`;
    if (verified !== null) {
      url += `&verified_only=${verified}`;
    }
    return api.get(url);
  },
  
  addTrainingData: async (data) => {
    return api.post('/api/training-data/manual', data);
  },
};

// Admin endpoints
export const adminService = {
  getAllUsers: async () => {
    // Updated according to OpenAPI spec
    return api.get('/api/users/');
  },
  
  createUser: async (userData) => {
    return api.post('/api/users/register', userData);
  },
  
  updateUser: async (userId, userData) => {
    // We should set active/admin status separately according to OpenAPI spec
    if ('is_admin' in userData) {
      await api.put(`/api/users/${userId}/admin?is_admin=${userData.is_admin}`);
    }
    if ('is_active' in userData) {
      await api.put(`/api/users/${userId}/active?is_active=${userData.is_active}`);
    }
    
    // Remove admin/active status from user data as they're updated separately
    const userUpdateData = { ...userData };
    delete userUpdateData.is_admin;
    delete userUpdateData.is_active;
    
    return api.get(`/api/users/${userId}`);
  },
  
  deleteUser: async (userId) => {
    // Not included in OpenAPI spec - might need to deactivate instead
    return api.put(`/api/users/${userId}/active?is_active=false`);
  },
  
  getTrainingData: async (skip = 0, limit = 100, verified = null) => {
    let url = `/api/admin/training-data?skip=${skip}&limit=${limit}`;
    if (verified !== null) {
      url += `&verified=${verified}`;
    }
    return api.get(url);
  },
  
  verifyTrainingData: async (dataId, verified) => {
    return api.post(`/api/admin/training-data/${dataId}/verify?verified=${verified}`);
  },
  
  uploadExcelData: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post('/api/admin/upload-excel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  getModelVersions: async () => {
    return api.get('/api/admin/model-versions');
  },
  
  activateModelVersion: async (versionId) => {
    return api.post(`/api/admin/model-versions/${versionId}/activate`);
  },
  
  trainNewModel: async (description) => {
    return api.post(`/api/admin/train-model?description=${encodeURIComponent(description)}`);
  },
  
  // Add method for adding training data
  addManualTrainingData: async (inputData, actualOutcome) => {
    return api.post('/api/admin/training-data/manual', {
      input_data: inputData,
      actual_outcome: actualOutcome
    });
  }
};

// Add a separate user service for profile updates
export const userService = {
  updateProfile: async (userData) => {
    // Use the PUT method as specified in the OpenAPI spec
    return api.put('/api/users/me', userData);
  },
  
  changePassword: async (currentPassword, newPassword) => {
    return api.put('/api/users/me', {
      current_password: currentPassword,
      new_password: newPassword
    });
  }
};

export default api;
