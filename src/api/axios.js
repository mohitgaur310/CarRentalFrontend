import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    const envelope = response.data;
    if (envelope && typeof envelope.success === 'boolean') {
      if (!envelope.success) {
        const err = new Error(envelope.message || 'Request failed');
        err.response = response;
        err.errors = envelope.errors;
        return Promise.reject(err);
      }
      response.data = envelope.data;
      response.apiMessage = envelope.message;
      response.pagination = envelope.pagination ?? null;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (refreshToken) {
          const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });
          const payload = data?.data ?? data;
          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, payload.accessToken);
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, payload.refreshToken);
          if (payload.user) {
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(payload.user));
          }
          originalRequest.headers.Authorization = `Bearer ${payload.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        window.location.href = '/login';
      }
    }

    const envelope = error.response?.data;
    if (envelope?.message) {
      error.message = envelope.message;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
