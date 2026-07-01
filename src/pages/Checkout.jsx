import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Common/Breadcrumb';
import Button from '../components/Buttons/Button';
import Textarea from '../components/Forms/Textarea';
import { formatCurrency, formatDate } from '../utils';
import { createBooking } from '../redux/slices/bookingsSlice';

const toApiDate = (date) => {
  if (!date) return '';
  return date.includes('T') ? date.split('T')[0] : date;
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.bookings);
  const { car, startDate, endDate, pricing } = location.state || {};
  const [notes, setNotes] = useState('');

  if (!car) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">No booking details found.</p>
        <Button onClick={() => navigate('/search')} className="mt-4">Browse Cars</Button>
      </div>
    );
  }

  const handleRequestBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }
    if (!startDate || !endDate) {
      toast.error('Please select pickup and return dates');
      return;
    }

    try {
      const booking = await dispatch(
        createBooking({
          carId: car.id,
          startDate: toApiDate(startDate),
          endDate: toApiDate(endDate),
          notes: notes.trim() || undefined,
        })
      ).unwrap();

      navigate('/booking-success', {
        state: { booking, car, startDate, endDate, pricing },
      });
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'Failed to create booking');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Checkout' }]} />
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Request Booking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Trip Details</h2>
            <div className="flex gap-4">
              <img src={car.images[0]} alt={car.name} className="w-32 h-24 object-cover rounded-lg" />
              <div>
                <h3 className="font-semibold">{car.name}</h3>
                <p className="text-sm text-gray-500">{car.brand} · {car.city}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {formatDate(startDate)} → {formatDate(endDate)} ({pricing?.days} days)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Notes for Host</h2>
            <Textarea
              rows={3}
              placeholder="Need car at airport terminal 3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={500}
            />
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-semibold text-gray-900 mb-4">Price Estimate</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Rental ({pricing?.days} days)</span><span>{formatCurrency(pricing?.subtotal || 0)}</span></div>
              {car.securityDeposit > 0 && (
                <div className="flex justify-between"><span className="text-gray-500">Security Deposit</span><span>{formatCurrency(car.securityDeposit)}</span></div>
              )}
              <div className="flex justify-between"><span className="text-gray-500">Tax (18%)</span><span>{formatCurrency(pricing?.tax || 0)}</span></div>
              <div className="flex justify-between font-semibold text-base pt-3 border-t">
                <span>Estimated Total</span>
                <span className="text-primary-600">{formatCurrency(pricing?.total || 0)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Your request will be sent to the host for approval. Payment is collected after acceptance.
            </p>
            <Button fullWidth size="lg" loading={loading} onClick={handleRequestBooking} className="mt-6">
              Request Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
