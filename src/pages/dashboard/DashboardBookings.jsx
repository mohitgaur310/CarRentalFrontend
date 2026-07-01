import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookingCard from '../../components/Cards/BookingCard';
import PageLoader from '../../components/Loader/PageLoader';
import { fetchHostBookings } from '../../redux/slices/bookingsSlice';

const DashboardBookings = () => {
  const dispatch = useDispatch();
  const { hostBookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchHostBookings());
  }, [dispatch]);

  if (loading && hostBookings.length === 0) {
    return <PageLoader />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Bookings</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {hostBookings.length > 0 ? (
        <div className="space-y-4">
          {hostBookings.map((b) => (
            <BookingCard key={b.id} booking={b} showRenter />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No bookings on your cars yet.</p>
      )}
    </div>
  );
};

export default DashboardBookings;
