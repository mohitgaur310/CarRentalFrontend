import { Link } from 'react-router-dom';
import Badge from '../../components/Common/Badge';
import { mockCars } from '../../services/mockData';
import { formatCurrency, formatDate } from '../../utils';

const bookings = [
  { id: 'BK001', car: mockCars[0], user: 'Rahul M.', startDate: '2026-07-01', endDate: '2026-07-05', amount: 22500, status: 'confirmed' },
  { id: 'BK002', car: mockCars[1], user: 'Anita D.', startDate: '2026-06-20', endDate: '2026-06-22', amount: 10000, status: 'active' },
];

const AdminBookings = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-8">Bookings Management</h1>
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {['ID', 'Car', 'User', 'Dates', 'Amount', 'Status'].map((h) => (
              <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium">{b.id}</td>
              <td className="px-6 py-4 text-sm">{b.car.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{b.user}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{formatDate(b.startDate)} - {formatDate(b.endDate)}</td>
              <td className="px-6 py-4 text-sm font-medium">{formatCurrency(b.amount)}</td>
              <td className="px-6 py-4"><Badge variant="primary">{b.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminBookings;
