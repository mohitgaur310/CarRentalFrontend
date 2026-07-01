import { mockAdminStats } from '../../services/mockData';
import { formatCurrency } from '../../utils';

const AdminReports = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-8">Reports & Analytics</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Revenue Overview</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Total Revenue</span><span className="font-semibold">{formatCurrency(mockAdminStats.totalRevenue)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">This Month</span><span className="font-semibold">{formatCurrency(890000)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Last Month</span><span className="font-semibold">{formatCurrency(720000)}</span></div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Platform Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Active Users</span><span className="font-semibold">{mockAdminStats.activeUsers}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Recent Bookings</span><span className="font-semibold">{mockAdminStats.recentBookings}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Conversion Rate</span><span className="font-semibold">12.5%</span></div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Booking Trends</h3>
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
        Chart visualization — integrate with Chart.js or Recharts
      </div>
    </div>
  </div>
);

export default AdminReports;
