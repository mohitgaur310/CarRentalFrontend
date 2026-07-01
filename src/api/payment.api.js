import axios from './axios';

export const paymentApi = {
  createOrder: (data) => axios.post('/payments/create-order', data),
  verifyPayment: (data) => axios.post('/payments/verify', data),
  getPaymentById: (id) => axios.get(`/payments/${id}`),
  getPayments: (params) => axios.get('/payments', { params }),
};
