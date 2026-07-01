import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiTruck, FiCalendar, FiCreditCard, FiStar, FiSettings } from 'react-icons/fi';
import { classNames } from '../../utils';

const sidebarLinks = [
  { label: 'Overview', href: '/dashboard', icon: FiHome },
  { label: 'My Cars', href: '/dashboard/my-cars', icon: FiTruck },
  { label: 'Bookings', href: '/dashboard/bookings', icon: FiCalendar },
  { label: 'Payments', href: '/dashboard/payments', icon: FiCreditCard },
  { label: 'Reviews', href: '/dashboard/reviews', icon: FiStar },
  { label: 'Settings', href: '/dashboard/settings', icon: FiSettings },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-[calc(100vh-4rem)] p-4 hidden lg:block">
      <nav className="space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={classNames(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
