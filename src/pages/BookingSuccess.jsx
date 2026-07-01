import { Link, useLocation } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Button from '../components/Buttons/Button';
import { formatCurrency, formatDate } from '../utils';

const BookingSuccess = () => {
  const location = useLocation();
  const { car, startDate, endDate, pricing, bookingId } = location.state || {};

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.5 }}>
        <FiCheckCircle className="text-green-500 mx-auto" size={64} />
      </motion.div>
      <h1 className="text-2xl font-bold text-gray-900 mt-6">Booking Confirmed!</h1>
      <p className="text-gray-500 mt-2">Your car rental has been successfully booked.</p>

      {bookingId && (
        <div className="bg-gray-50 rounded-xl p-6 mt-8 text-left space-y-3">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Booking ID</span><span className="font-medium">{bookingId}</span></div>
          {car && <div className="flex justify-between text-sm"><span className="text-gray-500">Car</span><span className="font-medium">{car.name}</span></div>}
          {startDate && <div className="flex justify-between text-sm"><span className="text-gray-500">Pickup</span><span className="font-medium">{formatDate(startDate)}</span></div>}
          {endDate && <div className="flex justify-between text-sm"><span className="text-gray-500">Return</span><span className="font-medium">{formatDate(endDate)}</span></div>}
          {pricing && <div className="flex justify-between text-sm pt-3 border-t"><span className="text-gray-500">Total Paid</span><span className="font-semibold text-primary-600">{formatCurrency(pricing.total + 200)}</span></div>}
        </div>
      )}

      <div className="flex gap-3 mt-8 justify-center">
        <Link to="/my-bookings"><Button variant="outline">My Bookings</Button></Link>
        <Link to="/"><Button>Back to Home</Button></Link>
      </div>
    </div>
  );
};

export default BookingSuccess;
