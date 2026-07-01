import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket = null;

export const initSocket = (token) => {
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket'],
    autoConnect: true,
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const joinConversation = (conversationId) => {
  socket?.emit('join_conversation', conversationId);
};

export const leaveConversation = (conversationId) => {
  socket?.emit('leave_conversation', conversationId);
};

export const sendMessage = (data) => {
  socket?.emit('message', data);
};

export const emitTyping = (roomId) => {
  socket?.emit('typing', { roomId });
};

export const emitStopTyping = (roomId) => {
  socket?.emit('stop-typing', { roomId });
};

export const markMessageRead = (messageId) => {
  socket?.emit('read-message', { messageId });
};
