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
      window.location.href = '/login';
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
    return api.post('/api/predictions/', { measurements });
  },
  
  getPredictionHistory: async () => {
    return api.get('/api/predictions/history');
  },
};

// Training data endpoints
export const trainingService = {
  getTrainingData: async (skip = 0, limit = 20, verified = null) => {
    let url = `/api/admin/training-data/?skip=${skip}&limit=${limit}`;
    if (verified !== null) {
      url += `&verified_only=${verified}`;
    }
    return api.get(url);
  },
  
  addTrainingData: async (data) => {
    return api.post('/api/admin/training-data/manual', data);
  },
};

// Admin endpoints
export const adminService = {
  getAllUsers: async () => {
    return api.get('/api/users');
  },
  
  createUser: async (userData) => {
    return api.post('/api/users', userData);
  },
  
  updateUser: async (userId, userData) => {
    return api.put(`/api/users/${userId}`, userData);
  },
  
  deleteUser: async (userId) => {
    return api.delete(`/api/users/${userId}`);
  },
  
  getTrainingData: async (skip = 0, limit = 100, verified = null) => {
    let url = `/api/admin/training-data?skip=${skip}&limit=${limit}`;
    if (verified !== null) {
      url += `&verified=${verified}`;
    }
    return api.get(url);
  },
  
  verifyTrainingData: async (dataId, verified) => {
    return api.post(`/api/admin/training-data/${dataId}/verify`, { verified });
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
};

export default api;
