import Badge from '../../components/Common/Badge';
import { formatCurrency, formatDate } from '../../utils';

const payments = [
  { id: 'PAY001', bookingId: 'BK001', user: 'Rahul M.', amount: 22500, method: 'UPI', date: '2026-06-28', status: 'success' },
  { id: 'PAY002', bookingId: 'BK002', user: 'Anita D.', amount: 10000, method: 'Card', date: '2026-06-20', status: 'success' },
];

const AdminPayments = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-8">Payments Management</h1>
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {['Payment ID', 'Booking', 'User', 'Amount', 'Method', 'Date', 'Status'].map((h) => (
              <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {payments.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium">{p.id}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{p.bookingId}</td>
              <td className="px-6 py-4 text-sm">{p.user}</td>
              <td className="px-6 py-4 text-sm font-medium">{formatCurrency(p.amount)}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{p.method}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{formatDate(p.date)}</td>
              <td className="px-6 py-4"><Badge variant="success">{p.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminPayments;
