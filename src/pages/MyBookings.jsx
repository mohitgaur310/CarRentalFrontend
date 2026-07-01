import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BookingCard from '../components/Cards/BookingCard';
import Breadcrumb from '../components/Common/Breadcrumb';
import Button from '../components/Buttons/Button';
import PageLoader from '../components/Loader/PageLoader';
import { fetchMyBookings } from '../redux/slices/bookingsSlice';

const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  if (loading && bookings.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'My Bookings' }]} />
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
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
