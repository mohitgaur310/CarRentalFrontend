import { Link } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import { mockCars } from '../../services/mockData';
import { formatCurrency } from '../../utils';

const AdminCars = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-8">Cars Management</h1>
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {['Car', 'Owner', 'City', 'Price/Day', 'Status', 'Actions'].map((h) => (
              <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {mockCars.map((car) => (
            <tr key={car.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img src={car.images[0]} alt="" className="w-12 h-10 object-cover rounded" />
                  <span className="text-sm font-medium">{car.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{car.owner.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{car.city}</td>
              <td className="px-6 py-4 text-sm font-medium">{formatCurrency(car.pricePerDay)}</td>
              <td className="px-6 py-4 text-sm text-green-600">Active</td>
              <td className="px-6 py-4">
                <Link to={`/car/${car.id}`}><Button variant="outline" size="sm">View</Button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminCars;
