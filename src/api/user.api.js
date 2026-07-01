import axios from './axios';

export const userApi = {
  getMe: () => axios.get('/users/me'),
  updateMe: (data) => axios.put('/users/me', data),
  uploadProfile: (formData) =>
    axios.post('/upload/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  uploadDocument: (formData) =>
    axios.post('/upload/document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
