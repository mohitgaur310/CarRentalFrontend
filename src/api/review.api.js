import axios from './axios';

export const reviewApi = {
  createReview: (data) => axios.post('/reviews', data),
  updateReview: (id, data) => axios.put(`/reviews/${id}`, data),
  deleteReview: (id) => axios.delete(`/reviews/${id}`),
  getCarReviews: (carId) => axios.get(`/reviews/car/${carId}`),
  getMyReviews: () => axios.get('/reviews/my'),
};
