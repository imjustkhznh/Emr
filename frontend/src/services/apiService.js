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

// Examinations API
export const examinationAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/examinations`, getAuthHeader()),
  getById: (id) => axios.get(`${API_BASE_URL}/examinations/${id}`, getAuthHeader()),
  create: (data) => axios.post(`${API_BASE_URL}/examinations`, data, getAuthHeader()),
  update: (id, data) => axios.put(`${API_BASE_URL}/examinations/${id}`, data, getAuthHeader()),
  delete: (id) => axios.delete(`${API_BASE_URL}/examinations/${id}`, getAuthHeader()),
};

// Appointments API
export const appointmentAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/appointments`, getAuthHeader()),
  create: (data) => axios.post(`${API_BASE_URL}/appointments`, data, getAuthHeader()),
  update: (id, data) => axios.put(`${API_BASE_URL}/appointments/${id}`, data, getAuthHeader()),
  delete: (id) => axios.delete(`${API_BASE_URL}/appointments/${id}`, getAuthHeader()),
};

// Medical Records API
export const medicalAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/medical/records`, getAuthHeader()),
  getById: (id) => axios.get(`${API_BASE_URL}/medical/records/${id}`, getAuthHeader()),
  create: (data) => axios.post(`${API_BASE_URL}/medical/records`, data, getAuthHeader()),
  update: (id, data) => axios.put(`${API_BASE_URL}/medical/records/${id}`, data, getAuthHeader()),
  delete: (id) => axios.delete(`${API_BASE_URL}/medical/records/${id}`, getAuthHeader()),
};

// Users API
export const userAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/user`, getAuthHeader()),
  getById: (id) => axios.get(`${API_BASE_URL}/user/${id}`, getAuthHeader()),
  update: (id, data) => axios.put(`${API_BASE_URL}/user/${id}`, data, getAuthHeader()),
};

export default {
  appointmentAPI,
  medicalAPI,
  userAPI,
  examinationAPI,
};
