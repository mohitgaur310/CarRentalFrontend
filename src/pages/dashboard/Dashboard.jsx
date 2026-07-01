import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiTruck, FiCalendar } from 'react-icons/fi';
import Button from '../../components/Buttons/Button';
import BookingCard from '../../components/Cards/BookingCard';
import { fetchMyCars } from '../../redux/slices/carsSlice';
import { fetchHostBookings } from '../../redux/slices/bookingsSlice';
import { BOOKING_STATUS } from '../../constants';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { myCars } = useSelector((state) => state.cars);
  const { hostBookings } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchMyCars({ limit: 100 }));
    dispatch(fetchHostBookings({ limit: 5 }));
  }, [dispatch]);

  const activeBookings = hostBookings.filter((b) =>
    [BOOKING_STATUS.PENDING, BOOKING_STATUS.ACCEPTED, BOOKING_STATUS.ONGOING].includes(b.status)
  );

  const stats = [
    { label: 'My Cars', value: String(myCars.length), icon: FiTruck, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Bookings', value: String(activeBookings.length), icon: FiCalendar, color: 'bg-green-100 text-green-600' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here&apos;s your overview.</p>
        </div>
        <Link to="/dashboard/add-car"><Button>Add New Car</Button></Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
      {hostBookings.length > 0 ? (
        <div className="space-y-4">
          {hostBookings.slice(0, 5).map((b) => <BookingCard key={b.id} booking={b} showRenter />)}
        </div>
      ) : (
        <p className="text-gray-500">No bookings yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
