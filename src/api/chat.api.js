import axios from './axios';

export const chatApi = {
  getConversations: () => axios.get('/conversations'),
  getMessages: (conversationId) => axios.get(`/messages/${conversationId}`),
  sendMessage: (conversationId, data) =>
    axios.post(`/messages/${conversationId}`, data),
  createConversation: (data) => axios.post('/conversations', data),
};
