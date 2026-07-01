import BookingCard from '../../components/Cards/BookingCard';
import { mockCars } from '../../services/mockData';

const DashboardBookings = () => {
  const bookings = [
    { id: '1', car: mockCars[0], startDate: '2026-07-01', endDate: '2026-07-05', status: 'confirmed', totalAmount: 22500 },
    { id: '2', car: mockCars[1], startDate: '2026-06-20', endDate: '2026-06-22', status: 'active', totalAmount: 10000 },
    { id: '3', car: mockCars[2], startDate: '2026-06-01', endDate: '2026-06-04', status: 'completed', totalAmount: 10500 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Bookings</h1>
      <div className="space-y-4">
        {bookings.map((b) => <BookingCard key={b.id} booking={b} />)}
      </div>
    </div>
  );
};

export default DashboardBookings;
