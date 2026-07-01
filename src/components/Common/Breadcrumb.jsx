import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:text-primary-600 flex items-center gap-1">
        <FiHome size={14} />
        Home
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <FiChevronRight size={14} />
          {item.href ? (
            <Link to={item.href} className="hover:text-primary-600">{item.label}</Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
