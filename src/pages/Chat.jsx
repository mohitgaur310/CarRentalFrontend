import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import Breadcrumb from '../components/Common/Breadcrumb';
import { mockConversations, mockMessages } from '../services/mockData';
import { formatRelativeTime } from '../utils';
import { classNames } from '../utils';

const Chat = () => {
  const [activeChat, setActiveChat] = useState(mockConversations[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, {
      id: String(messages.length + 1),
      senderId: 'user',
      content: newMessage,
      createdAt: new Date().toISOString(),
      read: false,
    }]);
    setNewMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Messages' }]} />

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex h-[600px]">
        <div className="w-80 border-r border-gray-100 overflow-y-auto hidden md:block">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900">Messages</h2>
          </div>
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveChat(conv)}
              className={classNames(
                'w-full p-4 flex items-center gap-3 hover:bg-gray-50 text-left border-b border-gray-50',
                activeChat?.id === conv.id && 'bg-primary-50'
              )}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold text-sm">
                  {conv.participant.name[0]}
                </div>
                {conv.participant.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm text-gray-900 truncate">{conv.participant.name}</p>
                  <span className="text-xs text-gray-400">{formatRelativeTime(conv.lastMessageAt)}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
              </div>
              {conv.unreadCount > 0 && (
                <span className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                  {conv.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              <div className="p-4 border-b flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold text-sm">
                  {activeChat.participant.name[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activeChat.participant.name}</p>
                  <p className="text-xs text-gray-500">{activeChat.participant.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={classNames('flex', msg.senderId === 'user' ? 'justify-end' : 'justify-start')}>
                    <div className={classNames(
                      'max-w-xs px-4 py-2 rounded-2xl text-sm',
                      msg.senderId === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-900'
                    )}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} className="p-4 border-t flex gap-3">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button type="submit" className="p-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  <FiSend size={18} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
