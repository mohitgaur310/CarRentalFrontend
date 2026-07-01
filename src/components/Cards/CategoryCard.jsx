import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/search?category=${category.name}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <span className="text-4xl mb-3">{category.icon}</span>
        <h3 className="font-semibold text-gray-900">{category.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{category.count} cars</p>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
