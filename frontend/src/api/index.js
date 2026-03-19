import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vridhi_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem('vridhi_refresh');
      if (refresh) {
        try {
          const { data } = await axios.post('/api/auth/token/refresh/', { refresh });
          localStorage.setItem('vridhi_token', data.access);
          original.headers.Authorization = `Bearer ${data.access}`;
          return api(original);
        } catch {
          localStorage.clear();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(err);
  }
);

// Auth
export const authAPI = {
  login: (data) => api.post('/auth/login/', data),
  signup: (data) => api.post('/auth/signup/', data),
  uploadDocs: (formData) => api.post('/auth/mentor/upload-docs/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data) => api.patch('/auth/profile/', data),
};

// Mentors
export const mentorAPI = {
  list: (params) => api.get('/mentors/', { params }),
  getById: (id) => api.get(`/mentors/${id}/`),
  getStats: () => api.get('/mentors/stats/'),
  getBatches: () => api.get('/mentors/batches/'),
  getRecommendedMentors: () => api.get('/mentors/recommendations/'),
};

// Batches
export const batchAPI = {
  list: (params) => api.get('/batches/', { params }),
  getById: (id) => api.get(`/batches/${id}/`),
  create: (data) => api.post('/batches/', data),
  update: (id, data) => api.patch(`/batches/${id}/`, data),
  delete: (id) => api.delete(`/batches/${id}/`),
  enroll: (id) => api.post(`/batches/${id}/enroll/`),
  uploadContent: (id, formData) => api.post(`/batches/${id}/content/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

// Progress
export const progressAPI = {
  getMyEnrollments: () => api.get('/enrollments/'),
  updateProgress: (contentId, data) => api.patch(`/progress/${contentId}/`, data),
};

// Wellness
export const wellnessAPI = {
  logMood: (data) => api.post('/wellness/mood/', data),
  getMoodHistory: () => api.get('/wellness/mood/history/'),
  bookSession: (data) => api.post('/wellness/sessions/', data),
};

// Admin
export const adminAPI = {
  getPendingMentors: () => api.get('/admin/mentors/pending/'),
  approveMentor: (id) => api.post(`/admin/mentors/${id}/approve/`),
  rejectMentor: (id, reason) => api.post(`/admin/mentors/${id}/reject/`, { reason }),
  getStats: () => api.get('/admin/stats/'),
};

// Payments
export const paymentAPI = {
  createOrder: (batchId) => api.post('/payments/create-order/', { batch_id: batchId }),
  verifyPayment: (data) => api.post('/payments/verify/', data),
};

// Legacy Projects
export const legacyAPI = {
  list: (params) => api.get('/legacy/', { params }),
  getById: (id) => api.get(`/legacy/${id}/`),
  create: (data) => api.post('/legacy/', data),
  submit: (id, data) => api.post(`/legacy/${id}/submit/`, data),
};

export default api;
