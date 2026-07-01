import { Link } from 'react-router-dom';
import { FiUsers, FiTruck, FiCalendar, FiCreditCard, FiTrendingUp } from 'react-icons/fi';
import { mockAdminStats } from '../../services/mockData';
import { formatCurrency } from '../../utils';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: mockAdminStats.totalUsers, icon: FiUsers, color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Cars', value: mockAdminStats.totalCars, icon: FiTruck, color: 'bg-green-100 text-green-600' },
    { label: 'Total Bookings', value: mockAdminStats.totalBookings, icon: FiCalendar, color: 'bg-purple-100 text-purple-600' },
    { label: 'Total Revenue', value: formatCurrency(mockAdminStats.totalRevenue), icon: FiCreditCard, color: 'bg-yellow-100 text-yellow-600' },
  ];

  const adminLinks = [
    { label: 'Users', href: '/admin/users', desc: 'Manage user accounts' },
    { label: 'Cars', href: '/admin/cars', desc: 'Manage car listings' },
    { label: 'Bookings', href: '/admin/bookings', desc: 'View all bookings' },
    { label: 'Payments', href: '/admin/payments', desc: 'Payment transactions' },
    { label: 'Reports', href: '/admin/reports', desc: 'Analytics & reports' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${stat.color}`}><stat.icon size={20} /></div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminLinks.map((link) => (
          <Link key={link.href} to={link.href} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <FiTrendingUp className="text-primary-600" size={20} />
              <div>
                <h3 className="font-semibold text-gray-900">{link.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{link.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
