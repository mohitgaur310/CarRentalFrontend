import { FiBell } from 'react-icons/fi';
import Breadcrumb from '../components/Common/Breadcrumb';
import Badge from '../components/Common/Badge';
import { mockNotifications } from '../services/mockData';
import { formatRelativeTime } from '../utils';

const Notifications = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Notifications' }]} />
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Notifications</h1>

      <div className="space-y-3">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-xl border p-4 flex gap-4 ${!notification.read ? 'border-primary-200 bg-primary-50/30' : 'border-gray-100'}`}
          >
            <div className="p-2 bg-primary-100 rounded-lg h-fit">
              <FiBell className="text-primary-600" size={18} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900 text-sm">{notification.title}</h3>
                {!notification.read && <Badge variant="primary" size="sm">New</Badge>}
              </div>
              <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
              <p className="text-xs text-gray-400 mt-2">{formatRelativeTime(notification.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
