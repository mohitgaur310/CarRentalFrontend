import { Link } from 'react-router-dom';
import BookingCard from '../components/Cards/BookingCard';
import Breadcrumb from '../components/Common/Breadcrumb';
import Button from '../components/Buttons/Button';
import { mockCars } from '../services/mockData';

const mockBookings = [
  {
    id: '1',
    car: mockCars[0],
    startDate: '2026-07-01',
    endDate: '2026-07-05',
    status: 'confirmed',
    totalAmount: 22500,
  },
  {
    id: '2',
    car: mockCars[2],
    startDate: '2026-06-15',
    endDate: '2026-06-18',
    status: 'completed',
    totalAmount: 10500,
  },
];

const MyBookings = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'My Bookings' }]} />
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {mockBookings.length > 0 ? (
        <div className="space-y-4">
          {mockBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No bookings yet</p>
          <Link to="/search"><Button className="mt-4">Browse Cars</Button></Link>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
