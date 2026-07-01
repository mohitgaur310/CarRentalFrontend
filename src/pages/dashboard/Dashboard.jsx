import { Link } from 'react-router-dom';
import { FiTruck, FiCalendar, FiCreditCard, FiStar } from 'react-icons/fi';
import Button from '../../components/Buttons/Button';
import BookingCard from '../../components/Cards/BookingCard';
import { mockCars } from '../../services/mockData';
import { formatCurrency } from '../../utils';

const stats = [
  { label: 'My Cars', value: '3', icon: FiTruck, color: 'bg-blue-100 text-blue-600' },
  { label: 'Active Bookings', value: '2', icon: FiCalendar, color: 'bg-green-100 text-green-600' },
  { label: 'Total Earnings', value: formatCurrency(125000), icon: FiCreditCard, color: 'bg-purple-100 text-purple-600' },
  { label: 'Avg Rating', value: '4.8', icon: FiStar, color: 'bg-yellow-100 text-yellow-600' },
];

const recentBookings = [
  { id: '1', car: mockCars[0], startDate: '2026-07-01', endDate: '2026-07-05', status: 'confirmed', totalAmount: 22500 },
];

const Dashboard = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here&apos;s your overview.</p>
        </div>
        <Link to="/dashboard/add-car"><Button>Add New Car</Button></Link>
      </div>

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

      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h2>
      <div className="space-y-4">
        {recentBookings.map((b) => <BookingCard key={b.id} booking={b} />)}
      </div>
    </div>
  );
};

export default Dashboard;
