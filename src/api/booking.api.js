import axios from './axios';

export const bookingApi = {
  createBooking: (data) => axios.post('/bookings', data),
  getBookings: (params) => axios.get('/bookings', { params }),
  getBookingById: (id) => axios.get(`/bookings/${id}`),
  updateBooking: (id, data) => axios.patch(`/bookings/${id}`, data),
  cancelBooking: (id) => axios.delete(`/bookings/${id}`),
};
