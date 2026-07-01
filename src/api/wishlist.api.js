import axios from './axios';

export const wishlistApi = {
  addToWishlist: (carId) => axios.post('/wishlist', { carId }),
  getWishlist: () => axios.get('/wishlist'),
  removeFromWishlist: (id) => axios.delete(`/wishlist/${id}`),
};
