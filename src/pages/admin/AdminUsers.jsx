import Badge from '../../components/Common/Badge';
import Button from '../../components/Buttons/Button';

const users = [
  { id: '1', name: 'Rahul Mehta', email: 'rahul@email.com', role: 'user', status: 'active', joined: '2026-01-15' },
  { id: '2', name: 'Priya Sharma', email: 'priya@email.com', role: 'owner', status: 'active', joined: '2026-02-20' },
  { id: '3', name: 'Amit Patel', email: 'amit@email.com', role: 'user', status: 'blocked', joined: '2026-03-10' },
];

const AdminUsers = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-8">Users Management</h1>
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map((h) => (
              <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium">{u.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
              <td className="px-6 py-4"><Badge>{u.role}</Badge></td>
              <td className="px-6 py-4"><Badge variant={u.status === 'active' ? 'success' : 'danger'}>{u.status}</Badge></td>
              <td className="px-6 py-4 text-sm text-gray-500">{u.joined}</td>
              <td className="px-6 py-4">
                <Button variant="outline" size="sm">{u.status === 'active' ? 'Block' : 'Unblock'}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminUsers;
