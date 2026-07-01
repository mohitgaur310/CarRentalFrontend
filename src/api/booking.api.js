import axios from './axios';

export const bookingApi = {
  createBooking: (data) => axios.post('/bookings', data),
  getMyBookings: (params) => axios.get('/bookings/my', { params }),
  getHostBookings: (params) => axios.get('/bookings/host', { params }),
  getHostCarBookings: (carId, params) => axios.get(`/bookings/host/cars/${carId}`, { params }),
  getBookingById: (id) => axios.get(`/bookings/${id}`),
  updateBookingStatus: (id, data) => axios.patch(`/bookings/${id}/status`, data),
};
