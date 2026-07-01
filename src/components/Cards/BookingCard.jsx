import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUser } from 'react-icons/fi';
import Badge from '../Common/Badge';
import { formatCurrency, formatDate, getDisplayName } from '../../utils';
import { BOOKING_STATUS_VARIANT } from '../../utils/bookingMapper';

const BookingCard = ({ booking, showRenter = false }) => {
  const carName = booking.car?.name || booking.car?.title || 'Car Booking';

  return (
    <Link to={`/booking/${booking.id}`} className="block">
      <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          <img
            src={booking.car?.images?.[0] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200'}
            alt={carName}
            className="w-24 h-20 object-cover rounded-lg"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-gray-900">{carName}</h3>
                {booking.bookingNumber && (
                  <p className="text-xs text-gray-400 mt-0.5">{booking.bookingNumber}</p>
                )}
              </div>
              <Badge variant={BOOKING_STATUS_VARIANT[booking.status] || 'default'}>
                {booking.status}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FiCalendar size={14} />
                {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin size={14} />
                {booking.car?.city || 'N/A'}
              </span>
              {showRenter && booking.renter && (
                <span className="flex items-center gap-1">
                  <FiUser size={14} />
                  {getDisplayName(booking.renter)}
                </span>
              )}
            </div>
            <p className="text-primary-600 font-semibold mt-2">{formatCurrency(booking.totalAmount || 0)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookingCard;
