import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMapPin, FiCalendar, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Button from '../components/Buttons/Button';
import Input from '../components/Forms/Input';
import CarCard from '../components/Cards/CarCard';
import CategoryCard from '../components/Cards/CategoryCard';
import ReviewCard from '../components/Cards/ReviewCard';
import { CarCardSkeleton } from '../components/Loader/Skeleton';
import { mockCategories, mockTestimonials } from '../services/mockData';
import { fetchFeaturedCars, fetchPopularCars } from '../redux/slices/carsSlice';

const Hero = () => (
  <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
          Rent Your <span className="text-primary-200">Dream Car</span> Today
        </h1>
        <p className="text-primary-100 text-lg mt-6">
          Choose from thousands of premium cars. Book instantly and hit the road with confidence.
        </p>
      </motion.div>
    </div>
  </section>
);

const SearchBar = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (pickupDate) params.set('pickupDate', pickupDate);
    if (returnDate) params.set('returnDate', returnDate);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">
      <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-4 lg:p-6 flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="City or location" value={city} onChange={(e) => setCity(e.target.value)} leftIcon={<FiMapPin size={18} />} />
        </div>
        <div className="flex-1">
          <Input type="date" placeholder="Pickup date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} leftIcon={<FiCalendar size={18} />} />
        </div>
        <div className="flex-1">
          <Input type="date" placeholder="Return date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} leftIcon={<FiCalendar size={18} />} />
        </div>
        <Button type="submit" size="lg" leftIcon={<FiSearch size={18} />} className="lg:px-8">Search</Button>
      </form>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const { featuredCars, popularCars, loading } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchFeaturedCars(6));
    dispatch(fetchPopularCars(4));
  }, [dispatch]);

  return (
    <>
      <Hero />
      <SearchBar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Cars</h2>
            <Link to="/search?isFeatured=true" className="text-primary-600 font-medium hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && featuredCars.length === 0
              ? Array.from({ length: 3 }).map((_, i) => <CarCardSkeleton key={i} />)
              : featuredCars.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Popular Cars</h2>
          <Link to="/search" className="text-primary-600 font-medium hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCars.length === 0 && loading
            ? Array.from({ length: 4 }).map((_, i) => <CarCardSkeleton key={i} />)
            : popularCars.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      <section id="how-it-works" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Search & Select', desc: 'Browse our wide selection of cars and find the perfect match for your trip.' },
              { step: '2', title: 'Book & Pay', desc: 'Choose your dates, review the details, and complete your secure payment.' },
              { step: '3', title: 'Drive & Enjoy', desc: 'Pick up your car and enjoy your journey. Return it when you\'re done.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-500 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTestimonials.map((t) => (
            <ReviewCard key={t.id} review={t} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
