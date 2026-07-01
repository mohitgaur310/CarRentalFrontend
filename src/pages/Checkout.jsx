import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Common/Breadcrumb';
import Button from '../components/Buttons/Button';
import Input from '../components/Forms/Input';
import { formatCurrency, formatDate } from '../utils';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { car, startDate, endDate, pricing } = location.state || {};
  const [coupon, setCoupon] = useState('');
  const [loading, setLoading] = useState(false);

  if (!car) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">No booking details found.</p>
        <Button onClick={() => navigate('/search')} className="mt-4">Browse Cars</Button>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/booking-success', { state: { car, startDate, endDate, pricing, bookingId: 'BK' + Date.now() } });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Checkout' }]} />
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

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
            <h2 className="font-semibold text-gray-900 mb-4">Coupon Code</h2>
            <div className="flex gap-3">
              <Input placeholder="Enter coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="flex-1" />
              <Button variant="outline">Apply</Button>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-semibold text-gray-900 mb-4">Price Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Rental ({pricing?.days} days)</span><span>{formatCurrency(pricing?.subtotal || 0)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Service Fee</span><span>{formatCurrency(200)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tax (18%)</span><span>{formatCurrency(pricing?.tax || 0)}</span></div>
              <div className="flex justify-between font-semibold text-base pt-3 border-t">
                <span>Total</span>
                <span className="text-primary-600">{formatCurrency((pricing?.total || 0) + 200)}</span>
              </div>
            </div>
            <Button fullWidth size="lg" loading={loading} onClick={handlePayment} className="mt-6">
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
