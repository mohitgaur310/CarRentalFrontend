import { FiStar } from 'react-icons/fi';
import { classNames } from '../../utils';

const Rating = ({ value = 0, size = 'sm', showValue = true, className = '' }) => {
  const sizes = { sm: 14, md: 18, lg: 22 };

  return (
    <div className={classNames('flex items-center gap-1', className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={sizes[size]}
          className={i < Math.floor(value) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
        />
      ))}
      {showValue && <span className="text-sm text-gray-600 ml-1">{value.toFixed(1)}</span>}
    </div>
  );
};

export default Rating;
