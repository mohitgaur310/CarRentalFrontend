import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import Badge from '../Common/Badge';
import { formatCurrency, formatDate } from '../../utils';

const BookingCard = ({ booking }) => {
  const statusVariant = {
    pending: 'warning',
    confirmed: 'primary',
    active: 'success',
    completed: 'default',
    cancelled: 'danger',
  };

  return (
    <Link to={`/booking/${booking.id}`} className="block">
      <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          <img
            src={booking.car?.images?.[0] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200'}
            alt={booking.car?.name}
            className="w-24 h-20 object-cover rounded-lg"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900">{booking.car?.name || 'Car Booking'}</h3>
              <Badge variant={statusVariant[booking.status] || 'default'}>{booking.status}</Badge>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FiCalendar size={14} />
                {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin size={14} />
                {booking.car?.city || 'N/A'}
              </span>
            </div>
            <p className="text-primary-600 font-semibold mt-2">{formatCurrency(booking.totalAmount || 0)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookingCard;
