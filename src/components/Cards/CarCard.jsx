import { Link } from 'react-router-dom';
import { FiHeart, FiMapPin, FiUsers, FiSettings } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Rating from '../Common/Rating';
import Badge from '../Common/Badge';
import { formatCurrency } from '../../utils';

const CarCard = ({ car, onWishlist, isWishlisted = false }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.images?.[0] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {(car.featured || car.isFeatured) && (
          <Badge variant="primary" className="absolute top-3 left-3">Featured</Badge>
        )}
        <button
          onClick={(e) => { e.preventDefault(); onWishlist?.(car); }}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
          <FiHeart className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'} size={18} />
        </button>
      </div>
      <Link to={`/car/${car.id}`} className="block p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{car.name}</h3>
            <p className="text-sm text-gray-500">{car.brand} · {car.year}</p>
          </div>
          <Rating value={car.rating} size="sm" />
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1"><FiMapPin size={14} />{car.city}</span>
          <span className="flex items-center gap-1"><FiUsers size={14} />{car.seats}</span>
          <span className="flex items-center gap-1"><FiSettings size={14} />{car.transmission}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-lg font-bold text-primary-600">{formatCurrency(car.pricePerDay)}</span>
            <span className="text-sm text-gray-500">/day</span>
          </div>
          <span className="text-sm font-medium text-primary-600 group-hover:underline">View Details →</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;
