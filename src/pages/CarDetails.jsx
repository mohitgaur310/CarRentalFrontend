import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMapPin, FiUsers, FiSettings, FiHeart, FiShare2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Common/Breadcrumb';
import Rating from '../components/Common/Rating';
import Badge from '../components/Common/Badge';
import Button from '../components/Buttons/Button';
import CarCard from '../components/Cards/CarCard';
import ReviewCard from '../components/Cards/ReviewCard';
import Tabs from '../components/Common/Tabs';
import PageLoader from '../components/Loader/PageLoader';
import { fetchCarById, fetchSimilarCars, clearSelectedCar } from '../redux/slices/carsSlice';
import { formatCurrency, calculateBookingPrice, getInitials } from '../utils';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedCar: car, similarCars, loading, error } = useSelector((state) => state.cars);
  const [activeImage, setActiveImage] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id));
    }
    return () => {
      dispatch(clearSelectedCar());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (car?.category && car?.id) {
      dispatch(fetchSimilarCars({ id: car.id, category: car.category }));
    }
  }, [dispatch, car?.id, car?.category]);

  useEffect(() => {
    setActiveImage(0);
  }, [car?.id]);

  if (loading && !car) {
    return <PageLoader />;
  }

  if (error && !car) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">{error}</p>
        <Button onClick={() => navigate('/search')} className="mt-4">Browse Cars</Button>
      </div>
    );
  }

  if (!car) return null;

  const pricing = startDate && endDate ? calculateBookingPrice(car.pricePerDay, startDate, endDate) : null;
  const ownerName = car.owner?.name || 'Host';
  const ownerInitial = getInitials(ownerName) || 'H';

  const handleBook = () => {
    if (!startDate || !endDate) {
      toast.error('Please select pickup and return dates');
      return;
    }
    navigate('/checkout', { state: { car, startDate, endDate, pricing } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Search', href: '/search' }, { label: car.name }]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
            <div className="h-80 lg:h-96 overflow-hidden">
              <img
                src={car.images?.[activeImage] || car.images?.[0] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>
            {car.images?.length > 1 && (
              <div className="flex gap-2 p-4">
                {car.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`w-20 h-16 rounded-lg overflow-hidden border-2 ${activeImage === i ? 'border-primary-600' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{car.name}</h1>
                <p className="text-gray-500 mt-1">{car.brand} · {car.year} · {car.category}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border rounded-lg hover:bg-gray-50"><FiHeart size={18} /></button>
                <button className="p-2 border rounded-lg hover:bg-gray-50"><FiShare2 size={18} /></button>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 flex-wrap">
              <Rating value={car.rating} />
              <span className="text-sm text-gray-500">({car.reviewCount} reviews)</span>
              <Badge>{car.transmission}</Badge>
              <Badge variant="primary">{car.fuelType}</Badge>
              {car.featured && <Badge variant="primary">Featured</Badge>}
            </div>
            <p className="text-gray-600 mt-4">{car.description}</p>
          </div>

          <Tabs tabs={[
            {
              key: 'specs',
              label: 'Specifications',
              content: (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Brand', value: car.brand },
                    { label: 'Model', value: car.model },
                    { label: 'Year', value: car.year },
                    { label: 'Transmission', value: car.transmission },
                    { label: 'Fuel Type', value: car.fuelType },
                    { label: 'Seats', value: car.seats },
                    { label: 'Doors', value: car.doors },
                    { label: 'Color', value: car.color },
                    { label: 'Category', value: car.category },
                    { label: 'City', value: car.city },
                    { label: 'State', value: car.state },
                    { label: 'Registration', value: car.registrationNumber },
                  ].filter((s) => s.value != null && s.value !== '').map((spec) => (
                    <div key={spec.label} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">{spec.label}</p>
                      <p className="font-medium text-gray-900">{spec.value}</p>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              key: 'features',
              label: 'Features',
              content: (
                <div className="grid grid-cols-2 gap-3">
                  {(car.features || []).map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-2 h-2 bg-primary-600 rounded-full" />{f}
                    </div>
                  ))}
                </div>
              ),
            },
            {
              key: 'reviews',
              label: 'Reviews',
              content: (
                <div className="space-y-4 text-sm text-gray-500">
                  Car reviews API coming soon.
                </div>
              ),
            },
            {
              key: 'location',
              label: 'Location',
              content: (
                <div className="bg-gray-200 rounded-xl h-48 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <FiMapPin size={32} className="mx-auto mb-2" />
                    <p>{car.address?.street ? `${car.address.street}, ` : ''}{car.city}{car.state ? `, ${car.state}` : ''}</p>
                    <p className="text-sm">Map integration available</p>
                  </div>
                </div>
              ),
            },
          ]} />
        </div>

        <div className="lg:col-span-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-2xl font-bold text-primary-600">{formatCurrency(car.pricePerDay)}</span>
              <span className="text-gray-500">/day</span>
            </div>

            {car.securityDeposit != null && (
              <p className="text-sm text-gray-500 mb-4">Security deposit: {formatCurrency(car.securityDeposit)}</p>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
            </div>

            {pricing && (
              <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">{formatCurrency(car.pricePerDay)} × {pricing.days} days</span><span>{formatCurrency(pricing.subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tax (18%)</span><span>{formatCurrency(pricing.tax)}</span></div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t"><span>Total</span><span className="text-primary-600">{formatCurrency(pricing.total)}</span></div>
              </div>
            )}

            <Button fullWidth size="lg" className="mt-6" onClick={handleBook} disabled={!car.available}>
              {car.available ? 'Book Now' : 'Not Available'}
            </Button>

            {car.owner && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium text-gray-900 mb-3">Car Host</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    {ownerInitial}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{ownerName}</p>
                    <Rating value={car.owner.rating} size="sm" />
                  </div>
                </div>
                <Link to="/chat" className="block mt-3 text-sm text-primary-600 hover:underline">Message Host</Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {similarCars.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Similar Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarCars.map((c) => <CarCard key={c.id} car={c} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default CarDetails;
