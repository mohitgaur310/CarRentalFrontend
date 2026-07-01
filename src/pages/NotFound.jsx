import { Link } from 'react-router-dom';
import Button from '../components/Buttons/Button';

const NotFound = () => (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    <div className="text-center">
      <h1 className="text-8xl font-bold text-primary-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/"><Button className="mt-6">Back to Home</Button></Link>
    </div>
  </div>
);

export default NotFound;
