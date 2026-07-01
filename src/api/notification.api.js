import axios from './axios';

export const notificationApi = {
  getNotifications: (params) => axios.get('/notifications', { params }),
  markAsRead: (id) => axios.patch(`/notifications/${id}/read`),
  markAllAsRead: () => axios.patch('/notifications/read'),
  deleteNotification: (id) => axios.delete(`/notifications/${id}`),
};
