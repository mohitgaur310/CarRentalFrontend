import axios from './axios';

export const carApi = {
  getCars: (params) => axios.get('/cars', { params }),
  getCategories: () => axios.get('/cars/categories'),
  getFeaturedCars: (limit = 6) =>
    axios.get('/cars', { params: { isFeatured: true, limit } }),
  getPopularCars: (limit = 4) =>
    axios.get('/cars', { params: { sort: 'rating_desc', limit } }),
  getCarById: (id) => axios.get(`/cars/${id}`),
  getCarReviews: (id) => axios.get(`/cars/${id}/reviews`),
  getCarCalendar: (id) => axios.get(`/cars/${id}/calendar`),
  getSimilarCars: (id, category, limit = 3) =>
    axios.get('/cars', { params: { category, limit: limit + 1 } }),
  getMyCars: (params) => axios.get('/cars/my', { params }),
  getMyCarById: (id) => axios.get(`/cars/my/${id}`),
  createCar: (data) => axios.post('/cars', data),
  updateCar: (id, data) => axios.put(`/cars/${id}`, data),
  deleteCar: (id) => axios.delete(`/cars/${id}`),
};
