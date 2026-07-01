import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import CarCard from '../components/Cards/CarCard';
import Breadcrumb from '../components/Common/Breadcrumb';
import Button from '../components/Buttons/Button';
import { mockCars } from '../services/mockData';

const Wishlist = () => {
  const wishlistCars = mockCars.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Wishlist' }]} />
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h1>

      {wishlistCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistCars.map((car) => (
            <CarCard key={car.id} car={car} isWishlisted />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <FiHeart size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Your wishlist is empty</p>
          <Link to="/search"><Button className="mt-4">Browse Cars</Button></Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
