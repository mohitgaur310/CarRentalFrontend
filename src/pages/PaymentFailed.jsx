import { Link } from 'react-router-dom';
import { FiXCircle } from 'react-icons/fi';
import Button from '../components/Buttons/Button';

const PaymentFailed = () => (
  <div className="max-w-lg mx-auto px-4 py-16 text-center">
    <FiXCircle className="text-red-500 mx-auto" size={64} />
    <h1 className="text-2xl font-bold text-gray-900 mt-6">Payment Failed</h1>
    <p className="text-gray-500 mt-2">Something went wrong with your payment. Please try again.</p>
    <div className="flex gap-3 mt-8 justify-center">
      <Link to="/search"><Button variant="outline">Browse Cars</Button></Link>
      <Link to="/checkout"><Button>Retry Payment</Button></Link>
    </div>
  </div>
);

export default PaymentFailed;
