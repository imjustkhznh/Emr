import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

// Create axios instance với interceptor
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - thêm token vào mỗi request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - xử lý token hết hạn
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.response?.data?.code === 'TOKEN_EXPIRED') {
      // Token hết hạn - redirect đến login
      console.warn('⚠️ Token expired, redirecting to login');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Examinations API
export const examinationAPI = {
  getAll: () => apiClient.get('/examinations'),
  getById: (id) => apiClient.get(`/examinations/${id}`),
  create: (data) => apiClient.post('/examinations', data),
  update: (id, data) => apiClient.put(`/examinations/${id}`, data),
  delete: (id) => apiClient.delete(`/examinations/${id}`),
};

// Appointments API
export const appointmentAPI = {
  getAll: () => apiClient.get('/appointments'),
  create: (data) => apiClient.post('/appointments', data),
  update: (id, data) => apiClient.put(`/appointments/${id}`, data),
  delete: (id) => apiClient.delete(`/appointments/${id}`),
};

// Medical Records API
export const medicalAPI = {
  getAll: () => apiClient.get('/medical/records'),
  getById: (id) => apiClient.get(`/medical/records/${id}`),
  create: (data) => apiClient.post('/medical/records', data),
  update: (id, data) => apiClient.put(`/medical/records/${id}`, data),
  delete: (id) => apiClient.delete(`/medical/records/${id}`),
};

// Users API
export const userAPI = {
  getAll: () => apiClient.get('/user'),
  getById: (id) => apiClient.get(`/user/${id}`),
  update: (id, data) => apiClient.put(`/user/${id}`, data),
};

export default {
  appointmentAPI,
  medicalAPI,
  userAPI,
  examinationAPI,
};
