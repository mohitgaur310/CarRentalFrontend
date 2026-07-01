import axios from './axios';

export const authApi = {
  register: (data) => axios.post('/auth/register', data),
  login: (data) => axios.post('/auth/login', data),
  sendOtp: (data) => axios.post('/auth/send-otp', data),
  verifyOtp: (data) => axios.post('/auth/verify-otp', data),
  forgotPassword: (data) => axios.post('/auth/forgot-password', data),
  resetPassword: (data) => axios.post('/auth/reset-password', data),
  logout: (refreshToken) => axios.post('/auth/logout', { refreshToken }),
  refreshToken: (refreshToken) => axios.post('/auth/refresh', { refreshToken }),
};
