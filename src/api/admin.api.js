import axios from './axios';

export const adminApi = {
  getUsers: (params) => axios.get('/admin/users', { params }),
  getCars: (params) => axios.get('/admin/cars', { params }),
  getBookings: (params) => axios.get('/admin/bookings', { params }),
  getPayments: (params) => axios.get('/admin/payments', { params }),
  blockUser: (id) => axios.patch(`/admin/users/${id}/block`),
  getAnalytics: () => axios.get('/admin/analytics'),
  getReports: (params) => axios.get('/admin/reports', { params }),
};
