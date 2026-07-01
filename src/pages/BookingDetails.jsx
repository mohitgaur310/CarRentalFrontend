import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Common/Breadcrumb';
import Badge from '../components/Common/Badge';
import Button from '../components/Buttons/Button';
import { mockCars } from '../services/mockData';
import { formatCurrency, formatDate } from '../utils';

const BookingDetails = () => {
  const { id } = useParams();
  const car = mockCars[0];
  const booking = {
    id,
    car,
    startDate: '2026-07-01',
    endDate: '2026-07-05',
    status: 'confirmed',
    totalAmount: 22500,
    pickupLocation: 'Connaught Place, New Delhi',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'My Bookings', href: '/my-bookings' }, { label: `Booking #${id}` }]} />

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">Booking #{id}</h1>
          <Badge variant="primary">{booking.status}</Badge>
        </div>

        <img src={car.images[0]} alt={car.name} className="w-full h-48 object-cover rounded-lg mb-6" />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><p className="text-gray-500">Car</p><p className="font-medium">{car.name}</p></div>
          <div><p className="text-gray-500">Owner</p><p className="font-medium">{car.owner.name}</p></div>
          <div><p className="text-gray-500">Pickup Date</p><p className="font-medium">{formatDate(booking.startDate)}</p></div>
          <div><p className="text-gray-500">Return Date</p><p className="font-medium">{formatDate(booking.endDate)}</p></div>
          <div><p className="text-gray-500">Pickup Location</p><p className="font-medium">{booking.pickupLocation}</p></div>
          <div><p className="text-gray-500">Total Amount</p><p className="font-semibold text-primary-600">{formatCurrency(booking.totalAmount)}</p></div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button variant="outline">Contact Owner</Button>
          <Button variant="danger">Cancel Booking</Button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
