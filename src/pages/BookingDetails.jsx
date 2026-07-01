import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Common/Breadcrumb';
import Badge from '../components/Common/Badge';
import Button from '../components/Buttons/Button';
import Textarea from '../components/Forms/Textarea';
import PageLoader from '../components/Loader/PageLoader';
import {
  fetchBookingById,
  updateBookingStatus,
  clearCurrentBooking,
} from '../redux/slices/bookingsSlice';
import { BOOKING_STATUS } from '../constants';
import { formatCurrency, formatDate, getDisplayName } from '../utils';
import { BOOKING_STATUS_VARIANT } from '../utils/bookingMapper';

const getUserId = (user) => user?._id || user?.id;

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentBooking: booking, loading, error } = useSelector((state) => state.bookings);
  const [actionLoading, setActionLoading] = useState(false);
  const [hostNotes, setHostNotes] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  const [showCancelForm, setShowCancelForm] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchBookingById(id));
    return () => dispatch(clearCurrentBooking());
  }, [dispatch, id]);

  if (loading && !booking) {
    return <PageLoader />;
  }

  if (error && !booking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">{error}</p>
        <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
      </div>
    );
  }

  if (!booking) return null;

  const userId = getUserId(user);
  const renterId = booking.renter?._id || booking.renter?.id;
  const hostId = booking.host?._id || booking.host?.id;
  const isRenter = userId && renterId === userId;
  const isHost = userId && hostId === userId;
  const car = booking.car;

  const handleStatusUpdate = async (status, extra = {}) => {
    setActionLoading(true);
    try {
      await dispatch(updateBookingStatus({ id: booking.id, status, ...extra })).unwrap();
      toast.success(`Booking ${status}`);
      setShowCancelForm(false);
      setCancellationReason('');
      setHostNotes('');
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Failed to update booking');
    } finally {
      setActionLoading(false);
    }
  };

  const canCancel = isRenter || isHost;
  const cancellable = [BOOKING_STATUS.PENDING, BOOKING_STATUS.ACCEPTED].includes(booking.status);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: isHost ? 'Dashboard Bookings' : 'My Bookings', href: isHost ? '/dashboard/bookings' : '/my-bookings' },
          { label: booking.bookingNumber || `Booking #${id}` },
        ]}
      />

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">
            {booking.bookingNumber || `Booking #${id}`}
          </h1>
          <Badge variant={BOOKING_STATUS_VARIANT[booking.status] || 'default'}>
            {booking.status}
          </Badge>
        </div>

        {car?.images?.[0] && (
          <img src={car.images[0]} alt={car.name} className="w-full h-48 object-cover rounded-lg mb-6" />
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><p className="text-gray-500">Car</p><p className="font-medium">{car?.name || '—'}</p></div>
          <div><p className="text-gray-500">{isHost ? 'Renter' : 'Host'}</p><p className="font-medium">{getDisplayName(isHost ? booking.renter : booking.host) || '—'}</p></div>
          <div><p className="text-gray-500">Pickup Date</p><p className="font-medium">{formatDate(booking.startDate)}</p></div>
          <div><p className="text-gray-500">Return Date</p><p className="font-medium">{formatDate(booking.endDate)}</p></div>
          <div><p className="text-gray-500">Duration</p><p className="font-medium">{booking.totalDays} days</p></div>
          <div><p className="text-gray-500">Price/Day</p><p className="font-medium">{formatCurrency(booking.pricePerDay)}</p></div>
          <div><p className="text-gray-500">Total Amount</p><p className="font-semibold text-primary-600">{formatCurrency(booking.totalAmount)}</p></div>
          {booking.securityDeposit > 0 && (
            <div><p className="text-gray-500">Security Deposit</p><p className="font-medium">{formatCurrency(booking.securityDeposit)}</p></div>
          )}
          {booking.notes && (
            <div className="col-span-2"><p className="text-gray-500">Renter Notes</p><p className="font-medium">{booking.notes}</p></div>
          )}
          {booking.hostNotes && (
            <div className="col-span-2"><p className="text-gray-500">Host Notes</p><p className="font-medium">{booking.hostNotes}</p></div>
          )}
          {booking.cancellationReason && (
            <div className="col-span-2"><p className="text-gray-500">Cancellation Reason</p><p className="font-medium">{booking.cancellationReason}</p></div>
          )}
        </div>

        {isHost && booking.status === BOOKING_STATUS.PENDING && (
          <div className="mt-6 space-y-3">
            <Textarea
              label="Host Notes (optional)"
              rows={2}
              value={hostNotes}
              onChange={(e) => setHostNotes(e.target.value)}
              placeholder="Car will be ready at 10 AM"
            />
            <div className="flex gap-3">
              <Button loading={actionLoading} onClick={() => handleStatusUpdate(BOOKING_STATUS.ACCEPTED, { hostNotes: hostNotes || undefined })}>
                Accept
              </Button>
              <Button variant="danger" loading={actionLoading} onClick={() => handleStatusUpdate(BOOKING_STATUS.REJECTED, { hostNotes: hostNotes || undefined })}>
                Reject
              </Button>
            </div>
          </div>
        )}

        {isHost && booking.status === BOOKING_STATUS.ACCEPTED && (
          <div className="flex gap-3 mt-8">
            <Button loading={actionLoading} onClick={() => handleStatusUpdate(BOOKING_STATUS.ONGOING)}>
              Start Trip
            </Button>
          </div>
        )}

        {isHost && (booking.status === BOOKING_STATUS.ACCEPTED || booking.status === BOOKING_STATUS.ONGOING) && (
          <div className="flex gap-3 mt-3">
            <Button variant="outline" loading={actionLoading} onClick={() => handleStatusUpdate(BOOKING_STATUS.COMPLETED)}>
              Mark Completed
            </Button>
          </div>
        )}

        {canCancel && cancellable && !showCancelForm && (
          <div className="mt-8">
            <Button variant="danger" onClick={() => setShowCancelForm(true)}>Cancel Booking</Button>
          </div>
        )}

        {showCancelForm && (
          <div className="mt-6 space-y-3 border-t pt-6">
            <Textarea
              label="Cancellation Reason"
              rows={2}
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              placeholder="Plans changed"
            />
            <div className="flex gap-3">
              <Button
                variant="danger"
                loading={actionLoading}
                onClick={() => handleStatusUpdate(BOOKING_STATUS.CANCELLED, { cancellationReason })}
              >
                Confirm Cancel
              </Button>
              <Button variant="outline" onClick={() => setShowCancelForm(false)}>Back</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
